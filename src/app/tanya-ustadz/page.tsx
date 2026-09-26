"use client";

import { useState } from "react";
import { 
  HelpCircle, 
  Send, 
  Check, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Lock
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { formatDateIndo } from "@/lib/utils";

export default function TanyaUstadzPage() {
  const { questions, addQuestion } = useDataStore();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  // Question Form State
  const [newQuestion, setNewQuestion] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderMajor, setSenderMajor] = useState("Teknik Informatika");
  const [formCategory, setFormCategory] = useState<"Fikih" | "Akademik & Karir" | "Hubungan & Keluarga" | "Motivasi Hijrah">("Fikih");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Semua",
    "Fikih",
    "Akademik & Karir",
    "Hubungan & Keluarga",
    "Motivasi Hijrah",
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesCat =
      selectedCategory === "Semua" || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    addQuestion({
      question: newQuestion,
      askedBy: isAnonymous ? "Mahasiswa PNJ (Anonim)" : senderName || "Mahasiswa PNJ",
      major: senderMajor,
      category: formCategory,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setNewQuestion("");
      setSenderName("");
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Layanan Konseling & Fatwa Kampus</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Kotak Tanya Ustadz & Konseling Syar'i
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Ruang aman bagi mahasiswa Politeknik Negeri Jakarta untuk bertanya seputar fikih perkuliahan, problem akademik, adab pergaulan, hingga curhat permasalahan hidup secara 100% anonim.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Question Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Ajukan Pertanyaan
                  </h3>
                  <p className="text-xs text-slate-500">Privasi & Identitas Terjaga</p>
                </div>
              </div>
              <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                Gratis
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white mx-auto flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Pertanyaan Berhasil Dikirim!
                </h4>
                <p className="text-xs text-slate-600">
                  Pertanyaan Anda telah masuk ke tim pembina/ustadz LDK FIKRI. Jawaban akan ditinjau dan dimuat di halaman ini setelah dijawab.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="tanya-category" className="text-xs font-semibold text-slate-600 block mb-1">
                    Kategori Pertanyaan
                  </label>
                  <select
                    id="tanya-category"
                    value={formCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormCategory(e.target.value as typeof formCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Fikih">Fikih (Sholat, Wudhu, Puasa, Muamalah Kampus)</option>
                    <option value="Akademik & Karir">Akademik & Karir (Stres Kuliah, Skripsi, Etika Dosen)</option>
                    <option value="Hubungan & Keluarga">Hubungan & Keluarga (Pergaulan, Taaruf, Orang Tua)</option>
                    <option value="Motivasi Hijrah">Motivasi Hijrah & Istiqomah</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="tanya-sender-name" className="text-xs font-semibold text-slate-600">
                      Identitas Pengirim
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      Kirim Sebagai Anonim
                    </label>
                  </div>
                  <input
                    id="tanya-sender-name"
                    type="text"
                    disabled={isAnonymous}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama / Inisial (opsional jika anonim)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label htmlFor="tanya-sender-major" className="text-xs font-semibold text-slate-600 block mb-1">
                    Jurusan Anda di PNJ
                  </label>
                  <select
                    id="tanya-sender-major"
                    value={senderMajor}
                    onChange={(e) => setSenderMajor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Teknik Informatika & Komputer">Teknik Informatika & Komputer</option>
                    <option value="Teknik Mesin">Teknik Mesin</option>
                    <option value="Teknik Elektro">Teknik Elektro</option>
                    <option value="Teknik Sipil">Teknik Sipil</option>
                    <option value="Akuntansi">Akuntansi</option>
                    <option value="Administrasi Niaga">Administrasi Niaga</option>
                    <option value="Teknik Grafika & Penerbitan">Teknik Grafika & Penerbitan</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tanya-content" className="text-xs font-semibold text-slate-600 block mb-1">
                    Isi Pertanyaan / Curhatan
                  </label>
                  <textarea
                    id="tanya-content"
                    rows={4}
                    required
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Tuliskan pertanyaan Anda dengan jelas dan santun..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pertanyaan
                </button>
              </form>
            )}
          </div>

          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-300/80 text-xs text-amber-900 space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Komitmen Kerahasiaan
            </p>
            <p className="leading-relaxed">
              Seluruh pertanyaan masuk ditinjau langsung oleh Ustadz Pembina dan tim Syiar/Kemuslimahan LDK FIKRI PNJ. Data pribadi yang sensitif tidak akan dipublikasikan ke umum.
            </p>
          </div>
        </div>

        {/* Right Column: Q&A Archive (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Search & Filter */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari arsip pertanyaan yang sudah dijawab..."
                aria-label="Cari arsip pertanyaan yang sudah dijawab"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Answered Questions */}
          <div className="space-y-4">
            {filteredQuestions.map((qa) => (
              <div
                key={qa.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {qa.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {formatDateIndo(qa.createdAt)}
                  </span>
                </div>

                {/* Question */}
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-semibold">
                    Ditanyakan oleh: <span className="text-slate-600">{qa.askedBy}</span> ({qa.major})
                  </p>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    &ldquo;{qa.question}&rdquo;
                  </h4>
                </div>

                {/* Answer */}
                {qa.answer ? (
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 space-y-2 text-xs text-slate-700 leading-relaxed">
                    <div className="flex items-center justify-between text-[11px] text-emerald-900 font-bold border-b border-slate-200/60 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                        Dijawab oleh: {qa.answeredBy}
                      </span>
                      <span className="text-slate-400 font-normal">
                        {qa.answeredAt && formatDateIndo(qa.answeredAt)}
                      </span>
                    </div>
                    <p className="pt-1 whitespace-pre-line">{qa.answer}</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic">
                    ⏳ Sedang dalam antrean peninjauan asatidz...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
