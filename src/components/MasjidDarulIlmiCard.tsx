"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Landmark, 
  TrendingUp, 
  Users, 
  Copy, 
  Check, 
  ArrowRight, 
  HeartHandshake,
  Building,
  QrCode,
  Eye
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useDataStore } from "@/lib/store";

export default function MasjidDarulIlmiCard() {
  const { campaign, addDonation } = useDataStore();
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorAmount, setDonorAmount] = useState("50000");
  const [donorMessage, setDonorMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const percentage = campaign.targetAmount > 0
    ? Math.min(100, Math.round((campaign.collectedAmount / campaign.targetAmount) * 100))
    : 0;

  const handleCopy = (acc: string, bank: string) => {
    navigator.clipboard?.writeText(acc.replace(/-/g, ""))
      .then(() => {
        setCopiedBank(bank);
        setTimeout(() => setCopiedBank(null), 2000);
      })
      .catch(() => {});
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(donorAmount, 10);
    if (!amountNum || amountNum <= 0) return;

    addDonation({
      name: isAnonymous ? "Hamba Allah" : donorName || "Hamba Allah",
      amount: amountNum,
      bank: "BSI (Bank Syariah Indonesia)",
      message: donorMessage,
      isAnonymous,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowDonateModal(false);
      setDonorName("");
      setDonorMessage("");
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Badge & Title */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-900 text-xs font-bold">
            <Landmark className="w-3.5 h-3.5 text-emerald-700" />
            Pembangunan Fisik Masjid PNJ
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
            Masjid Daarul Ilmi (Daim)
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          Wakaf & Donasi Pembangunan <br className="hidden sm:inline" />
          <span className="text-emerald-800">Masjid Daarul Ilmi PNJ</span>
        </h3>

        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
          Mendukung percepatan pembangunan fisik Masjid Daarul Ilmi (Daim) berkapasitas 3.500 jamaah dengan konsep Green Campus Mosque. Seluruh dana disalurkan 100% murni untuk konstruksi beton, rangka atap, fasilitas wudhu, dan gedung ibadah di Politeknik Negeri Jakarta.
        </p>

        {/* Progress Bar Section */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FAF9F6] border border-slate-200/80">
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Dana Pembangunan Terkumpul</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-900">
                {formatRupiah(campaign.collectedAmount)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">Target Pembangunan Fisik</span>
              <span className="text-sm sm:text-base font-bold text-slate-700">
                {formatRupiah(campaign.targetAmount)}
              </span>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-amber-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 font-medium">
            <span className="flex items-center gap-1 text-emerald-800 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              {percentage}% Progres Terpenuhi
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {campaign.donorCount} Pewakaf & Donatur
            </span>
          </div>
        </div>

        {/* Alokasi Program Nyata */}
        <div className="mt-5 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Fokus Konstruksi Pembangunan Fisik:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Pondasi & Struktur Beton</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center gap-2 font-bold animate-pulse">
              <Building className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Green Building & Atap</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>Tempat Wudhu & Sanitasi</span>
            </div>
          </div>
        </div>

        {/* Bank Account Quick Copy */}
        <div className="mt-5 p-4 rounded-2xl bg-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300 font-semibold">Rekening Wakaf Pembangunan BSI</p>
              <p className="text-base font-extrabold tracking-wider text-white">
                712-345-6789
              </p>
              <p className="text-[11px] text-emerald-300/80">a.n. Panitia Pembangunan Masjid Daarul Ilmi PNJ</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleCopy("7123456789", "BSI")}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-bold text-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedBank === "BSI" ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300" />
                Tersalin!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Salin No. Rekening
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <button
          type="button"
          onClick={() => setShowDonateModal(true)}
          className="flex-1 py-3 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <HeartHandshake className="w-4 h-4 text-amber-300" />
          Wakaf Pembangunan Sekarang
        </button>
        <button
          type="button"
          onClick={() => setShowQrisModal(true)}
          className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
        >
          <QrCode className="w-4 h-4 text-amber-700" />
          <span>Lihat QRIS Pembangunan</span>
        </button>
        <Link
          href="/donasi"
          className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
        >
          <span>Detail Progres Fisik</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* QRIS Dummy Modal */}
      {showQrisModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="text-left">
                <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-700" />
                  QRIS Pembangunan Masjid Daarul Ilmi
                </h4>
                <p className="text-[11px] text-slate-500">Scan via GoPay, OVO, Dana, BSI, Mandiri</p>
              </div>
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-xl font-bold rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {/* QRIS Graphic Container */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 inline-block shadow-inner mx-auto max-w-[260px]">
              <img
                src="/images/qris-darul-ilmi.svg"
                alt="QRIS Wakaf Pembangunan Masjid Daarul Ilmi PNJ"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Info notice */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-left">
              <p className="text-[11px] text-amber-950 font-medium leading-relaxed">
                <span className="font-bold text-amber-900">📌 Catatan:</span> Ini adalah contoh dummy barcode QRIS pembangunan. Nantinya barcode ini akan otomatis terhubung dengan rekening panitia pembangunan Masjid Daarul Ilmi PNJ.
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="/images/qris-darul-ilmi.svg"
                download="QRIS-Pembangunan-Masjid-Daarul-Ilmi-PNJ.svg"
                className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Unduh Gambar QRIS
              </a>
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Donation Modal */}
      {showDonateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 id="card-modal-title" className="font-extrabold text-slate-900 text-base">
                    Wakaf Pembangunan Masjid Daarul Ilmi
                  </h4>
                  <p className="text-xs text-slate-500">Konfirmasi Wakaf Material & Dana Fisik</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDonateModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-xl font-bold"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {isSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h5 className="font-extrabold text-slate-900 text-lg">Jazakumullah Khairan!</h5>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Wakaf pembangunan Anda telah dicatat ke dalam sistem panitia Masjid Daarul Ilmi PNJ. Semoga menjadi saksi amal jariyah di akhirat.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitDonation} className="space-y-4 pt-4">
                {/* Nominal Buttons */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Pilih Nominal Wakaf Pembangunan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["50000", "100000", "250000", "500000", "1000000", "2500000"].map(
                      (nom) => (
                        <button
                          key={nom}
                          type="button"
                          onClick={() => setDonorAmount(nom)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            donorAmount === nom
                              ? "bg-emerald-800 text-white border-emerald-800"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {formatRupiah(parseInt(nom, 10))}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label htmlFor="card-custom-amount" className="text-xs font-semibold text-slate-600 block mb-1">
                    Atau Masukkan Nominal Lain (Rp)
                  </label>
                  <input
                    id="card-custom-amount"
                    type="number"
                    value={donorAmount}
                    onChange={(e) => setDonorAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Contoh: 50000"
                    min="10000"
                    required
                  />
                </div>

                {/* Name */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="card-donor-name" className="text-xs font-semibold text-slate-600">
                      Nama Donatur
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      Hamba Allah (Anonim)
                    </label>
                  </div>
                  <input
                    id="card-donor-name"
                    type="text"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-slate-100 disabled:text-slate-400"
                    placeholder="Nama lengkap / Angkatan jurusan"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="card-donor-message" className="text-xs font-semibold text-slate-600 block mb-1">
                    Doa / Pesan untuk Kampus & Jamaah (Opsional)
                  </label>
                  <textarea
                    id="card-donor-message"
                    rows={2}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Semoga lekas selesai pembangunan masjid kebanggaan PNJ..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Konfirmasi Wakaf Pembangunan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
