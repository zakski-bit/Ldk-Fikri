"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Landmark, 
  BookOpen, 
  Calendar, 
  HelpCircle, 
  Trash2, 
  Check, 
  TrendingUp, 
  LogOut, 
  Send, 
  Eye, 
  Users, 
  Target, 
  Compass, 
  Sparkles, 
  Plus, 
  Edit3, 
  GraduationCap 
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import type { ManagementMember } from "@/data/mockData";
import ImageUpload from "@/components/ImageUpload";
import { sortDepartments, sortMembers } from "@/lib/hierarchy";

export default function AdminPage() {
  const router = useRouter();
  const {
    isSupabaseConnected,
    campaign,
    articles,
    events,
    questions,
    management,
    orgProfile,
    eventRegistrations,
    oprecApplications,
    addDonation,
    updateCampaignTarget,
    addArticle,
    deleteArticle,
    addEvent,
    deleteEvent,
    updateOprecStatus,
    answerQuestion,
    deleteQuestion,
    updateOrgProfile,
    addManagementMember,
    updateManagementMember,
    deleteManagementMember,
    resetToDefaultData,
  } = useDataStore();

  const [activeTab, setActiveTab] = useState<
    "overview" | "donasi" | "artikel" | "event" | "tanya-ustadz" | "profil-kabinet"
  >("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // Restore authenticated status from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("fikri_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Donasi Tab State
  const [newTarget, setNewTarget] = useState(campaign.targetAmount.toString());
  const [manualDonorName, setManualDonorName] = useState("");
  const [manualDonorAmount, setManualDonorAmount] = useState("");
  const [manualDonorMsg, setManualDonorMsg] = useState("");
  const [isManualAnonymous, setIsManualAnonymous] = useState(false);
  const [donationSuccessMsg, setDonationSuccessMsg] = useState("");

  // Artikel Tab State
  const [artTitle, setArtTitle] = useState("");
  const [artCategory, setArtCategory] = useState<"Fikih Kampus" | "Opini Mahasiswa" | "Renungan" | "Kemuslimahan" | "Kabar FIKRI">("Fikih Kampus");
  const [artExcerpt, setArtExcerpt] = useState("");
  const [artContent, setArtContent] = useState("");
  const [artAuthor, setArtAuthor] = useState("Departemen Syiar & Keumatan");
  const [artCover, setArtCover] = useState("https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80");
  const [artTags, setArtTags] = useState("Fikih, Kampus, Inspirasi");
  const [artSuccess, setArtSuccess] = useState(false);

  // Event Tab State
  const [evtTitle, setEvtTitle] = useState("");
  const [evtCategory, setEvtCategory] = useState<"Kajian Akbar" | "Mentoring PAMI" | "Pelatihan" | "Mabit" | "Social Project">("Kajian Akbar");
  const [evtDate, setEvtDate] = useState("");
  const [evtTime, setEvtTime] = useState("09.00 - 12.00 WIB");
  const [evtLocation, setEvtLocation] = useState("Masjid Darul Ilmi PNJ");
  const [evtSpeaker, setEvtSpeaker] = useState("");
  const [evtSpeakerTitle, setEvtSpeakerTitle] = useState("Ustadz / Pembina");
  const [evtDesc, setEvtDesc] = useState("");
  const [evtPoster, setEvtPoster] = useState("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80");
  const [evtQuota, setEvtQuota] = useState("100");
  const [evtSuccess, setEvtSuccess] = useState(false);

  // Tanya Ustadz Tab State
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [answeredByName, setAnsweredByName] = useState("Ustadz Pembina LDK FIKRI");

  // Profil & Kabinet Tab State
  const [cabinetName, setCabinetName] = useState(orgProfile.cabinetName);
  const [period, setPeriod] = useState(orgProfile.period);
  const [aboutText, setAboutText] = useState(orgProfile.aboutText);
  const [vision, setVision] = useState(orgProfile.vision);
  const [missionsText, setMissionsText] = useState(orgProfile.missions.join("\n"));
  const [valuesList, setValuesList] = useState(orgProfile.values);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

  // Anggota Kabinet State
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memName, setMemName] = useState("");
  const [memRole, setMemRole] = useState("");
  const [memDept, setMemDept] = useState("Pimpinan Inti");
  const [memCustomDept, setMemCustomDept] = useState("");
  const [memDivision, setMemDivision] = useState("");
  const [memMajor, setMemMajor] = useState("D4 Teknik Informatika");
  const [memBatch, setMemBatch] = useState("2023");
  const [memPhoto, setMemPhoto] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80");
  const [memQuote, setMemQuote] = useState("");
  const [memInstagram, setMemInstagram] = useState("");
  const [memLinkedin, setMemLinkedin] = useState("");
  const [memberSuccessMsg, setMemberSuccessMsg] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("Semua");

  const officialDepts = [
    "Pimpinan Inti",
    "Biro Sekum",
    "Biro Bendum",
    "Biro Mentoring",
    "Biro PSDM",
    "Departemen Syiar & Keumatan",
    "Departemen Kominfo",
    "Departemen Muslimpreneur",
    "Departemen ILC (Islamic Learning Center)",
    "Departemen Kemuslimahan"
  ];

  const uniqueExistingDepts = useMemo(() => {
    const s = new Set<string>(officialDepts);
    management.forEach((m) => {
      if (m.department) s.add(m.department);
    });
    return sortDepartments(Array.from(s));
  }, [management]);

  const filteredManagement = useMemo(() => {
    const list = selectedDeptFilter === "Semua"
      ? management
      : management.filter((m) => m.department === selectedDeptFilter);
    return sortMembers(list);
  }, [management, selectedDeptFilter]);

  // Handle Simple Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      adminPass === "fikripnj2026" ||
      adminPass === "admin" ||
      adminPass === "fikri"
    ) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fikri_admin_auth", "true");
      }
      setLoginError("");
    } else {
      setLoginError("Kata sandi salah. Coba: 'fikripnj2026' atau 'admin'");
    }
  };

  // Handle Logout (Kembali ke Tampilan Publik)
  const handleLogout = () => {
    const confirmExit = window.confirm(
      "Apakah Anda yakin ingin keluar dari Dashboard Admin dan kembali ke tampilan publik?"
    );
    if (confirmExit) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("fikri_admin_auth");
      }
      setIsAuthenticated(false);
      router.push("/");
    }
  };

  // Handle Target Update
  const handleUpdateTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(newTarget, 10);
    if (val > 0) {
      updateCampaignTarget(val);
      setDonationSuccessMsg("Target donasi berhasil diperbarui!");
      setTimeout(() => setDonationSuccessMsg(""), 3000);
    }
  };

  // Handle Manual Donation
  const handleAddManualDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(manualDonorAmount, 10);
    if (!val || val <= 0) return;

    addDonation({
      name: isManualAnonymous ? "Hamba Allah" : manualDonorName || "Donatur Offline",
      amount: val,
      message: manualDonorMsg,
      isAnonymous: isManualAnonymous,
    });

    setManualDonorName("");
    setManualDonorAmount("");
    setManualDonorMsg("");
    setDonationSuccessMsg("Donasi baru berhasil dicatat dan masuk ke sistem!");
    setTimeout(() => setDonationSuccessMsg(""), 3000);
  };

  // Handle Add Article
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artContent) return;

    const slug = artTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `artikel-${Date.now()}`;

    addArticle({
      slug,
      title: artTitle,
      category: artCategory,
      excerpt: artExcerpt,
      content: artContent,
      readTime: "4 menit",
      coverImage: artCover,
      tags: artTags.split(",").map((t) => t.trim()),
      author: {
        name: artAuthor,
        role: "Pengurus LDK FIKRI",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
    });

    setArtTitle("");
    setArtExcerpt("");
    setArtContent("");
    setArtSuccess(true);
    setTimeout(() => setArtSuccess(false), 3000);
  };

  // Handle Add Event
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle) return;

    const slug = evtTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `event-${Date.now()}`;

    addEvent({
      slug,
      title: evtTitle,
      category: evtCategory,
      date: evtDate,
      time: evtTime,
      location: evtLocation,
      speaker: evtSpeaker,
      speakerTitle: evtSpeakerTitle,
      description: evtDesc,
      posterUrl: evtPoster,
      quota: parseInt(evtQuota, 10) || 100,
      isRegistrationOpen: true,
    });

    setEvtTitle("");
    setEvtSpeaker("");
    setEvtDesc("");
    setEvtSuccess(true);
    setTimeout(() => setEvtSuccess(false), 3000);
  };

  // Handle Answer Question
  const handleSendAnswer = (id: string) => {
    if (!answerText) return;
    answerQuestion(id, answerText, answeredByName);
    setAnsweringId(null);
    setAnswerText("");
  };

  // Handle Save Visi Misi & Profil Kabinet
  const handleSaveOrgProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const missions = missionsText
      .split("\n")
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    updateOrgProfile({
      ...orgProfile,
      cabinetName,
      period,
      aboutText,
      vision,
      missions: missions.length > 0 ? missions : orgProfile.missions,
      values: valuesList,
    });

    setProfileSuccessMsg("Visi, misi, dan nilai dasar kabinet berhasil diperbarui!");
    setTimeout(() => setProfileSuccessMsg(""), 3500);
  };

  // Handle Value Change
  const handleValueChange = (id: string, field: "title" | "desc", value: string) => {
    setValuesList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleAddValue = () => {
    const newVal = {
      id: `val-${Date.now()}`,
      title: "Nilai Dasar Baru",
      desc: "Keterangan penerapan nilai dasar.",
    };
    setValuesList((prev) => [...prev, newVal]);
  };

  const handleDeleteValue = (id: string) => {
    setValuesList((prev) => prev.filter((v) => v.id !== id));
  };

  // Handle Add or Edit Member
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memName || !memRole) return;

    const chosenDept = memDept === "__custom" ? memCustomDept.trim() || "Umum" : memDept;

    const memberData = {
      name: memName,
      role: memRole,
      department: chosenDept,
      division: memDivision,
      major: memMajor,
      batch: memBatch,
      photoUrl: memPhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      quote: memQuote,
      socials: {
        instagram: memInstagram,
        linkedin: memLinkedin,
      },
    };

    if (editingMemberId) {
      updateManagementMember(editingMemberId, memberData);
      setMemberSuccessMsg("Data pengurus berhasil diperbarui!");
      setEditingMemberId(null);
    } else {
      addManagementMember(memberData);
      setMemberSuccessMsg("Pengurus baru berhasil ditambahkan!");
    }

    // Reset Form
    setMemName("");
    setMemRole("");
    setMemDivision("");
    setMemQuote("");
    setMemInstagram("");
    setMemLinkedin("");
    setMemCustomDept("");
    setTimeout(() => setMemberSuccessMsg(""), 3000);
  };

  const startEditMember = (m: ManagementMember) => {
    setEditingMemberId(m.id);
    setMemName(m.name);
    setMemRole(m.role);
    setMemDept(uniqueExistingDepts.includes(m.department) ? m.department : "__custom");
    if (!uniqueExistingDepts.includes(m.department)) {
      setMemCustomDept(m.department);
    }
    setMemDivision(m.division || "");
    setMemMajor(m.major);
    setMemBatch(m.batch);
    setMemPhoto(m.photoUrl);
    setMemQuote(m.quote || "");
    setMemInstagram(m.socials?.instagram || "");
    setMemLinkedin(m.socials?.linkedin || "");
  };

  const cancelEditMember = () => {
    setEditingMemberId(null);
    setMemName("");
    setMemRole("");
    setMemDivision("");
    setMemQuote("");
    setMemInstagram("");
    setMemLinkedin("");
    setMemCustomDept("");
  };

  // IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Portal Pengurus LDK FIKRI
            </h1>
            <p className="text-xs text-slate-500">
              Halaman khusus BPH & Pengurus untuk mengelola konten web tanpa koding.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Kata Sandi Akses Pengurus
              </label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="Masukkan kata sandi pengurus..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Kata sandi default: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-900 font-bold">fikripnj2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Masuk ke Dashboard
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-emerald-800 font-medium">
              ← Kembali ke Beranda Publik
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-16">
      {/* Top Admin Dedicated Navigation Bar (Menggantikan Navbar Publik) */}
      <nav className="sticky top-0 z-50 bg-emerald-950 text-white border-b border-emerald-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 border border-emerald-700 flex items-center justify-center text-amber-400 font-extrabold text-base shadow-sm">
              F
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  LDK FIKRI PNJ
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-800/80 text-amber-300 border border-emerald-700">
                  Panel Admin
                </span>
              </div>
              <span className="text-[10px] text-emerald-300/70 hidden sm:block">
                Area Khusus BPH & Pengurus Kabinet
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isSupabaseConnected ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-emerald-900/90 text-emerald-200 border border-emerald-600/40 px-3 py-1 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Supabase Cloud Aktif
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-amber-950/80 text-amber-200 border border-amber-600/40 px-3 py-1 rounded-full font-medium" title="Mode demo/offline. Data tersimpan di browser">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Penyimpanan Lokal Aktif
              </span>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow hover:shadow-rose-900/40"
              title="Keluar dari mode admin dan kembali ke website publik"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar ke Web Publik
            </button>
          </div>
        </div>
      </nav>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Card Dashboard Pengurus */}
        <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-900 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold">Dashboard Pengurus FIKRI</h1>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase">
                  Admin Non-Teknis
                </span>
                {isSupabaseConnected ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Supabase Cloud Terhubung
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full font-bold" title="Masukkan URL dan Key di .env.local untuk mengaktifkan cloud database Supabase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Penyimpanan Lokal Aktif
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-300">
                Kelola visi misi, kabinet, donasi infaq, artikel syiar, agenda kajian, dan tanya ustadz secara langsung.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow hover:shadow-rose-900/40"
              title="Keluar dari mode admin dan kembali ke website publik"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar ke Web Publik
            </button>
          </div>
        </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: "overview", label: "Ringkasan Metrik", icon: TrendingUp },
          { id: "profil-kabinet", label: "Profil & Anggota Kabinet", icon: Users },
          { id: "donasi", label: "Infaq & Donasi Dakwah", icon: Landmark },
          { id: "artikel", label: "Tulis & Kelola Artikel", icon: BookOpen },
          { id: "event", label: "Agenda & Pendaftaran", icon: Calendar },
          { id: "tanya-ustadz", label: "Tanya Ustadz", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-800 text-white shadow-md shadow-emerald-950/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* 5 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Infaq Dakwah</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>
              <p className="text-lg font-extrabold text-slate-900">
                {formatRupiah(campaign.collectedAmount)}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold">
                {campaign.donorCount} donatur
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Pengurus Kabinet</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-800">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-lg font-extrabold text-slate-900">
                {management.length} Orang
              </p>
              <p className="text-[11px] text-slate-500">{uniqueExistingDepts.length} departemen/biro</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Artikel Terbit</span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <p className="text-lg font-extrabold text-slate-900">
                {articles.length} Judul
              </p>
              <p className="text-[11px] text-slate-500">Katalog fikih mahasiswa</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Event & OPREC</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <p className="text-lg font-extrabold text-slate-900">
                {events.length} Acara
              </p>
              <p className="text-[11px] text-slate-500">
                {eventRegistrations.length} pendaftar | {oprecApplications.length} OPREC
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Tanya Ustadz</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-800">
                  <HelpCircle className="w-4 h-4" />
                </div>
              </div>
              <p className="text-lg font-extrabold text-slate-900">
                {questions.length} Tanya
              </p>
              <p className="text-[11px] text-amber-700 font-semibold">
                {questions.filter((q) => q.status === "pending").length} menunggu jawaban
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Aksi Cepat Pengurus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("profil-kabinet")}
                className="p-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all"
              >
                <span>+ Edit Visi Misi & Kabinet</span>
                <Users className="w-4 h-4 text-blue-700" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("artikel")}
                className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all"
              >
                <span>+ Tulis Artikel Baru</span>
                <BookOpen className="w-4 h-4 text-emerald-700" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("donasi")}
                className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all"
              >
                <span>+ Catat Infaq Manual / Tunai</span>
                <Landmark className="w-4 h-4 text-amber-700" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("event")}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all"
              >
                <span>+ Buat Agenda Kajian Baru</span>
                <Calendar className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PROFIL & ANGGOTA KABINET */}
      {activeTab === "profil-kabinet" && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Section 1: Edit Visi, Misi & 5 Nilai Dasar */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-700" />
                  Visi, Misi & 5 Nilai Dasar Organisasi
                </h3>
                <p className="text-xs text-slate-500">
                  Data yang Anda ubah di sini akan langsung tampil pada halaman publik Profil UKM LDK FIKRI.
                </p>
              </div>
            </div>

            {profileSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                {profileSuccessMsg}
              </div>
            )}

            <form onSubmit={handleSaveOrgProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nama Kabinet
                  </label>
                  <input
                    type="text"
                    required
                    value={cabinetName}
                    onChange={(e) => setCabinetName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="Contoh: Kabinet Bersama Menebar Manfaat"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Periode Kepengurusan
                  </label>
                  <input
                    type="text"
                    required
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="Contoh: 2025/2026"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Deskripsi Singkat Organisasi (About Text)
                </label>
                <textarea
                  rows={2}
                  required
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Visi Utama
                </label>
                <textarea
                  rows={3}
                  required
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="Tuliskan visi besar kabinet..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Poin Misi Strategis (Tulis 1 baris per misi)
                  </label>
                  <span className="text-[11px] text-slate-400">Tekan Enter untuk baris baru</span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={missionsText}
                  onChange={(e) => setMissionsText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                  placeholder="Misi 1&#10;Misi 2&#10;Misi 3"
                />
              </div>

              {/* 5 Nilai Dasar Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Nilai Dasar Organisasi ({valuesList.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddValue}
                    className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Nilai Baru
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {valuesList.map((val, idx) => (
                    <div key={val.id || idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-600 uppercase">Nilai #{idx + 1}</span>
                        {valuesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteValue(val.id)}
                            className="text-rose-500 hover:text-rose-700 text-xs p-1"
                            title="Hapus Nilai"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={val.title}
                        onChange={(e) => handleValueChange(val.id, "title", e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                        placeholder="Judul Nilai (cth: Integritas)"
                      />
                      <textarea
                        rows={2}
                        value={val.desc}
                        onChange={(e) => handleValueChange(val.id, "desc", e.target.value)}
                        className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-[11px] text-slate-700"
                        placeholder="Deskripsi nilai dasar..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Simpan Perubahan Visi, Misi & Nilai Dasar
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Tambah & Kelola Anggota Kabinet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Input / Edit Anggota (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    {editingMemberId ? "Edit Anggota Kabinet" : "Tambah Anggota Kabinet"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Bisa tambah sebanyak-banyaknya untuk semua departemen/biro.
                  </p>
                </div>
                {editingMemberId && (
                  <button
                    type="button"
                    onClick={cancelEditMember}
                    className="text-xs text-rose-600 hover:underline font-bold"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              {memberSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  {memberSuccessMsg}
                </div>
              )}

              <form onSubmit={handleSaveMember} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Nama Lengkap Anggota
                  </label>
                  <input
                    type="text"
                    required
                    value={memName}
                    onChange={(e) => setMemName(e.target.value)}
                    placeholder="Contoh: Ahmad Rayhan Al-Faruq"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Amanah / Jabatan
                    </label>
                    <input
                      type="text"
                      required
                      value={memRole}
                      onChange={(e) => setMemRole(e.target.value)}
                      placeholder="Contoh: Kadept / Kabir / Staff"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {[
                        "Ketum",
                        "Waketum",
                        "Ketua Keputrian",
                        "Kadept",
                        "Kabir",
                        "Korwat",
                        "BPH",
                        "Staff",
                      ].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setMemRole(r)}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-100 text-[10px] font-bold text-slate-700 hover:text-emerald-900 border border-slate-200 transition-colors"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Divisi / Deskripsi Tugas (Opsional)
                    </label>
                    <input
                      type="text"
                      value={memDivision}
                      onChange={(e) => setMemDivision(e.target.value)}
                      placeholder="Contoh: Media Kreatif"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Departemen / Biro
                  </label>
                  <select
                    value={memDept}
                    onChange={(e) => setMemDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {uniqueExistingDepts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                    <option value="__custom">+ Tulis Departemen/Biro Baru</option>
                  </select>
                  {memDept === "__custom" && (
                    <input
                      type="text"
                      required
                      value={memCustomDept}
                      onChange={(e) => setMemCustomDept(e.target.value)}
                      placeholder="Ketik nama departemen/biro baru..."
                      className="w-full mt-2 px-3 py-2 rounded-xl border border-emerald-400 text-xs text-slate-900 bg-emerald-50/50"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Jurusan di PNJ
                    </label>
                    <input
                      type="text"
                      required
                      value={memMajor}
                      onChange={(e) => setMemMajor(e.target.value)}
                      placeholder="D4 Teknik Informatika"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Angkatan Masuk
                    </label>
                    <input
                      type="text"
                      required
                      value={memBatch}
                      onChange={(e) => setMemBatch(e.target.value)}
                      placeholder="2023"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <ImageUpload
                  label="Foto Resmi Pengurus"
                  value={memPhoto}
                  onChange={setMemPhoto}
                  folder="pengurus"
                  aspectRatio="square"
                  helperText="Upload pas foto atau foto formal pengurus (rasio 1:1)"
                />

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Quotes / Motto Perjuangan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={memQuote}
                    onChange={(e) => setMemQuote(e.target.value)}
                    placeholder="Tuliskan motto inspiratif..."
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Link Instagram (Opsional)
                    </label>
                    <input
                      type="url"
                      value={memInstagram}
                      onChange={(e) => setMemInstagram(e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Link LinkedIn (Opsional)
                    </label>
                    <input
                      type="url"
                      value={memLinkedin}
                      onChange={(e) => setMemLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {editingMemberId ? "Simpan Perubahan Anggota" : "+ Tambahkan ke Kabinet"}
                </button>
              </form>
            </div>

            {/* List Anggota Kabinet (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                <h3 className="font-extrabold text-slate-900 text-base">
                  Daftar Pengurus Aktif ({filteredManagement.length} dari {management.length})
                </h3>

                {/* Filter Departemen & Reset Button */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedDeptFilter}
                    onChange={(e) => setSelectedDeptFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option value="Semua">Semua Departemen & Biro</option>
                    {uniqueExistingDepts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Reset seluruh data kabinet ke susunan standar resmi LDK FIKRI (Ketum, Waketum, Ketua Keputrian, 5 Dept, 4 Biro)?")) {
                        resetToDefaultData();
                        setMemberSuccessMsg("Data berhasil direset ke susunan pengurus standar resmi!");
                        setTimeout(() => setMemberSuccessMsg(""), 3000);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all whitespace-nowrap"
                    title="Kembalikan susunan lengkap 5 Dept & 4 Biro"
                  >
                    Reset Standar
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {filteredManagement.map((mem) => (
                  <div
                    key={mem.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={mem.photoUrl}
                        alt={mem.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-slate-900 text-sm">{mem.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {mem.department}
                          </span>
                          {mem.division && (
                            <span className="text-[10px] font-semibold text-slate-500">
                              • {mem.division}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-emerald-900">{mem.role}</p>
                        <p className="text-[11px] text-slate-400">
                          {mem.major} ({mem.batch})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEditMember(mem)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors"
                        title="Edit Data Pengurus"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteManagementMember(mem.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-700 transition-colors"
                        title="Hapus dari Kabinet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MANAJEMEN DONASI MASJID */}
      {activeTab === "donasi" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
          {/* Form Update Target & Input Manual */}
          <div className="space-y-6">
            {donationSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                {donationSuccessMsg}
              </div>
            )}

            {/* Form Ubah Target */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Atur Target Dana Pembangunan
              </h3>
              <form onSubmit={handleUpdateTarget} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Target Total Dana (Rp)
                  </label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                    placeholder="Contoh: 1500000000"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Perbarui Target Donasi
                </button>
              </form>
            </div>

            {/* Form Catat Donasi Manual / Cash */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Catat Infaq / Donasi Tunai Offline
              </h3>
              <p className="text-xs text-slate-500">
                Gunakan formulir ini jika menerima infaq tunai dari kotak amal, dosen, atau alumni di masjid kampus.
              </p>
              <form onSubmit={handleAddManualDonation} className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">
                      Nama Donatur
                    </label>
                    <label className="flex items-center gap-1 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isManualAnonymous}
                        onChange={(e) => setIsManualAnonymous(e.target.checked)}
                      />
                      Hamba Allah
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={isManualAnonymous}
                    value={manualDonorName}
                    onChange={(e) => setManualDonorName(e.target.value)}
                    placeholder="Nama donatur atau instansi..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Nominal Donasi (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={manualDonorAmount}
                    onChange={(e) => setManualDonorAmount(e.target.value)}
                    placeholder="Contoh: 1000000"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Pesan / Doa Donatur (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={manualDonorMsg}
                    onChange={(e) => setManualDonorMsg(e.target.value)}
                    placeholder="Semoga bermanfaat untuk perluasan masjid..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  + Tambahkan Catatan Donasi
                </button>
              </form>
            </div>
          </div>

          {/* Riwayat Donatur Masuk */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Riwayat Transaksi Donasi ({campaign.recentDonors.length})
            </h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {campaign.recentDonors.map((d) => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{d.name}</span>
                      {d.bank && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {d.bank}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block">{formatDateIndo(d.date)}</span>
                    {d.message && (
                      <p className="text-[11px] text-slate-600 italic mt-0.5">
                        &ldquo;{d.message}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="font-extrabold text-emerald-800 text-sm shrink-0">
                    {formatRupiah(d.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: TULIS & KELOLA ARTIKEL */}
      {activeTab === "artikel" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Tulis Artikel Dakwah & Fikih Baru
            </h3>

            {artSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                Artikel berhasil diterbitkan dan langsung tampil di halaman Syiar!
              </div>
            )}

            <form onSubmit={handleCreateArticle} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="Contoh: Panduan Fikih Sholat Saat Praktikum Lab..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Kategori
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setArtCategory(e.target.value as typeof artCategory)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  >
                    <option value="Fikih Kampus">Fikih Kampus</option>
                    <option value="Opini Mahasiswa">Opini Mahasiswa</option>
                    <option value="Renungan">Renungan</option>
                    <option value="Kemuslimahan">Kemuslimahan</option>
                    <option value="Kabar FIKRI">Kabar FIKRI</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Nama Penulis / Tim
                  </label>
                  <input
                    type="text"
                    required
                    value={artAuthor}
                    onChange={(e) => setArtAuthor(e.target.value)}
                    placeholder="Divisi Syiar Kreatif"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  required
                  value={artExcerpt}
                  onChange={(e) => setArtExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat yang menarik minat pembaca..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Isi Konten Lengkap Artikel
                </label>
                <textarea
                  rows={8}
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  placeholder="Tuliskan isi artikel selengkapnya di sini..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 font-sans"
                />
              </div>

              <ImageUpload
                label="Gambar Sampul Artikel"
                value={artCover}
                onChange={setArtCover}
                folder="artikel"
                aspectRatio="wide"
                helperText="Upload foto cover artikel (rekomendasi rasio 16:9 landscape)"
              />

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Tags (Pisahkan koma)
                </label>
                <input
                  type="text"
                  value={artTags}
                  onChange={(e) => setArtTags(e.target.value)}
                  placeholder="Contoh: Fikih, Kuliah, Praktikum"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-sm transition-all"
              >
                + Publikasikan Artikel Sekarang
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Artikel Aktif ({articles.length})
            </h3>
            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {art.category}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {formatDateIndo(art.publishedAt)} • {art.author.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteArticle(art.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors shrink-0"
                    title="Hapus Artikel"
                    aria-label={`Hapus artikel ${art.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: EVENT & AGENDA */}
      {activeTab === "event" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-lg">
                Buat Agenda Kegiatan Baru
              </h3>

              {evtSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  Event berhasil dibuat dan pendaftaran langsung aktif!
                </div>
              )}

              <form onSubmit={handleCreateEvent} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Judul Acara / Kajian
                  </label>
                  <input
                    type="text"
                    required
                    value={evtTitle}
                    onChange={(e) => setEvtTitle(e.target.value)}
                    placeholder="Contoh: Kajian Akbar Ramadhan di Kampus..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Kategori Event
                    </label>
                    <select
                      value={evtCategory}
                      onChange={(e) => setEvtCategory(e.target.value as typeof evtCategory)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                    >
                      <option value="Kajian Akbar">Kajian Akbar</option>
                      <option value="Mentoring PAMI">Mentoring PAMI</option>
                      <option value="Pelatihan">Pelatihan</option>
                      <option value="Mabit">Mabit</option>
                      <option value="Social Project">Social Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Kuota Maksimal Peserta
                    </label>
                    <input
                      type="number"
                      value={evtQuota}
                      onChange={(e) => setEvtQuota(e.target.value)}
                      placeholder="100"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Tanggal Pelaksanaan
                    </label>
                    <input
                      type="date"
                      required
                      value={evtDate}
                      onChange={(e) => setEvtDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Waktu (Jam WIB)
                    </label>
                    <input
                      type="text"
                      value={evtTime}
                      onChange={(e) => setEvtTime(e.target.value)}
                      placeholder="09.00 - 11.30 WIB"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Narasumber / Pembicara
                    </label>
                    <input
                      type="text"
                      value={evtSpeaker}
                      onChange={(e) => setEvtSpeaker(e.target.value)}
                      placeholder="Nama Ustadz / Trainer"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Lokasi Kegiatan
                    </label>
                    <input
                      type="text"
                      value={evtLocation}
                      onChange={(e) => setEvtLocation(e.target.value)}
                      placeholder="Masjid Darul Ilmi PNJ"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <ImageUpload
                  label="Poster Resmi Event / Kajian"
                  value={evtPoster}
                  onChange={setEvtPoster}
                  folder="event"
                  aspectRatio="wide"
                  helperText="Upload gambar poster kajian (JPG, PNG, WEBP)"
                />

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Deskripsi Kegiatan
                  </label>
                  <textarea
                    rows={3}
                    value={evtDesc}
                    onChange={(e) => setEvtDesc(e.target.value)}
                    placeholder="Keterangan singkat materi acara..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  + Terbitkan Event Baru
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Event Terjadwal ({events.length})
              </h3>
              <div className="space-y-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {ev.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-emerald-900">
                          {ev.registeredCount} / {ev.quota} Peserta
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus agenda "${ev.title}"?`)) {
                              deleteEvent(ev.id);
                            }
                          }}
                          className="p-1 rounded-md text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Hapus Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-xs">
                      {ev.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {formatDateIndo(ev.date)} • {ev.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Pendaftar Event & Berkas OPREC */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
            {/* Pendaftar Event */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Daftar Peserta Registrasi Event ({eventRegistrations.length})
              </h4>
              {eventRegistrations.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Belum ada peserta yang mendaftar online.</p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {eventRegistrations.map((reg) => (
                    <div key={reg.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{reg.fullName} ({reg.nim})</p>
                        <p className="text-[11px] text-slate-500">{reg.major} • {reg.eventTitle}</p>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-800 font-bold">{reg.waNumber}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pendaftar OPREC dengan Seleksi Status */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Berkas Calon Pengurus (OPREC) ({oprecApplications.length})
              </h4>
              {oprecApplications.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Belum ada formulir OPREC yang masuk.</p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {oprecApplications.map((app) => (
                    <div key={app.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div>
                          <span className="font-bold text-slate-900">{app.fullName}</span>
                          <span className="text-slate-400 text-[11px]"> ({app.nim} - {app.major})</span>
                        </div>
                        <select
                          value={app.status}
                          onChange={(e) => updateOprecStatus(app.id, e.target.value as typeof app.status)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border focus:outline-none ${
                            app.status === "accepted"
                              ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                              : app.status === "interview"
                              ? "bg-blue-100 text-blue-900 border-blue-300"
                              : app.status === "rejected"
                              ? "bg-rose-100 text-rose-900 border-rose-300"
                              : "bg-amber-100 text-amber-900 border-amber-300"
                          }`}
                        >
                          <option value="pending">⏳ Review</option>
                          <option value="interview">📞 Wawancara</option>
                          <option value="accepted">✓ Diterima</option>
                          <option value="rejected">✕ Ditolak</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800">
                          {app.departmentChoice}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200">
                        &ldquo;{app.motivation}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: TANYA USTADZ / KONSELING */}
      {activeTab === "tanya-ustadz" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              Kelola & Jawab Pertanyaan Mahasiswa
            </h3>
            <p className="text-xs text-slate-500">
              Pertanyaan yang dijawab di sini akan otomatis tampil di halaman publik Tanya Ustadz.
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {q.category}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      q.status === "answered"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {q.status === "answered" ? "Sudah Dijawab" : "Menunggu Tanggapan"}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Dari: {q.askedBy} {q.major && `(${q.major})`}
                  </p>
                  <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                    &ldquo;{q.question}&rdquo;
                  </p>
                </div>

                {/* Existing answer if any */}
                {q.answer && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <p className="text-[11px] font-bold text-emerald-800">
                      Jawaban oleh: {q.answeredBy}
                    </p>
                    <p className="text-slate-700 leading-relaxed">{q.answer}</p>
                  </div>
                )}

                {/* Answer form */}
                {answeringId === q.id ? (
                  <div className="space-y-3 pt-2">
                    <textarea
                      rows={3}
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Tuliskan jawaban syar'i dan bijak untuk mahasiswa..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={answeredByName}
                        onChange={(e) => setAnsweredByName(e.target.value)}
                        placeholder="Nama Ustadz / Penjawab"
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 w-64"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setAnsweringId(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300 transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendAnswer(q.id)}
                          className="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Kirim & Publikasikan Jawaban
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAnsweringId(q.id);
                        setAnswerText(q.answer || "");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-all"
                    >
                      {q.status === "answered" ? "Ubah Jawaban" : "Tulis Jawaban"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
