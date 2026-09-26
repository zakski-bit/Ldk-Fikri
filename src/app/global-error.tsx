"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-slate-800 p-4 font-sans antialiased">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Terjadi Kesalahan Sistem
            </h2>
            <p className="text-xs text-slate-600">
              Aplikasi mengalami kendala tak terduga. Silakan tekan tombol di bawah untuk memuat ulang.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}
