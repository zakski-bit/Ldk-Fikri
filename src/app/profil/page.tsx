"use client";

import { useMemo, useState } from "react";
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Instagram, 
  Linkedin, 
  GraduationCap, 
  Users 
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { sortDepartments, sortMembers } from "@/lib/hierarchy";

export default function ProfilPage() {
  const { management, orgProfile } = useDataStore();
  const [selectedDept, setSelectedDept] = useState<string>("Semua");

  // Ordered list of departments matching official structure + intelligent custom department placement
  const departments = useMemo(() => {
    const allDepts = Array.from(new Set(management.map((m) => m.department).filter(Boolean)));
    const sorted = sortDepartments(allDepts);
    return ["Semua", ...sorted];
  }, [management]);

  // Always sorted strictly by department order, role hierarchy, and name
  const filteredMembers = useMemo(() => {
    const list = selectedDept === "Semua"
      ? management
      : management.filter((m) => m.department === selectedDept);
    return sortMembers(list);
  }, [management, selectedDept]);

  const getRoleBadge = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("ketum") || r.includes("ketua umum")) {
      return { label: "Ketum", bg: "bg-amber-100 text-amber-950 border-amber-300 font-extrabold" };
    }
    if (r.includes("waketum") || r.includes("wakil")) {
      return { label: "Waketum", bg: "bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold" };
    }
    if (r.includes("keputrian")) {
      return { label: "Ketua Keputrian", bg: "bg-rose-100 text-rose-950 border-rose-300 font-extrabold" };
    }
    if (r.includes("kadept")) {
      return { label: "Kadept", bg: "bg-blue-100 text-blue-900 border-blue-200 font-bold" };
    }
    if (r.includes("kabir")) {
      return { label: "Kabir", bg: "bg-teal-100 text-teal-900 border-teal-200 font-bold" };
    }
    if (r.includes("korwat")) {
      return { label: "Korwat", bg: "bg-purple-100 text-purple-900 border-purple-200 font-bold" };
    }
    if (r.includes("bph")) {
      return { label: "BPH Divisi", bg: "bg-amber-50 text-amber-800 border-amber-200 font-semibold" };
    }
    if (r.includes("staff")) {
      return { label: "Staff", bg: "bg-slate-100 text-slate-700 border-slate-200 font-medium" };
    }
    return { label: role, bg: "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium" };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Header Profil */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Profil Resmi UKM LDK FIKRI PNJ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Lembaga Dakwah Kampus <br />
          <span className="text-emerald-800">FIKRI Politeknik Negeri Jakarta</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          {orgProfile.aboutText}
        </p>
      </div>

      {/* 2. Visi & Misi Dinamis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visi */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 border border-emerald-900 shadow-xl space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Visi Utama
            </h2>
            <p className="text-sm sm:text-base text-emerald-200 leading-relaxed font-medium">
              &ldquo;{orgProfile.vision}&rdquo;
            </p>
          </div>
          <div className="pt-4 border-t border-emerald-900/80">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              {orgProfile.cabinetName} • Periode {orgProfile.period}
            </span>
          </div>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Misi Strategis
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              {orgProfile.missions.map((mission, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Lima Nilai Budaya Organisasi (Dinamis) */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Karakteristik & Budaya Kader
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {orgProfile.values.length} Nilai Dasar FIKRI PNJ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {orgProfile.values.map((val, idx) => (
            <div key={val.id || idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xl font-extrabold text-amber-500">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Struktur Organisasi & Pengurus */}
      <div id="departemen" className="space-y-8 pt-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Struktur Kepengurusan {orgProfile.period}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {orgProfile.cabinetName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Pimpinan Inti (Ketum, Waketum, Ketua Keputrian), 5 Departemen, dan 4 Biro Politeknik Negeri Jakarta.
              </p>
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedDept === dept
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        {filteredMembers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
            Belum ada anggota yang terdaftar di departemen ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => {
              const roleBadge = getRoleBadge(member.role);
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-900/90 text-white backdrop-blur-md">
                      {member.department}
                    </span>
                    <span className={`absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full border backdrop-blur-md ${roleBadge.bg}`}>
                      {roleBadge.label}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-emerald-800 mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        {member.major} (Angkatan {member.batch})
                      </p>
                    </div>

                    {member.quote && (
                      <p className="text-xs text-slate-600 italic border-l-2 border-amber-400 pl-3 py-0.5 leading-relaxed">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}

                    {member.socials && (member.socials.instagram || member.socials.linkedin) && (
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        {member.socials.instagram && (
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                            aria-label={`Instagram ${member.name}`}
                          >
                            <Instagram className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                            aria-label={`LinkedIn ${member.name}`}
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
