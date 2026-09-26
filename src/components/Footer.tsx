"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Instagram, 
  Youtube, 
  Heart, 
  ExternalLink,
  Landmark
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan footer publik di dashboard admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900/40 mt-20">
      {/* Top Banner - Call for Masjid Darul Ilmi */}
      <div className="border-b border-emerald-900/60 bg-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2.5 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-base sm:text-lg">
                Wakaf & Donasi Pembangunan Masjid Daarul Ilmi PNJ
              </p>
              <p className="text-emerald-300 text-xs sm:text-sm">
                Dukung percepatan pembangunan fisik Masjid Daarul Ilmi (Daim) berkapasitas 3.500 jamaah dengan konsep green building di kampus Politeknik Negeri Jakarta.
              </p>
            </div>
          </div>
          <Link
            href="/donasi"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Salurkan Wakaf Pembangunan →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-amber-400 font-extrabold text-xl shadow">
                F
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg tracking-tight">
                  UKM LDK FIKRI PNJ
                </h3>
                <p className="text-emerald-400 text-xs font-medium">
                  Forum Silaturahim Kajian Remaja Islam
                </p>
              </div>
            </div>

            <p className="text-emerald-200/80 text-sm leading-relaxed pr-4">
              Lembaga Dakwah Kampus resmi di bawah naungan Politeknik Negeri Jakarta. 
              Berkomitmen menjadi wadah pembinaan karakter, intelektual, dan spiritualitas 
              mahasiswa vokasi yang berakhlak mulia dan profesional.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-emerald-300/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Sekretariat LDK FIKRI, Gedung Pusat Kegiatan Mahasiswa (PKM) Lt. 1 & 
                  Masjid Darul Ilmi PNJ, Kampus Baru UI Depok 16425
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ldkfikri@pnj.ac.id / fikripnj.official@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Eksplorasi
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-amber-300 transition-colors">
                  Profil & Struktur Pengurus
                </Link>
              </li>
              <li>
                <Link href="/syiar" className="hover:text-amber-300 transition-colors">
                  Katalog Artikel & Fikih
                </Link>
              </li>
              <li>
                <Link href="/event" className="hover:text-amber-300 transition-colors">
                  Agenda Kajian & OPREC
                </Link>
              </li>
              <li>
                <Link href="/tanya-ustadz" className="hover:text-amber-300 transition-colors">
                  Kotak Tanya Ustadz (Anonim)
                </Link>
              </li>
              <li>
                <Link href="/danus" className="hover:text-amber-300 transition-colors">
                  Merchandise & Danus
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Khusus Dakwah Kampus */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Layanan Kampus
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <Link href="/donasi" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>Wakaf Pembangunan Masjid Daarul Ilmi</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                    Penting
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/event" className="hover:text-amber-300 transition-colors">
                  Mentoring Agama Islam (PAMI)
                </Link>
              </li>
              <li>
                <Link href="/profil#departemen" className="hover:text-amber-300 transition-colors">
                  Divisi Kemuslimahan FIKRI
                </Link>
              </li>
              <li>
                <Link href="/tanya-ustadz" className="hover:text-amber-300 transition-colors">
                  Bimbingan Baca Qur'an / Tahsin
                </Link>
              </li>
              <li>
                <a 
                  href="https://pnj.ac.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                >
                  Website Resmi PNJ
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Media Sosial & Pengurus */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Ikuti Syiar Kami
            </h4>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Dapatkan update konten reels kajian, poster acara, dan reminder sholat di media sosial kami:
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/ldkfikripnj"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 flex items-center justify-center text-amber-300 hover:text-white transition-colors"
                aria-label="Instagram LDK FIKRI PNJ"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@fikripnj"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 flex items-center justify-center text-amber-300 hover:text-white transition-colors"
                aria-label="YouTube LDK FIKRI PNJ"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-4">
              <Link
                href="/admin"
                className="text-xs text-emerald-400/70 hover:text-emerald-200 underline decoration-dotted"
              >
                Login Pengurus LDK FIKRI
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-900/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p>© {new Date().getFullYear()} UKM LDK FIKRI Politeknik Negeri Jakarta. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> untuk Kemaslahatan Ummat & Kampus PNJ
          </p>
        </div>
      </div>
    </footer>
  );
}
