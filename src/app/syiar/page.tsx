"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, 
  Search, 
  Clock, 
  Share2, 
  Check,
  Copy
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { formatDateIndo } from "@/lib/utils";
import { Article } from "@/data/mockData";

export default function SyiarPage() {
  const { articles } = useDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  // Support deep linking by hash (e.g. /syiar#menjaga-integritas-akademik)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const slug = window.location.hash.replace("#", "");
      const target = articles.find((a) => a.slug === slug);
      if (target) {
        setActiveArticle(target);
      }
    }
  }, [articles]);

  const categories = [
    "Semua",
    "Fikih Kampus",
    "Opini Mahasiswa",
    "Renungan",
    "Kemuslimahan",
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === "Semua" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (art: Article) => {
    const shareText = encodeURIComponent(
      `*${art.title}*\n\n${art.excerpt}\n\nBaca selengkapnya di web LDK FIKRI PNJ: https://ldkfikripnj.my.id/syiar#${art.slug}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyText = (art: Article) => {
    navigator.clipboard?.writeText(`${art.title}\n\n${art.content}\n\nSumber: LDK FIKRI PNJ`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Literasi & Syiar Dakwah</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Katalog Artikel & Fikih Mahasiswa
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Kumpulan tulisan ilmiah populer, adab perkuliahan, fatwa fikih kontemporer, dan inspirasi peradaban Islam di kampus vokasi.
        </p>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari artikel, topik, atau kata kunci..."
            aria-label="Cari artikel, topik, atau kata kunci"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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

      {/* 3. Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-slate-700 text-lg">Tidak ada artikel ditemukan</h3>
          <p className="text-xs text-slate-500">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              id={art.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group scroll-mt-28"
            >
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

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span>{formatDateIndo(art.publishedAt)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
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

                    <button
                      type="button"
                      onClick={() => setActiveArticle(art)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-800 hover:text-white text-emerald-900 text-xs font-bold transition-all"
                    >
                      Baca Artikel
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {art.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 4. Article Reader Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Tutup"
            >
              ✕
            </button>

            <div className="space-y-4">
              <span className="inline-block text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                {activeArticle.category}
              </span>

              <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-800">{activeArticle.author.name}</p>
                  <p>{formatDateIndo(activeArticle.publishedAt)} • {activeArticle.readTime}</p>
                </div>
              </div>

              {/* Cover Image in modal */}
              <div className="rounded-2xl overflow-hidden max-h-72 w-full">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="prose prose-emerald max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line pt-2">
                {activeArticle.content}
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyText(activeArticle)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin!" : "Salin Isi Artikel"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Bagikan ke WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
