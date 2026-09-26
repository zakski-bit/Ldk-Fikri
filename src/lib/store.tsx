"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  initialMosqueCampaign,
  initialArticles,
  initialEvents,
  initialManagement,
  initialOrgProfile,
  initialQuestions,
  initialMerchandise,
  type Article,
  type EventItem,
  type ManagementMember,
  type OrgProfile,
  type QuestionAnswer,
  type MerchandiseItem,
  type DonorRecord,
  type EventRegistration,
  type OprecApplication,
} from "@/data/mockData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

function getLocalDate(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function safeParse<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeStore(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently ignore storage quota errors
  }
}

export interface DataStoreState {
  isLoaded: boolean;
  isSupabaseConnected: boolean;
  campaign: typeof initialMosqueCampaign;
  articles: Article[];
  events: EventItem[];
  eventRegistrations: EventRegistration[];
  oprecApplications: OprecApplication[];
  management: ManagementMember[];
  orgProfile: OrgProfile;
  questions: QuestionAnswer[];
  merchandise: MerchandiseItem[];
  // Donasi CRUD
  addDonation: (donor: Omit<DonorRecord, "id" | "date">) => void;
  updateCampaignTarget: (newTarget: number) => void;
  // Artikel CRUD
  addArticle: (article: Omit<Article, "id" | "publishedAt">) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  // Event CRUD
  addEvent: (event: Omit<EventItem, "id" | "registeredCount">) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string) => void;
  registerForEventWithDetails: (registration: Omit<EventRegistration, "id" | "registeredAt">) => void;
  // OPREC
  submitOprecApplication: (app: Omit<OprecApplication, "id" | "submittedAt" | "status">) => void;
  updateOprecStatus: (id: string, status: OprecApplication["status"]) => void;
  // Tanya Ustadz CRUD
  addQuestion: (q: Omit<QuestionAnswer, "id" | "status" | "createdAt">) => void;
  answerQuestion: (id: string, answer: string, answeredBy: string) => void;
  deleteQuestion: (id: string) => void;
  // Profile & Kabinet CRUD
  updateOrgProfile: (profile: OrgProfile) => void;
  addManagementMember: (member: Omit<ManagementMember, "id">) => void;
  updateManagementMember: (id: string, member: Partial<ManagementMember>) => void;
  deleteManagementMember: (id: string) => void;
  resetToDefaultData: () => void;
}

const DataStoreContext = createContext<DataStoreState | null>(null);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [campaign, setCampaign] = useState(initialMosqueCampaign);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [oprecApplications, setOprecApplications] = useState<OprecApplication[]>([]);
  const [management, setManagement] = useState<ManagementMember[]>(initialManagement);
  const [orgProfile, setOrgProfile] = useState<OrgProfile>(initialOrgProfile);
  const [questions, setQuestions] = useState<QuestionAnswer[]>(initialQuestions);
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>(initialMerchandise);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Initial Load (Hybrid: Supabase first, fallback to LocalStorage)
  useEffect(() => {
    const initData = async () => {
      // 1. First load from local storage for instant render without flash
      const loadedCampaign = safeParse<typeof initialMosqueCampaign | null>("fikri_v3_campaign", null);
      if (!loadedCampaign || !loadedCampaign.title.includes("Pembangunan")) {
        setCampaign(initialMosqueCampaign);
        safeStore("fikri_v3_campaign", initialMosqueCampaign);
      } else {
        setCampaign(loadedCampaign);
      }

      const loadedManagement = safeParse<ManagementMember[] | null>("fikri_v2_management", null);
      if (!loadedManagement || !Array.isArray(loadedManagement) || loadedManagement.length < 25) {
        setManagement(initialManagement);
        safeStore("fikri_v2_management", initialManagement);
      } else {
        setManagement(loadedManagement);
      }

      setArticles(safeParse("fikri_articles", initialArticles));
      setEvents(safeParse("fikri_events", initialEvents));
      setEventRegistrations(safeParse("fikri_event_registrations", []));
      setOprecApplications(safeParse("fikri_oprec_applications", []));
      setOrgProfile(safeParse("fikri_v2_org_profile", initialOrgProfile));
      setQuestions(safeParse("fikri_questions", initialQuestions));
      setMerchandise(safeParse("fikri_merchandise", initialMerchandise));
      setIsLoaded(true);

      // 2. If Supabase is configured, sync live from cloud database
      if (isSupabaseConfigured()) {
        try {
          // Fetch Org Profile
          const { data: profileData } = await supabase.from("org_profile").select("*").eq("id", "current").single();
          if (profileData) {
            const mappedProfile: OrgProfile = {
              cabinetName: profileData.cabinet_name,
              period: profileData.period,
              tagline: profileData.tagline || "",
              aboutText: profileData.about_text,
              vision: profileData.vision,
              missions: profileData.missions || [],
              values: profileData.values || [],
            };
            setOrgProfile(mappedProfile);
            safeStore("fikri_v2_org_profile", mappedProfile);
          }

          // Fetch Management Members
          const { data: membersData } = await supabase.from("management_members").select("*").order("created_at", { ascending: true });
          if (membersData && membersData.length > 0) {
            const mappedMembers: ManagementMember[] = membersData.map((m) => ({
              id: m.id,
              name: m.name,
              role: m.role,
              department: m.department,
              division: m.division || undefined,
              major: m.major,
              batch: m.batch,
              photoUrl: m.photo_url,
              quote: m.quote || undefined,
              socials: {
                instagram: m.instagram || undefined,
                linkedin: m.linkedin || undefined,
              },
            }));
            setManagement(mappedMembers);
            safeStore("fikri_v2_management", mappedMembers);
          }

          // Fetch Campaign
          const { data: campData } = await supabase.from("donation_campaign").select("*").eq("id", "current").single();
          if (campData) {
            const isPembangunan = campData.title && campData.title.includes("Pembangunan");
            const mappedCamp = {
              title: isPembangunan ? campData.title : initialMosqueCampaign.title,
              location: isPembangunan ? (campData.location || initialMosqueCampaign.location) : initialMosqueCampaign.location,
              targetAmount: isPembangunan ? Number(campData.target_amount) : initialMosqueCampaign.targetAmount,
              collectedAmount: isPembangunan ? Number(campData.collected_amount) : initialMosqueCampaign.collectedAmount,
              donorCount: isPembangunan ? Number(campData.donor_count) : initialMosqueCampaign.donorCount,
              bankAccounts: campData.bank_accounts || initialMosqueCampaign.bankAccounts,
              qrisImageUrl: initialMosqueCampaign.qrisImageUrl,
              milestones: isPembangunan ? (campData.milestones || initialMosqueCampaign.milestones) : initialMosqueCampaign.milestones,
              recentDonors: campData.recent_donors || initialMosqueCampaign.recentDonors,
            };
            setCampaign(mappedCamp);
            safeStore("fikri_v3_campaign", mappedCamp);
          }

          // Fetch Articles
          const { data: artsData } = await supabase.from("articles").select("*").order("published_at", { ascending: false });
          if (artsData && artsData.length > 0) {
            const mappedArts: Article[] = artsData.map((a) => ({
              id: a.id,
              slug: a.slug,
              title: a.title,
              excerpt: a.excerpt,
              content: a.content,
              category: a.category,
              coverImage: a.cover_image,
              readTime: a.read_time || "4 menit",
              tags: a.tags || [],
              publishedAt: a.published_at,
              author: {
                name: a.author_name,
                role: a.author_role || "Pengurus LDK FIKRI",
                avatar: a.author_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
              },
            }));
            setArticles(mappedArts);
            safeStore("fikri_articles", mappedArts);
          }

          // Fetch Events
          const { data: evtsData } = await supabase.from("events").select("*").order("date", { ascending: true });
          if (evtsData && evtsData.length > 0) {
            const mappedEvts: EventItem[] = evtsData.map((e) => ({
              id: e.id,
              slug: e.slug,
              title: e.title,
              category: e.category,
              date: e.date,
              time: e.time,
              location: e.location,
              speaker: e.speaker,
              speakerTitle: e.speaker_title || "",
              description: e.description,
              posterUrl: e.poster_url,
              quota: e.quota,
              registeredCount: e.registered_count,
              isRegistrationOpen: e.is_registration_open,
            }));
            setEvents(mappedEvts);
            safeStore("fikri_events", mappedEvts);
          }

          // Fetch Oprec Applications
          const { data: oprecData } = await supabase.from("oprec_applications").select("*").order("submitted_at", { ascending: false });
          if (oprecData) {
            const mappedOprec: OprecApplication[] = oprecData.map((o) => ({
              id: o.id,
              fullName: o.full_name,
              nim: o.nim,
              major: o.major,
              departmentChoice: o.department_choice,
              motivation: o.motivation,
              status: o.status,
              submittedAt: o.submitted_at,
            }));
            setOprecApplications(mappedOprec);
            safeStore("fikri_oprec_applications", mappedOprec);
          }

          // Fetch Questions
          const { data: qData } = await supabase.from("questions").select("*").order("created_at", { ascending: false });
          if (qData && qData.length > 0) {
            const mappedQ: QuestionAnswer[] = qData.map((q) => ({
              id: q.id,
              question: q.question,
              askedBy: q.asked_by,
              major: q.major || undefined,
              category: q.category,
              answer: q.answer || undefined,
              answeredBy: q.answered_by || undefined,
              answeredAt: q.answered_at || undefined,
              status: q.status,
              createdAt: q.created_at,
            }));
            setQuestions(mappedQ);
            safeStore("fikri_questions", mappedQ);
          }

          setIsSupabaseConnected(true);
        } catch (err) {
          console.warn("Supabase sync failed, continuing with LocalStorage fallback:", err);
          setIsSupabaseConnected(false);
        }
      }
    };

    initData();
  }, []);

  // --- MUTATION: DONASI ---
  const addDonation = useCallback((donor: Omit<DonorRecord, "id" | "date">) => {
    const newRecord: DonorRecord = {
      ...donor,
      id: `d-${Date.now()}`,
      date: getLocalDate(),
    };

    setCampaign((prev) => {
      const updated = {
        ...prev,
        collectedAmount: prev.collectedAmount + donor.amount,
        donorCount: prev.donorCount + 1,
        recentDonors: [newRecord, ...prev.recentDonors],
      };
      safeStore("fikri_v2_campaign", updated);

      if (isSupabaseConfigured()) {
        (async () => {
          try {
            await supabase.from("donations").insert({
              id: newRecord.id,
              name: newRecord.name,
              amount: newRecord.amount,
              bank: newRecord.bank || null,
              message: newRecord.message || null,
              is_anonymous: newRecord.isAnonymous,
            });
            await supabase.from("donation_campaign").update({
              collected_amount: updated.collectedAmount,
              donor_count: updated.donorCount,
              recent_donors: updated.recentDonors,
              updated_at: new Date().toISOString(),
            }).eq("id", "current");
          } catch (e) {
            console.error("Donation sync error:", e);
          }
        })();
      }

      return updated;
    });
  }, []);

  const updateCampaignTarget = useCallback((newTarget: number) => {
    setCampaign((prev) => {
      const updated = { ...prev, targetAmount: newTarget };
      safeStore("fikri_v2_campaign", updated);

      if (isSupabaseConfigured()) {
        supabase
          .from("donation_campaign")
          .update({ target_amount: newTarget, updated_at: new Date().toISOString() })
          .eq("id", "current")
          .then();
      }

      return updated;
    });
  }, []);

  // --- MUTATION: ARTIKEL CRUD ---
  const addArticle = useCallback((article: Omit<Article, "id" | "publishedAt">) => {
    const newArt: Article = {
      ...article,
      id: `art-${Date.now()}`,
      publishedAt: getLocalDate(),
    };

    setArticles((prev) => {
      const updated = [newArt, ...prev];
      safeStore("fikri_articles", updated);

      if (isSupabaseConfigured()) {
        supabase
          .from("articles")
          .insert({
            id: newArt.id,
            slug: newArt.slug,
            title: newArt.title,
            excerpt: newArt.excerpt,
            content: newArt.content,
            category: newArt.category,
            author_name: newArt.author.name,
            author_role: newArt.author.role,
            author_avatar: newArt.author.avatar,
            cover_image: newArt.coverImage,
            read_time: newArt.readTime,
            tags: newArt.tags,
            published_at: newArt.publishedAt,
          })
          .then();
      }

      return updated;
    });
  }, []);

  const updateArticle = useCallback((id: string, article: Partial<Article>) => {
    setArticles((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...article } : a));
      safeStore("fikri_articles", updated);

      if (isSupabaseConfigured()) {
        const payload: Record<string, unknown> = {};
        if (article.title) payload.title = article.title;
        if (article.excerpt) payload.excerpt = article.excerpt;
        if (article.content) payload.content = article.content;
        if (article.category) payload.category = article.category;
        if (article.coverImage) payload.cover_image = article.coverImage;
        if (article.tags) payload.tags = article.tags;

        supabase.from("articles").update(payload).eq("id", id).then();
      }

      return updated;
    });
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      safeStore("fikri_articles", updated);

      if (isSupabaseConfigured()) {
        supabase.from("articles").delete().eq("id", id).then();
      }

      return updated;
    });
  }, []);

  // --- MUTATION: EVENT CRUD ---
  const addEvent = useCallback((event: Omit<EventItem, "id" | "registeredCount">) => {
    const newEvt: EventItem = {
      ...event,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
    };

    setEvents((prev) => {
      const updated = [...prev, newEvt];
      safeStore("fikri_events", updated);

      if (isSupabaseConfigured()) {
        supabase
          .from("events")
          .insert({
            id: newEvt.id,
            slug: newEvt.slug,
            title: newEvt.title,
            category: newEvt.category,
            date: newEvt.date,
            time: newEvt.time,
            location: newEvt.location,
            speaker: newEvt.speaker,
            speaker_title: newEvt.speakerTitle,
            description: newEvt.description,
            poster_url: newEvt.posterUrl,
            quota: newEvt.quota,
            registered_count: 0,
            is_registration_open: newEvt.isRegistrationOpen,
          })
          .then();
      }

      return updated;
    });
  }, []);

  const updateEvent = useCallback((id: string, event: Partial<EventItem>) => {
    setEvents((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, ...event } : e));
      safeStore("fikri_events", updated);

      if (isSupabaseConfigured()) {
        const payload: Record<string, unknown> = {};
        if (event.title) payload.title = event.title;
        if (event.quota !== undefined) payload.quota = event.quota;
        if (event.isRegistrationOpen !== undefined) payload.is_registration_open = event.isRegistrationOpen;
        if (event.date) payload.date = event.date;
        if (event.time) payload.time = event.time;
        if (event.location) payload.location = event.location;

        supabase.from("events").update(payload).eq("id", id).then();
      }

      return updated;
    });
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      safeStore("fikri_events", updated);

      if (isSupabaseConfigured()) {
        supabase.from("events").delete().eq("id", id).then();
      }

      return updated;
    });
  }, []);

  const registerForEvent = useCallback((eventId: string) => {
    setEvents((prev) => {
      const updated = prev.map((e) => {
        if (e.id === eventId && e.registeredCount < e.quota) {
          const nextCount = e.registeredCount + 1;
          const nextOpen = nextCount < e.quota;

          if (isSupabaseConfigured()) {
            supabase
              .from("events")
              .update({ registered_count: nextCount, is_registration_open: nextOpen })
              .eq("id", eventId)
              .then();
          }

          return {
            ...e,
            registeredCount: nextCount,
            isRegistrationOpen: nextOpen,
          };
        }
        return e;
      });
      safeStore("fikri_events", updated);
      return updated;
    });
  }, []);

  const registerForEventWithDetails = useCallback(
    (registration: Omit<EventRegistration, "id" | "registeredAt">) => {
      registerForEvent(registration.eventId);

      const record: EventRegistration = {
        ...registration,
        id: `reg-${Date.now()}`,
        registeredAt: getLocalDate(),
      };

      setEventRegistrations((prev) => {
        const updated = [record, ...prev];
        safeStore("fikri_event_registrations", updated);

        if (isSupabaseConfigured()) {
          supabase
            .from("event_registrations")
            .insert({
              id: record.id,
              event_id: record.eventId,
              event_title: record.eventTitle,
              full_name: record.fullName,
              nim: record.nim,
              major: record.major,
              wa_number: record.waNumber,
            })
            .then();
        }

        return updated;
      });
    },
    [registerForEvent]
  );

  // --- MUTATION: OPREC ---
  const submitOprecApplication = useCallback(
    (app: Omit<OprecApplication, "id" | "submittedAt" | "status">) => {
      const record: OprecApplication = {
        ...app,
        id: `oprec-${Date.now()}`,
        status: "pending",
        submittedAt: getLocalDate(),
      };

      setOprecApplications((prev) => {
        const updated = [record, ...prev];
        safeStore("fikri_oprec_applications", updated);

        if (isSupabaseConfigured()) {
          supabase
            .from("oprec_applications")
            .insert({
              id: record.id,
              full_name: record.fullName,
              nim: record.nim,
              major: record.major,
              department_choice: record.departmentChoice,
              motivation: record.motivation,
              status: record.status,
            })
            .then();
        }

        return updated;
      });
    },
    []
  );

  const updateOprecStatus = useCallback((id: string, status: OprecApplication["status"]) => {
    setOprecApplications((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, status } : o));
      safeStore("fikri_oprec_applications", updated);

      if (isSupabaseConfigured()) {
        supabase.from("oprec_applications").update({ status }).eq("id", id).then();
      }

      return updated;
    });
  }, []);

  // --- MUTATION: TANYA USTADZ CRUD ---
  const addQuestion = useCallback(
    (q: Omit<QuestionAnswer, "id" | "status" | "createdAt">) => {
      const newQ: QuestionAnswer = {
        ...q,
        id: `q-${Date.now()}`,
        status: "pending",
        createdAt: getLocalDate(),
      };

      setQuestions((prev) => {
        const updated = [newQ, ...prev];
        safeStore("fikri_questions", updated);

        if (isSupabaseConfigured()) {
          supabase
            .from("questions")
            .insert({
              id: newQ.id,
              question: newQ.question,
              asked_by: newQ.askedBy,
              major: newQ.major || null,
              category: newQ.category,
              status: "pending",
              created_at: newQ.createdAt,
            })
            .then();
        }

        return updated;
      });
    },
    []
  );

  const answerQuestion = useCallback(
    (id: string, answer: string, answeredBy: string) => {
      setQuestions((prev) => {
        const today = getLocalDate();
        const updated = prev.map((q) => {
          if (q.id === id) {
            return {
              ...q,
              answer,
              answeredBy,
              answeredAt: today,
              status: "answered" as const,
            };
          }
          return q;
        });
        safeStore("fikri_questions", updated);

        if (isSupabaseConfigured()) {
          supabase
            .from("questions")
            .update({
              answer,
              answered_by: answeredBy,
              answered_at: today,
              status: "answered",
            })
            .eq("id", id)
            .then();
        }

        return updated;
      });
    },
    []
  );

  const deleteQuestion = useCallback((id: string) => {
    setQuestions((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      safeStore("fikri_questions", updated);

      if (isSupabaseConfigured()) {
        supabase.from("questions").delete().eq("id", id).then();
      }

      return updated;
    });
  }, []);

  // --- MUTATION: PROFIL ORGANISASI & KABINET CRUD ---
  const updateOrgProfile = useCallback((profile: OrgProfile) => {
    setOrgProfile(profile);
    safeStore("fikri_v2_org_profile", profile);

    if (isSupabaseConfigured()) {
      supabase
        .from("org_profile")
        .upsert({
          id: "current",
          cabinet_name: profile.cabinetName,
          period: profile.period,
          tagline: profile.tagline,
          about_text: profile.aboutText,
          vision: profile.vision,
          missions: profile.missions,
          values: profile.values,
          updated_at: new Date().toISOString(),
        })
        .then();
    }
  }, []);

  const addManagementMember = useCallback((member: Omit<ManagementMember, "id">) => {
    const newMember: ManagementMember = {
      ...member,
      id: `mgt-${Date.now()}`,
    };

    setManagement((prev) => {
      const updated = [...prev, newMember];
      safeStore("fikri_v2_management", updated);

      if (isSupabaseConfigured()) {
        supabase
          .from("management_members")
          .insert({
            id: newMember.id,
            name: newMember.name,
            role: newMember.role,
            department: newMember.department,
            division: newMember.division || null,
            major: newMember.major,
            batch: newMember.batch,
            photo_url: newMember.photoUrl,
            quote: newMember.quote || null,
            instagram: newMember.socials?.instagram || null,
            linkedin: newMember.socials?.linkedin || null,
          })
          .then();
      }

      return updated;
    });
  }, []);

  const updateManagementMember = useCallback((id: string, member: Partial<ManagementMember>) => {
    setManagement((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, ...member } : m));
      safeStore("fikri_v2_management", updated);

      if (isSupabaseConfigured()) {
        const payload: Record<string, unknown> = {};
        if (member.name) payload.name = member.name;
        if (member.role) payload.role = member.role;
        if (member.department) payload.department = member.department;
        if (member.division !== undefined) payload.division = member.division;
        if (member.major) payload.major = member.major;
        if (member.batch) payload.batch = member.batch;
        if (member.photoUrl) payload.photo_url = member.photoUrl;
        if (member.quote !== undefined) payload.quote = member.quote;
        if (member.socials) {
          if (member.socials.instagram !== undefined) payload.instagram = member.socials.instagram;
          if (member.socials.linkedin !== undefined) payload.linkedin = member.socials.linkedin;
        }

        supabase.from("management_members").update(payload).eq("id", id).then();
      }

      return updated;
    });
  }, []);

  const deleteManagementMember = useCallback((id: string) => {
    setManagement((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      safeStore("fikri_v2_management", updated);

      if (isSupabaseConfigured()) {
        supabase.from("management_members").delete().eq("id", id).then();
      }

      return updated;
    });
  }, []);

  const resetToDefaultData = useCallback(() => {
    setCampaign(initialMosqueCampaign);
    safeStore("fikri_v2_campaign", initialMosqueCampaign);
    setManagement(initialManagement);
    safeStore("fikri_v2_management", initialManagement);
    setOrgProfile(initialOrgProfile);
    safeStore("fikri_v2_org_profile", initialOrgProfile);

    // If Supabase is connected, re-seed defaults
    if (isSupabaseConfigured()) {
      supabase.from("org_profile").upsert({
        id: "current",
        cabinet_name: initialOrgProfile.cabinetName,
        period: initialOrgProfile.period,
        tagline: initialOrgProfile.tagline,
        about_text: initialOrgProfile.aboutText,
        vision: initialOrgProfile.vision,
        missions: initialOrgProfile.missions,
        values: initialOrgProfile.values,
      }).then();

      supabase.from("donation_campaign").upsert({
        id: "current",
        title: initialMosqueCampaign.title,
        location: initialMosqueCampaign.location,
        target_amount: initialMosqueCampaign.targetAmount,
        collected_amount: initialMosqueCampaign.collectedAmount,
        donor_count: initialMosqueCampaign.donorCount,
        bank_accounts: initialMosqueCampaign.bankAccounts,
        milestones: initialMosqueCampaign.milestones,
        recent_donors: initialMosqueCampaign.recentDonors,
      }).then();
    }
  }, []);

  return (
    <DataStoreContext.Provider
      value={{
        isLoaded,
        isSupabaseConnected,
        campaign,
        articles,
        events,
        eventRegistrations,
        oprecApplications,
        management,
        orgProfile,
        questions,
        merchandise,
        addDonation,
        updateCampaignTarget,
        addArticle,
        updateArticle,
        deleteArticle,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        registerForEventWithDetails,
        submitOprecApplication,
        updateOprecStatus,
        addQuestion,
        answerQuestion,
        deleteQuestion,
        updateOrgProfile,
        addManagementMember,
        updateManagementMember,
        deleteManagementMember,
        resetToDefaultData,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore(): DataStoreState {
  const ctx = useContext(DataStoreContext);
  if (!ctx) {
    throw new Error("useDataStore must be used within a DataStoreProvider");
  }
  return ctx;
}
