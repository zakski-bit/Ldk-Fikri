"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  Check, 
  Send
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { formatDateIndo } from "@/lib/utils";
import { EventItem } from "@/data/mockData";

export default function EventPage() {
  const { events, registerForEventWithDetails, submitOprecApplication } = useDataStore();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  
  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [nim, setNim] = useState("");
  const [major, setMajor] = useState("Teknik Informatika");
  const [waNumber, setWaNumber] = useState("");
  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState(false);

  // OPREC Form State
  const [oprecName, setOprecName] = useState("");
  const [oprecNim, setOprecNim] = useState("");
  const [oprecMajor, setOprecMajor] = useState("Teknik Informatika");
  const [oprecChoice1, setOprecChoice1] = useState("Syiar Kreatif");
  const [oprecReason, setOprecReason] = useState("");
  const [isOprecSuccess, setIsOprecSuccess] = useState(false);

  const handleRegisterEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    registerForEventWithDetails({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      fullName,
      nim,
      major,
      waNumber,
    });

    setIsRegisteredSuccess(true);
    setTimeout(() => {
      setIsRegisteredSuccess(false);
      setSelectedEvent(null);
      setFullName("");
      setNim("");
      setWaNumber("");
    }, 2500);
  };

  const handleOprecSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitOprecApplication({
      fullName: oprecName,
      nim: oprecNim,
      major: oprecMajor,
      departmentChoice: oprecChoice1,
      motivation: oprecReason,
    });

    setIsOprecSuccess(true);
    setTimeout(() => {
      setIsOprecSuccess(false);
      setOprecName("");
      setOprecNim("");
      setOprecReason("");
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Agenda & Pendaftaran</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Kajian, Pelatihan & Portal OPREC
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Daftar kegiatan pengembangan diri, seminar keislaman, mentoring keagamaan, serta rekrutmen terbuka pengurus LDK FIKRI PNJ.
        </p>
      </div>

      {/* 2. Daftar Event Aktif */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Agenda Kegiatan Terdekat
            </h2>
            <p className="text-xs text-slate-500">
              Pilih event dan daftarkan diri Anda sebelum kuota penuh.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            {events.length} Kegiatan Tersedia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => {
            const isFull = evt.registeredCount >= evt.quota;
            const quotaPercent = Math.round((evt.registeredCount / evt.quota) * 100);

            return (
              <div
                key={evt.id}
                id={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={evt.posterUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-950/90 text-white backdrop-blur-md">
                      {evt.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        isFull
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {isFull ? "Kuota Penuh" : "Pendaftaran Dibuka"}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Narasumber: <strong className="text-slate-800">{evt.speaker}</strong> ({evt.speakerTitle})
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{formatDateIndo(evt.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                    </div>

                    {/* Quota bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                        <span>Kuota Terisi</span>
                        <span>{evt.registeredCount} / {evt.quota} Peserta</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFull ? "bg-rose-500" : "bg-emerald-600"
                          }`}
                          style={{ width: `${quotaPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    disabled={isFull}
                    onClick={() => setSelectedEvent(evt)}
                    className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {isFull ? "Kuota Telah Habis" : "Daftar Acara Ini"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Event Registration Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 id="event-modal-title" className="font-extrabold text-slate-900 text-base">Form Pendaftaran</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{selectedEvent.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {isRegisteredSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h5 className="font-extrabold text-slate-900 text-base">Pendaftaran Berhasil!</h5>
                <p className="text-xs text-slate-600">
                  Data Anda telah terdaftar. Kami akan mengirimkan tautan grup WhatsApp peserta ke nomor yang Anda cantumkan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterEvent} className="space-y-4 pt-4">
                <div>
                  <label htmlFor="event-reg-name" className="text-xs font-semibold text-slate-600 block mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    id="event-reg-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Nama Lengkap Sesuai KTM"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="event-reg-nim" className="text-xs font-semibold text-slate-600 block mb-1">
                      NIM (Nomor Induk Mahasiswa)
                    </label>
                    <input
                      id="event-reg-nim"
                      type="text"
                      required
                      value={nim}
                      onChange={(e) => setNim(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="Contoh: 2207421034"
                    />
                  </div>
                  <div>
                    <label htmlFor="event-reg-major" className="text-xs font-semibold text-slate-600 block mb-1">
                      Jurusan di PNJ
                    </label>
                    <select
                      id="event-reg-major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                </div>

                <div>
                  <label htmlFor="event-reg-wa" className="text-xs font-semibold text-slate-600 block mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    id="event-reg-wa"
                    type="tel"
                    required
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="0812xxxxxxxx"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Konfirmasi Pendaftaran
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. SECTION OPREC PENGURUS & MENTORING */}
      <div id="oprec" className="rounded-3xl bg-emerald-950 text-white p-8 sm:p-12 border border-emerald-900 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Recruitment 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Gabung Menjadi Keluarga Besar <br />
            <span className="text-amber-400">Pengurus LDK FIKRI PNJ</span>
          </h2>

          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            Menempa kepemimpinan islami, melatih profesionalitas organisasi, memperluas relasi lintas jurusan di PNJ, dan berinvestasi pahala dakwah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Persyaratan Oprec (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-white text-base">
              Persyaratan & Kriteria:
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Mahasiswa aktif Politeknik Negeri Jakarta (Tingkat 1, 2, atau 3).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Memiliki komitmen belajar, amanah, dan berakhlakul karimah.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Bersedia mengikuti alur pembinaan dan upgrading skill organisasi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Siap mendedikasikan waktu seimbang antara kuliah vokasi dan dakwah.</span>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 text-xs text-emerald-300 space-y-1 mt-6">
              <p className="font-bold text-amber-300">📅 Timeline OPREC:</p>
              <p>• Pendaftaran Online: 20 September - 10 Oktober</p>
              <p>• Wawancara Ukhuwah: 12 - 15 Oktober</p>
              <p>• Pengumuman & Welcoming: 18 Oktober</p>
            </div>
          </div>

          {/* Form OPREC (7 cols) */}
          <div className="lg:col-span-7 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Formulir Pendaftaran Calon Pengurus
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Isi data Anda dengan jujur dan lengkap.
            </p>

            {isOprecSuccess ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-14 h-14 rounded-full bg-emerald-700 text-white mx-auto flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  Pendaftaran OPREC Berhasil Terkirim!
                </h4>
                <p className="text-xs text-slate-600">
                  Terima kasih atas antusiasme Anda untuk berjuang bersama di LDK FIKRI PNJ. Tim Kaderisasi akan menghubungi Anda via WhatsApp untuk jadwal wawancara.
                </p>
              </div>
            ) : (
              <form onSubmit={handleOprecSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="oprec-full-name" className="text-xs font-semibold text-slate-600 block mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    id="oprec-full-name"
                    type="text"
                    required
                    value={oprecName}
                    onChange={(e) => setOprecName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="Nama Lengkap Sesuai KTM"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="oprec-nim" className="text-xs font-semibold text-slate-600 block mb-1">
                      NIM
                    </label>
                    <input
                      id="oprec-nim"
                      type="text"
                      required
                      value={oprecNim}
                      onChange={(e) => setOprecNim(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      placeholder="Nomor Induk Mahasiswa"
                    />
                  </div>
                  <div>
                    <label htmlFor="oprec-major" className="text-xs font-semibold text-slate-600 block mb-1">
                      Jurusan di PNJ
                    </label>
                    <select
                      id="oprec-major"
                      value={oprecMajor}
                      onChange={(e) => setOprecMajor(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
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
                </div>

                <div>
                  <label htmlFor="oprec-dept" className="text-xs font-semibold text-slate-600 block mb-1">
                    Pilihan Departemen yang Diminati
                  </label>
                  <select
                    id="oprec-dept"
                    value={oprecChoice1}
                    onChange={(e) => setOprecChoice1(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <optgroup label="5 Departemen">
                      <option value="Departemen Syiar & Keumatan">Departemen Syiar & Keumatan</option>
                      <option value="Departemen Kominfo">Departemen Kominfo (Media, Desain, IT)</option>
                      <option value="Departemen Muslimpreneur">Departemen Muslimpreneur (Kewirausahaan)</option>
                      <option value="Departemen ILC (Islamic Learning Center)">Departemen ILC (Islamic Learning Center)</option>
                      <option value="Departemen Kemuslimahan">Departemen Kemuslimahan (Khusus Akhwat)</option>
                    </optgroup>
                    <optgroup label="4 Biro">
                      <option value="Biro Sekum">Biro Sekum (Kesekretariatan & Arsip)</option>
                      <option value="Biro Bendum">Biro Bendum (Kebendaharaan & Keuangan)</option>
                      <option value="Biro Mentoring">Biro Mentoring (Pembinaan PAMI)</option>
                      <option value="Biro PSDM">Biro PSDM (Pengembangan SDM & Kader)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label htmlFor="oprec-reason" className="text-xs font-semibold text-slate-600 block mb-1">
                    Motivasi & Harapan Bergabung
                  </label>
                  <textarea
                    id="oprec-reason"
                    rows={3}
                    required
                    value={oprecReason}
                    onChange={(e) => setOprecReason(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="Ceritakan alasan Anda ingin bergabung dan apa yang ingin Anda kontribusikan..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Berkas Pendaftaran OPREC
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
