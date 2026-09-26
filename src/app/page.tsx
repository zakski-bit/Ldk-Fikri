"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Clock,
  Compass,
  MessageSquare,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Users,
  Crown,
  FileText,
  Wallet,
  GraduationCap,
  Megaphone,
  Layers,
  Heart
} from "lucide-react";
import MasjidDarulIlmiCard from "@/components/MasjidDarulIlmiCard";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import DailyQuoteCard from "@/components/DailyQuoteCard";
import { useDataStore } from "@/lib/store";
import { formatDateIndo } from "@/lib/utils";

export default function HomePage() {
  const { articles, events, questions } = useDataStore();
  const [structTab, setStructTab] = useState<"all" | "pimpinan" | "biro" | "dept">("all");

  const featuredArticles = articles.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-100/60 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Campus Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-900/10 text-emerald-900 text-xs sm:text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Portal Resmi UKM LDK FIKRI Politeknik Negeri Jakarta</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Merajut Ukhuwah, <br className="hidden sm:inline" />
              Menebar Maslahat di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 underline decoration-amber-400 decoration-4 underline-offset-8">
                Kampus Vokasi
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
              Wadah pembinaan mahasiswa muslim Politeknik Negeri Jakarta yang berakar pada integritas syariat, keunggulan sains terapan, dan aksi sosial nyata.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/donasi"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 group"
              >
                <Landmark className="w-5 h-5 text-amber-300 group-hover:rotate-6 transition-transform" />
                <span>Wakaf Pembangunan Masjid</span>
              </Link>
              <Link
                href="/event"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-extrabold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Agenda Kajian & OPREC</span>
              </Link>
            </div>

            {/* Factual Scope Banner */}
            <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-slate-600">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
                🏛️ 5 Departemen & 4 Biro
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
                🕌 Pembangunan Masjid Daarul Ilmi (3.500 Jamaah)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
                🎓 Politeknik Negeri Jakarta
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID SECTION (INTERACTIVE CORE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pusat Informasi & Interaksi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Akses cepat jadwal ibadah, progres wakaf pembangunan masjid, materi dakwah, dan konsultasi syar'i.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Live Widget
          </span>
        </div>

        {/* The Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Cell 1: Masjid Darul Ilmi PNJ (Col Span 7) */}
          <div className="lg:col-span-7 flex">
            <MasjidDarulIlmiCard />
          </div>

          {/* Bento Cell 2 & 3: Prayer Times & Daily Quote (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <PrayerTimesWidget />
            <DailyQuoteCard />
          </div>

          {/* Bento Cell 4: Upcoming Events (Col Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Agenda & Kajian Terdekat</h3>
                    <p className="text-xs text-slate-500">Kajian rutin, pelatihan, dan mentoring PNJ</p>
                  </div>
                </div>
                <Link
                  href="/event"
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  Lihat Semua
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3.5">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                          {evt.category}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDateIndo(evt.date)}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm hover:text-emerald-800 transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        Pembicara: <span className="font-semibold text-slate-700">{evt.speaker}</span>
                      </p>
                    </div>

                    <Link
                      href={`/event#${evt.id}`}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-800 hover:text-white text-emerald-900 border border-emerald-300/80 text-xs font-bold transition-all text-center whitespace-nowrap shadow-sm"
                    >
                      Daftar Event
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Mau daftar jadi pengurus LDK FIKRI atau peserta Mentoring PAMI?</span>
              <Link href="/event#oprec" className="font-bold text-emerald-800 hover:underline">
                Buka Portal OPREC →
              </Link>
            </div>
          </div>

          {/* Bento Cell 5: Tanya Ustadz / Konseling Mahasiswa (Col Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-bold border border-emerald-700/60">
                <HelpCircle className="w-3.5 h-3.5" />
                100% Bebas & Anonim
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  Kotak Tanya Ustadz & Konseling Syar'i
                </h3>
                <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                  Punya pertanyaan seputar fikih perkuliahan, adab pergaulan kampus, atau butuh teman curhat yang islami? Tanyakan secara anonim tanpa ragu.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-900/50 border border-emerald-800/60 text-xs space-y-1.5">
                <p className="text-amber-300 font-bold">💬 Pertanyaan Terjawab Terkini:</p>
                <p className="text-emerald-100 line-clamp-2 italic">
                  "{questions[0]?.question || 'Bagaimana cara menjaga sholat fardhu saat ada jadwal praktikum padat di lab?'}"
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/tanya-ustadz"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow"
              >
                <MessageSquare className="w-4 h-4" />
                Kirim Pertanyaan Anonim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARTICLES (SYIAR DAKWAH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              Media & Literasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Artikel Syiar & Fikih Kampus
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Tulisan segar seputar dunia mahasiswa, adab menuntut ilmu, dan keagamaan kontemporer.
            </p>
          </div>

          <Link
            href="/syiar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-50 px-4 py-2 rounded-xl border border-slate-200 transition-all shadow-sm"
          >
            Semua Artikel
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-900/90 text-white backdrop-blur-md">
                  {art.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span>{formatDateIndo(art.publishedAt)}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {art.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/syiar#${art.slug}`}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    Baca
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. DEPARTEMEN & STRUKTUR LDK FIKRI HIGHLIGHT */}
      <section className="bg-emerald-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Kepengurusan & Struktur Organisasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Struktur & Departemen FIKRI PNJ
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80">
              Sinergi Pimpinan Inti, 4 Biro Pendukung, dan 5 Departemen Penggerak Dakwah Vokasi Politeknik Negeri Jakarta.
            </p>

            {/* Filter Tabs */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 mt-4 max-w-full overflow-x-auto">
              {[
                { id: "all", label: "Semua Unit (12)" },
                { id: "pimpinan", label: "Pimpinan Inti (3)" },
                { id: "biro", label: "4 Biro" },
                { id: "dept", label: "5 Departemen" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStructTab(tab.id as "all" | "pimpinan" | "biro" | "dept")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    structTab === tab.id
                      ? "bg-amber-400 text-emerald-950 shadow-md font-extrabold"
                      : "text-emerald-200 hover:text-white hover:bg-emerald-800/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* 1. Pimpinan Inti */}
            {(structTab === "all" || structTab === "pimpinan") && (
              <div className="space-y-3">
                {structTab === "all" && (
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                    <Crown className="w-4 h-4" />
                    <span>Pimpinan Inti Organisasi</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {[
                    { name: "Ketua Umum (Ketum)", sub: "Nakhoda & Penanggung Jawab Dakwah Kampus", icon: Crown, dept: "Pimpinan Inti" },
                    { name: "Wakil Ketua Umum (Waketum)", sub: "Koordinator Internal & Sinergi Lembaga", icon: ShieldCheck, dept: "Pimpinan Inti" },
                    { name: "Ketua Keputrian", sub: "Koordinator Kemuslimahan & Pemberdayaan Akhwat", icon: Heart, dept: "Pimpinan Inti" },
                  ].map((lead) => {
                    const Icon = lead.icon;
                    return (
                      <Link
                        key={lead.name}
                        href="/profil#departemen"
                        className="p-5 rounded-2xl bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-700/70 hover:border-amber-400 transition-all flex items-start gap-3.5 group shadow-sm"
                      >
                        <div className="w-11 h-11 rounded-xl bg-amber-400/15 group-hover:bg-amber-400/25 text-amber-300 flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-300/90 uppercase tracking-wider block">
                            {lead.dept}
                          </span>
                          <h4 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors mt-0.5">
                            {lead.name}
                          </h4>
                          <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed">
                            {lead.sub}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. 4 Biro Pendukung */}
            {(structTab === "all" || structTab === "biro") && (
              <div className="space-y-3">
                {structTab === "all" && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>4 Biro Pendukung</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {[
                    { name: "Biro Sekum", role: "Sekretaris Umum", desc: "Arsip surat, administrasi & inventaris", icon: FileText },
                    { name: "Biro Bendum", role: "Bendahara Umum", desc: "Transparansi kas & sirkulasi anggaran", icon: Wallet },
                    { name: "Biro Mentoring", role: "Kaderisasi PAMI", desc: "Kurikulum mentoring & pembinaan maba", icon: GraduationCap },
                    { name: "Biro PSDM", role: "Pengembangan SDM", desc: "Upgrading internal & penjagaan kader", icon: Users },
                  ].map((biro) => {
                    const Icon = biro.icon;
                    return (
                      <Link
                        key={biro.name}
                        href="/profil#departemen"
                        className="p-4 sm:p-5 rounded-2xl bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/80 transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-amber-400/10 group-hover:bg-amber-400/20 text-amber-300 flex items-center justify-center transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                            Biro
                          </span>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors">
                            {biro.name}
                          </h4>
                          <span className="text-[11px] font-medium text-amber-300/80 block mt-0.5">
                            {biro.role}
                          </span>
                          <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed">
                            {biro.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. 5 Departemen Penggerak */}
            {(structTab === "all" || structTab === "dept") && (
              <div className="space-y-3">
                {structTab === "all" && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>5 Departemen Penggerak</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {[
                    { name: "Syiar & Keumatan", role: "Syiar Kampus", desc: "Kajian akbar & peribadatan masjid", icon: Megaphone },
                    { name: "Kominfo", role: "Media & Publikasi", desc: "Desain visual, website & media sosial", icon: Sparkles },
                    { name: "Muslimpreneur", role: "Kemandirian Usaha", desc: "Merchandise FIKRI & pendanaan mandiri", icon: ShoppingBag },
                    { name: "ILC", role: "Islamic Learning Center", desc: "Kelas tahsin, tahfidz & bahasa Arab", icon: BookOpen },
                    { name: "Kemuslimahan", role: "Pemberdayaan Akhwat", desc: "Kajian fiqih wanita & konseling muslimah", icon: Heart },
                  ].map((dept) => {
                    const Icon = dept.icon;
                    return (
                      <Link
                        key={dept.name}
                        href="/profil#departemen"
                        className="p-4 sm:p-5 rounded-2xl bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/80 transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-amber-400/10 group-hover:bg-amber-400/20 text-amber-300 flex items-center justify-center transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                            Dept
                          </span>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors">
                            {dept.name}
                          </h4>
                          <span className="text-[11px] font-medium text-amber-300/80 block mt-0.5">
                            {dept.role}
                          </span>
                          <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed">
                            {dept.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-lg"
            >
              Lihat Profil & Biodata Pengurus Lengkap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION / JOIN COMMUNITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-800 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full">
              Keluarga Besar Mahasiswa Muslim PNJ
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Ingin Berpartisipasi atau Bergabung Bersama Kami?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Dapatkan pengumuman kajian terkini, materi buletin PDF gratis, dan informasi beasiswa kampus langsung di WhatsApp Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://api.whatsapp.com/send?phone=6281234567890&text=Assalamu%27alaikum%20Admin%20LDK%20FIKRI%20PNJ,%20saya%20ingin%20bergabung%20dengan%20komunitas%20mahasiswa%20muslim%20PNJ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-emerald-950 hover:bg-slate-100 font-extrabold text-sm shadow-md transition-all text-center whitespace-nowrap"
            >
              Gabung Komunitas WA
            </a>
            <Link
              href="/donasi"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-950 hover:bg-black text-amber-300 font-extrabold text-sm transition-all text-center whitespace-nowrap"
            >
              Wakaf Pembangunan Masjid
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
