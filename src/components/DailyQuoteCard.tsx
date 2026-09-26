"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Share2, Quote } from "lucide-react";

export default function DailyQuoteCard() {
  const [copied, setCopied] = useState(false);

  const quote = {
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    translation:
      "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.",
    source: "HR. Ahmad, ath-Thabrani, ad-Daruquthni (Shahihul Jami' no. 3289)",
    reflection:
      "Jadikan setiap tugas kuliah, praktikum teknik, dan amanah organisasi di PNJ sebagai jalan memberi manfaat seluas-luasnya.",
  };

  const handleCopy = () => {
    const textToCopy = `"${quote.translation}"\n- ${quote.source}\n\nDipersembahkan oleh LDK FIKRI PNJ`;
    navigator.clipboard?.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback or ignore permission errors
      });
  };

  const handleShareWa = () => {
    const textToShare = encodeURIComponent(
      `"${quote.translation}"\n- ${quote.source}\n\nKunjungi web LDK FIKRI PNJ: https://ldkfikripnj.my.id`
    );
    window.open(`https://api.whatsapp.com/send?text=${textToShare}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-emerald-50/50 to-emerald-100/30 rounded-3xl p-6 sm:p-7 border border-amber-300/60 shadow-md relative overflow-hidden flex flex-col justify-between">
      {/* Top watermark quote */}
      <Quote className="absolute -top-3 -right-3 w-24 h-24 text-amber-500/10 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Hadits Harian Mahasiswa
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Renungan Hari Ini
          </span>
        </div>

        {/* Arabic Typography */}
        <p className="text-right font-arabic text-2xl sm:text-3xl text-emerald-950 font-semibold leading-relaxed py-2">
          {quote.arabic}
        </p>

        {/* Indonesian Translation */}
        <p className="text-slate-800 text-sm sm:text-base font-semibold italic mt-3 leading-relaxed">
          &ldquo;{quote.translation}&rdquo;
        </p>

        <p className="text-xs text-slate-500 font-medium mt-1">
          — {quote.source}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-white/80 border border-emerald-900/10 text-xs text-slate-600 leading-relaxed">
          <strong className="text-emerald-900">Tadabbur:</strong> {quote.reflection}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Salin Kutipan</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShareWa}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Bagikan ke WA</span>
        </button>
      </div>
    </div>
  );
}
