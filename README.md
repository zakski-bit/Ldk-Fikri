# LDK FIKRI PNJ - Portal Resmi & Syiar Kampus

Prototype Website Lembaga Dakwah Kampus (LDK) FIKRI Politeknik Negeri Jakarta. Platform informasi kegiatan dakwah kampus, materi syiar keislaman, mentoring keagamaan, dan program wakaf pembangunan fisik Masjid Daarul Ilmi PNJ.

🌐 **Live Website:** [https://ldk-fikri-pnj.vercel.app](https://ldk-fikri-pnj.vercel.app)

---

## 🕌 Fitur Utama

- **Pusat Informasi & Syiar Kampus:** Jadwal sholat otomatis, hadits harian, dan artikel keislaman kontekstual seputar dunia perkuliahan dan adab akademik.
- **Wakaf & Pembangunan Masjid Daarul Ilmi PNJ:** Transparansi dana, progres tahapan fisik pembangunan, kalkulator wakaf, rekening resmi BSI, serta integrasi QRIS.
- **Agenda & OPREC:** Informasi kajian akbar, pelatihan kepemimpinan, pendaftaran Mentoring Agama Islam (PAMI), dan open recruitment pengurus baru.
- **Tanya Ustadz & Konseling:** Formulir konsultasi syar'i secara anonim untuk mahasiswa.
- **Muslimpreneur (Danus):** Katalog merchandise dakwah, busana muslim, dan kuliner halal hasil karya wirausaha mahasiswa.
- **Portal Admin & Supabase:** Dashboard pengelolaan konten, verifikasi wakaf masuk, artikel, dan manajemen inventaris.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Menjalankan Project Secara Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/zakski-bit/Ldk-Fikri.git
   cd Ldk-Fikri
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Salin file `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Lalu isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dengan akun Supabase Anda.

4. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 👥 Pengurus & Struktur Organisasi

- **Pimpinan Inti:** Ketua Umum, Wakil Ketua Umum, Ketua Keputrian
- **4 Biro:** Biro Sekretaris Umum, Biro Bendahara Umum, Biro Mentoring (PAMI), Biro PSDM
- **5 Departemen:** Departemen Syiar & Keumatan, Departemen Kominfo, Departemen Muslimpreneur, Departemen Islamic Leadership Club (ILC), Departemen Kemuslimahan

---

## 📄 Lisensi & Kontribusi

Dibuat untuk perkembangan Dakwah Selanjutnya

