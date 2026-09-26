"use client";

import { useState } from "react";
import { 
  ShoppingBag, 
  MessageCircle
} from "lucide-react";
import { useDataStore } from "@/lib/store";
import { formatRupiah } from "@/lib/utils";
import type { MerchandiseItem } from "@/data/mockData";

export default function DanusPage() {
  const { merchandise } = useDataStore();
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Pakaian", "Aksesoris", "Buku & Kitab"];

  const filteredItems =
    selectedCategory === "Semua"
      ? merchandise
      : merchandise.filter((m) => m.category === selectedCategory);

  const handleOrderWhatsApp = (item: MerchandiseItem) => {
    const text = encodeURIComponent(
      `Halo Admin Danus LDK FIKRI PNJ! Saya tertarik dan ingin memesan:
- *Produk:* ${item.name}
- *Harga:* ${formatRupiah(item.price)}
- *Kategori:* ${item.category}

Mohon informasi ketersediaan ukuran dan metode pembayarannya. Terima kasih!`
    );
    window.open(`https://api.whatsapp.com/send?phone=6281234567890&text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Departemen Muslimpreneur</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Katalog Merchandise & Atribut FIKRI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Dukung kemandirian finansial mahasiswa dan dakwah kampus Politeknik Negeri Jakarta. Seluruh keuntungan penjualan didedikasikan untuk pengembangan muslimpreneur dan mendukung wakaf pembangunan Masjid Daarul Ilmi PNJ.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-emerald-800 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Merchandise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-950/90 text-white backdrop-blur-md">
                  {item.category}
                </span>
                {item.preOrder && (
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                    Pre-Order
                  </span>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2">
                  <span className="text-xl font-extrabold text-emerald-900">
                    {formatRupiah(item.price)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => handleOrderWhatsApp(item)}
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 group-hover:bg-emerald-950"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                Pesan via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border border-amber-300/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-amber-950 text-base">
            Ingin Berkolaborasi atau Beli Grosir untuk Angkatan?
          </h4>
          <p className="text-xs text-amber-900/80">
            Departemen Danus menerima pesanan seragam angkatan, seminar kit, dan merchandise custom untuk himpunan/komunitas di PNJ.
          </p>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=6281234567890&text=Halo%20Admin%20Danus%20FIKRI,%20saya%20ingin%20tanya%20pemesanan%20merchandise%20custom"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs whitespace-nowrap transition-all shadow-sm"
        >
          Hubungi PIC Danus
        </a>
      </div>
    </div>
  );
}
