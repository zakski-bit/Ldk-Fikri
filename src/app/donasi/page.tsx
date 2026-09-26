"use client";

import { useState } from "react";
import { 
  Landmark, 
  TrendingUp, 
  Users, 
  Copy, 
  Check, 
  Building, 
  QrCode,
  Eye,
  Download
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { formatRupiah, formatDateIndo } from "@/lib/utils";

export default function DonasiPage() {
  const { campaign, addDonation } = useDataStore();
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showZoomQris, setShowZoomQris] = useState(false);
  
  // Form State
  const [donorName, setDonorName] = useState("");
  const [donorAmount, setDonorAmount] = useState("100000");
  const [donorMessage, setDonorMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedBank, setSelectedBank] = useState("BSI");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const percentage = Math.min(
    100,
    Math.round((campaign.collectedAmount / campaign.targetAmount) * 100)
  );

  const handleCopy = (acc: string, bank: string) => {
    navigator.clipboard?.writeText(acc.replace(/-/g, ""))
      .then(() => {
        setCopiedBank(bank);
        setTimeout(() => setCopiedBank(null), 2000);
      })
      .catch(() => {});
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(donorAmount, 10);
    if (!amountNum || amountNum <= 0) return;

    addDonation({
      name: isAnonymous ? "Hamba Allah" : donorName || "Hamba Allah",
      amount: amountNum,
      bank: selectedBank,
      message: donorMessage,
      isAnonymous,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDonorName("");
      setDonorMessage("");
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Landmark className="w-4 h-4" />
            <span>Proyek Fisik Masjid Kampus PNJ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Wakaf & Donasi Pembangunan <br />
            <span className="text-amber-400">Masjid Daarul Ilmi PNJ</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed">
            Pembangunan dan revitalisasi total Masjid Daarul Ilmi (Daim) Politeknik Negeri Jakarta berkapasitas 3.500 jamaah dengan konsep Green Campus Mosque. Seluruh dana disalurkan 100% murni untuk pengadaan material semen, besi beton bertulang, atap kubah, fasilitas sanitasi, dan bangunan ibadah.
          </p>
        </div>
      </div>

      {/* Progress & Milestone Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Progress & Milestones (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Progress Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900">
                Status Penggalangan Dana Pembangunan Fisik
              </h2>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Diperbarui Real-time
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Dana Fisik Terkumpul</span>
                  <p className="text-3xl font-extrabold text-emerald-900">
                    {formatRupiah(campaign.collectedAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium">Target Pembangunan Gedung</span>
                  <p className="text-lg font-bold text-slate-700">
                    {formatRupiah(campaign.targetAmount)}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1">
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <TrendingUp className="w-4 h-4" /> {percentage}% Progres Terpenuhi
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-slate-400" /> {campaign.donorCount} Pewakaf & Donatur
                </span>
              </div>
            </div>

            {/* Tahapan Program (Milestones) */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Tahapan Konstruksi & Pembangunan Fisik Masjid:
              </h3>
              <div className="space-y-3">
                {campaign.milestones.map((ms, idx) => (
                  <div
                    key={ms.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      ms.status === "completed"
                        ? "bg-emerald-50/50 border-emerald-200 text-slate-800"
                        : ms.status === "in_progress"
                        ? "bg-amber-50/60 border-amber-300 text-slate-900 ring-2 ring-amber-400/30"
                        : "bg-slate-50 border-slate-200 text-slate-500 opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          ms.status === "completed"
                            ? "bg-emerald-700 text-white"
                            : ms.status === "in_progress"
                            ? "bg-amber-500 text-white"
                            : "bg-slate-300 text-slate-700"
                        }`}>
                          {idx + 1}
                        </span>
                        <h4 className="font-extrabold text-sm">{ms.title}</h4>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        ms.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : ms.status === "in_progress"
                          ? "bg-amber-100 text-amber-900 animate-pulse"
                          : "bg-slate-200 text-slate-600"
                      }`}>
                        {ms.status === "completed"
                          ? "Selesai (100%)"
                          : ms.status === "in_progress"
                          ? "Sedang Dikerjakan"
                          : "Tahap Berikutnya"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-8 mt-1 leading-relaxed">
                      {ms.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transparansi Donatur Terbaru */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                Donatur & Doa Terbaru
              </h3>
              <span className="text-xs text-slate-500">Transparansi Publik</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
              {campaign.recentDonors.map((donor) => (
                <div key={donor.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {donor.isAnonymous ? "Hamba Allah" : donor.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {formatDateIndo(donor.date)}
                      </span>
                    </div>
                    {donor.message && (
                      <p className="text-xs text-slate-600 italic mt-0.5">
                        &ldquo;{donor.message}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="font-extrabold text-sm text-emerald-800 shrink-0">
                    {formatRupiah(donor.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Donation Form & Bank Transfer & QRIS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official QRIS Dummy Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <QrCode className="w-4 h-4 text-emerald-700" />
                  <span>QRIS Pembangunan Masjid Daarul Ilmi</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Scan cepat wakaf via e-wallet & m-banking</p>
              </div>
              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                Contoh Dummy
              </span>
            </div>

            {/* QRIS SVG Image Frame */}
            <div className="relative group p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner max-w-[260px] mx-auto">
              <img
                src="/images/qris-darul-ilmi.svg"
                alt="QRIS Wakaf Pembangunan Masjid Daarul Ilmi PNJ"
                className="w-full h-auto rounded-xl shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowZoomQris(true)}
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px]"
              >
                <Eye className="w-4 h-4" />
                Klik untuk Memperbesar
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowZoomQris(true)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Perbesar QRIS
              </button>
              <a
                href="/images/qris-darul-ilmi.svg"
                download="QRIS-Pembangunan-Masjid-Daarul-Ilmi-PNJ.svg"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh Gambar
              </a>
            </div>

            {/* Supported payment badges */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 text-center">
              Mendukung: <span className="font-semibold text-slate-700">GoPay, OVO, Dana, ShopeePay, BSI Mobile, Mandiri, BCA, LinkAja</span>
            </div>

            <p className="text-[10px] text-amber-800/90 italic text-left bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60">
              * Ini adalah dummy template QRIS resmi. Barcode riil akan otomatis terhubung dengan rekening panitia pembangunan Masjid Daarul Ilmi PNJ.
            </p>
          </div>

          {/* Bank Accounts Info Box */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-900 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-amber-300">
              <Building className="w-5 h-5" />
              <h3 className="font-extrabold text-base text-white">
                Rekening Resmi Panitia Pembangunan Masjid
              </h3>
            </div>

            <p className="text-xs text-emerald-300 leading-relaxed">
              Wakaf dan donasi pembangunan fisik dapat disalurkan langsung melalui rekening panitia pembangunan Masjid Daarul Ilmi PNJ di bawah ini:
            </p>

            <div className="space-y-3">
              {campaign.bankAccounts.map((acc) => (
                <div
                  key={acc.bank}
                  className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800/80 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-amber-300 block">
                      {acc.bank}
                    </span>
                    <span className="text-base font-extrabold tracking-wider text-white">
                      {acc.accountNumber}
                    </span>
                    <span className="text-[10px] text-emerald-300/80 block">
                      {acc.accountName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                    className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shrink-0"
                    title="Salin Nomor Rekening"
                    aria-label={`Salin nomor rekening ${acc.bank}`}
                  >
                    {copiedBank === acc.bank ? (
                      <Check className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* QRIS Info tag */}
            <div className="pt-2 border-t border-emerald-900 flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-amber-400" />
                Transfer Antar Bank & QRIS
              </span>
              <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-amber-300 font-bold">
                Bebas Admin
              </span>
            </div>
          </div>

          {/* Form Konfirmasi Infaq */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Konfirmasi Wakaf Pembangunan
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Isi form berikut agar panitia dapat mencatat dan memverifikasi amanah wakaf pembangunan Anda.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white mx-auto flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  Alhamdulillah, Wakaf Pembangunan Berhasil Dikonfirmasi!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jazakumullah Khairan Katsiran. Data Anda telah tercatat dalam pembukuan panitia pembangunan Masjid Daarul Ilmi PNJ dan progres target fisik telah diperbarui.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  <label htmlFor="donasi-custom-amount" className="text-xs font-semibold text-slate-600 block mb-1">
                    Nominal Lain (Rp)
                  </label>
                  <input
                    id="donasi-custom-amount"
                    type="number"
                    value={donorAmount}
                    onChange={(e) => setDonorAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Contoh: 150000"
                    min="10000"
                    required
                  />
                </div>

                {/* Name */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="donasi-donor-name" className="text-xs font-semibold text-slate-600">
                      Nama Donatur / Alumni
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
                    id="donasi-donor-name"
                    type="text"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-slate-100"
                    placeholder="Nama Lengkap / Jurusan & Angkatan"
                  />
                </div>

                {/* Target Bank Transfer */}
                <div>
                  <label htmlFor="donasi-bank-select" className="text-xs font-semibold text-slate-600 block mb-1">
                    Transfer Ke Bank
                  </label>
                  <select
                    id="donasi-bank-select"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="BSI">BSI (Bank Syariah Indonesia) - 7123456789</option>
                    <option value="Mandiri">Bank Mandiri - 1570009876543</option>
                    <option value="QRIS">QRIS / E-Wallet</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="donasi-message" className="text-xs font-semibold text-slate-600 block mb-1">
                    Doa & Pesan Kebaikan (Opsional)
                  </label>
                  <textarea
                    id="donasi-message"
                    rows={2}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Bismillah wakaf semen dan besi untuk pembangunan fisik Masjid Daarul Ilmi 3.500 jamaah..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Kirim Konfirmasi Wakaf Pembangunan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Zoom QRIS Modal */}
      {showZoomQris && (
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
                onClick={() => setShowZoomQris(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-xl font-bold rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 inline-block shadow-inner mx-auto max-w-[280px]">
              <img
                src="/images/qris-darul-ilmi.svg"
                alt="QRIS Wakaf Pembangunan Masjid Daarul Ilmi PNJ"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-left">
              <p className="text-[11px] text-amber-950 font-medium leading-relaxed">
                <span className="font-bold text-amber-900">📌 Info Dummy:</span> Ini merupakan contoh visual QRIS resmi panitia pembangunan. Seluruh wakaf yang dikonfirmasi di formulir tetap dicatat langsung ke pembukuan dan status target fisik masjid.
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="/images/qris-darul-ilmi.svg"
                download="QRIS-Pembangunan-Masjid-Daarul-Ilmi-PNJ.svg"
                className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh QRIS
              </a>
              <button
                type="button"
                onClick={() => setShowZoomQris(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
