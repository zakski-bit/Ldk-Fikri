"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  HeartHandshake, 
  ShieldCheck,
  ChevronRight,
  Landmark
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { 
      name: "Pembangunan Masjid", 
      href: "/donasi", 
      highlight: true,
      icon: Landmark
    },
    { name: "Syiar & Artikel", href: "/syiar" },
    { name: "Event & OPREC", href: "/event" },
    { name: "Tanya Ustadz", href: "/tanya-ustadz" },
    { name: "Danus", href: "/danus" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Jangan tampilkan menubar publik di dashboard admin agar pengurus tidak keluar secara tidak sengaja
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-lg border-b border-emerald-900/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-400 font-bold shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="text-lg font-extrabold">F</span>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-emerald-950">
                  LDK FIKRI
                </span>
                <span className="text-[10px] px-1.5 py-0.5 font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">
                  PNJ
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight whitespace-nowrap">
                Politeknik Negeri Jakarta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? "text-emerald-900 bg-emerald-50 font-semibold"
                      : link.highlight
                      ? "text-emerald-800 hover:bg-emerald-50/80 font-bold"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5 text-emerald-600" />}
                  {link.name}
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action / Admin Button */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-900 bg-white hover:bg-emerald-50 border border-slate-200 rounded-lg transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Pengurus
            </Link>
            <Link
              href="/donasi"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              Wakaf Masjid
            </Link>
          </div>

          {/* Mobile & Tablet Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <Link
              href="/donasi"
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
            >
              Wakaf Masjid
            </Link>
            <Link
              href="/admin"
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-900 bg-white border border-slate-200 rounded-lg transition-colors"
            >
              Pengurus
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
              aria-label="Toggle Navigation"
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {isOpen && (
        <div id="mobile-drawer" className="xl:hidden border-b border-emerald-900/10 bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-1 shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-950 font-semibold"
                    : link.highlight
                    ? "bg-emerald-50/50 text-emerald-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {link.icon && <link.icon className="w-4 h-4 text-emerald-600" />}
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-2">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Portal Pengurus
            </Link>
            <Link
              href="/donasi"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-emerald-800 rounded-xl"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              Wakaf Pembangunan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
