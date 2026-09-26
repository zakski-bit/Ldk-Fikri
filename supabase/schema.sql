-- ==============================================================================
-- SKRIP DATABASE SUPABASE - UKM LDK FIKRI POLITEKNIK NEGERI JAKARTA
-- Jalankan skrip ini sekali di menu "SQL Editor" pada dashboard Supabase Anda.
-- ==============================================================================

-- 1. TABEL PROFIL ORGANISASI (Visi, Misi, 5 Nilai Dasar)
CREATE TABLE IF NOT EXISTS org_profile (
  id TEXT PRIMARY KEY DEFAULT 'current',
  cabinet_name TEXT NOT NULL,
  period TEXT NOT NULL,
  tagline TEXT,
  about_text TEXT NOT NULL,
  vision TEXT NOT NULL,
  missions JSONB NOT NULL DEFAULT '[]'::jsonb,
  values JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TABEL PENGURUS KABINET (Pimpinan Inti, 5 Departemen, 4 Biro)
CREATE TABLE IF NOT EXISTS management_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  division TEXT,
  major TEXT NOT NULL,
  batch TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  quote TEXT,
  instagram TEXT,
  linkedin TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABEL PROGRAM INFAQ & DONASI
CREATE TABLE IF NOT EXISTS donation_campaign (
  id TEXT PRIMARY KEY DEFAULT 'current',
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  target_amount BIGINT NOT NULL DEFAULT 25000000,
  collected_amount BIGINT NOT NULL DEFAULT 14850000,
  donor_count INTEGER NOT NULL DEFAULT 87,
  bank_accounts JSONB NOT NULL DEFAULT '[]'::jsonb,
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  recent_donors JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABEL RIWAYAT DONASI
CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  amount BIGINT NOT NULL,
  bank TEXT,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TABEL ARTIKEL & KAJIAN SYIAR
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  cover_image TEXT NOT NULL,
  read_time TEXT DEFAULT '4 menit',
  tags JSONB DEFAULT '[]'::jsonb,
  published_at TEXT NOT NULL
);

-- 6. TABEL EVENT & AGENDA KAJIAN
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  speaker TEXT NOT NULL,
  speaker_title TEXT,
  description TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  quota INTEGER NOT NULL DEFAULT 100,
  registered_count INTEGER NOT NULL DEFAULT 0,
  is_registration_open BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TABEL PENDAFTAR EVENT MAHASISWA
CREATE TABLE IF NOT EXISTS event_registrations (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  event_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  nim TEXT NOT NULL,
  major TEXT NOT NULL,
  wa_number TEXT NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TABEL PENDAFTAR REKRUTMEN PENGURUS (OPREC)
CREATE TABLE IF NOT EXISTS oprec_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  nim TEXT NOT NULL,
  major TEXT NOT NULL,
  department_choice TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. TABEL TANYA USTADZ
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  asked_by TEXT NOT NULL,
  major TEXT,
  category TEXT NOT NULL,
  answer TEXT,
  answered_by TEXT,
  answered_at TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);

-- 10. TABEL MERCHANDISE DEPARTEMEN MUSLIMPRENEUR
CREATE TABLE IF NOT EXISTS merchandise (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  pre_order BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- AKTIFKAN ROW LEVEL SECURITY (RLS) DENGAN AKSES AMAN
-- ==============================================================================
ALTER TABLE org_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE management_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_campaign ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE oprec_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Publik (Read / SELECT untuk seluruh pengunjung web)
CREATE POLICY "Public Read org_profile" ON org_profile FOR SELECT USING (true);
CREATE POLICY "Public Read management_members" ON management_members FOR SELECT USING (true);
CREATE POLICY "Public Read donation_campaign" ON donation_campaign FOR SELECT USING (true);
CREATE POLICY "Public Read donations" ON donations FOR SELECT USING (true);
CREATE POLICY "Public Read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read event_registrations" ON event_registrations FOR SELECT USING (true);
CREATE POLICY "Public Read oprec_applications" ON oprec_applications FOR SELECT USING (true);
CREATE POLICY "Public Read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public Read merchandise" ON merchandise FOR SELECT USING (true);

-- Kebijakan Pengunjung Mendaftar / Berinteraksi (INSERT Publik)
CREATE POLICY "Public Insert donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert event_registrations" ON event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert oprec_applications" ON oprec_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert questions" ON questions FOR INSERT WITH CHECK (true);

-- Kebijakan Pengurus / Admin (Full CRUD dengan Anon/Service Key)
CREATE POLICY "Admin Write org_profile" ON org_profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write management_members" ON management_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write donation_campaign" ON donation_campaign FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write donations" ON donations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write events" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write event_registrations" ON event_registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write oprec_applications" ON oprec_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write questions" ON questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write merchandise" ON merchandise FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED DATA AWAL: PROFIL RESMI KABINET & 5 NILAI DASAR
-- ==============================================================================
INSERT INTO org_profile (id, cabinet_name, period, tagline, about_text, vision, missions, values)
VALUES (
  'current',
  'Kabinet Bersama Menebar Manfaat',
  '2025/2026',
  'Merajut Ukhuwah, Menebar Maslahat di Kampus Vokasi',
  'Forum Silaturahim Kajian Remaja Islam (FIKRI) adalah Unit Kegiatan Mahasiswa (UKM) resmi di Politeknik Negeri Jakarta yang bergerak di bidang pembinaan spiritualitas, intelektualitas, dan syiar islam di lingkungan kampus vokasi.',
  'Menjadi poros penggerak peradaban kampus vokasi yang berakar pada nilai-nilai ketauhidan, melahirkan teknokrat dan profesional muslim yang berakhlak mulia, kompeten, dan berkontribusi nyata bagi bangsa.',
  '[
    "Menyelenggarakan pembinaan keislaman berkala (Mentoring PAMI & Kajian) yang terstruktur dan aplikatif bagi mahasiswa Politeknik Negeri Jakarta.",
    "Memperluas syiar dakwah kreatif berbasis multimedia, teknologi digital, dan literasi kontemporer di era modern.",
    "Mengoptimalkan kemakmuran kegiatan ibadah di Masjid Darul Ilmi PNJ sebagai episentrum keilmuan dan pelayanan sosial civitas akademika.",
    "Membangun jejaring sinergi dan kolaborasi ukhuwah dengan seluruh jurusan, himpunan mahasiswa, BEM, dan birokrasi kampus PNJ."
  ]'::jsonb,
  '[
    {"id": "val-1", "title": "Integritas (Shidq)", "desc": "Menjaga kejujuran dalam ranah akademik, amanah, dan kehidupan sehari-hari."},
    {"id": "val-2", "title": "Profesional (Itqan)", "desc": "Bekerja secara tuntas, rapi, dan memberikan mutu terbaik di setiap tugas."},
    {"id": "val-3", "title": "Ukhuwah (Persaudaraan)", "desc": "Merawat tali kasih sayang dan saling tolong menolong sesama civitas akademika."},
    {"id": "val-4", "title": "Kreatif (Ibtikar)", "desc": "Menghadirkan gagasan syiar baru yang relevan dengan perkembangan zaman."},
    {"id": "val-5", "title": "Maslahat (Naf''un)", "desc": "Setiap langkah dan karya selalu berorientasi memberi manfaat bagi ummat."}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- SEED DATA AWAL: PROGRAM INFAQ DAKWAH KAMPUS
-- ==============================================================================
INSERT INTO donation_campaign (id, title, location, target_amount, collected_amount, donor_count, bank_accounts, milestones, recent_donors)
VALUES (
  'current',
  'Infaq & Donasi Operasional Dakwah LDK FIKRI PNJ',
  'Politeknik Negeri Jakarta (Kampus Baru UI Depok)',
  25000000,
  14850000,
  87,
  '[
    {"bank": "Bank Syariah Indonesia (BSI)", "accountNumber": "712-345-6789", "accountName": "LDK FIKRI PNJ"},
    {"bank": "Bank Mandiri", "accountNumber": "157-00-0987654-3", "accountName": "LDK FIKRI Politeknik Negeri Jakarta"}
  ]'::jsonb,
  '[
    {"id": "m1", "title": "Operasional Kajian Rutin & Majelis Ilmu Kampus", "targetAmount": 7000000, "currentAmount": 7000000, "status": "completed", "description": "Konsumsi jamaah kajian, akomodasi ustadz narasumber, dan pengadaan buletin dakwah."},
    {"id": "m2", "title": "Program Pembinaan Al-Qur''an & Mentoring Mahasiswa", "targetAmount": 6000000, "currentAmount": 6000000, "status": "completed", "description": "Modul pembelajaran tahsin, upgrading mentor, dan sarana mentoring keislaman mahasiswa."},
    {"id": "m3", "title": "Tebar Ifthar & Kemakmuran Ibadah Masjid Kampus", "targetAmount": 7000000, "currentAmount": 1850000, "status": "in_progress", "description": "Penyediaan kurma dan santap buka puasa sunnah Senin-Kamis serta kebersihan ruang sholat jamaah."},
    {"id": "m4", "title": "Syiar Multimedia & Dakwah Digital Kreatif", "targetAmount": 5000000, "currentAmount": 0, "status": "upcoming", "description": "Pengembangan web dakwah, produksi poster infografis edukasi syar''i, dan podcast."}
  ]'::jsonb,
  '[
    {"id": "d1", "name": "Hamba Allah", "amount": 150000, "date": "2026-09-20", "isAnonymous": true, "message": "Semoga berkah untuk dakwah kampus tercinta."},
    {"id": "d2", "name": "Alumni TI PNJ", "amount": 500000, "date": "2026-09-19", "isAnonymous": false, "message": "Titip infaq untuk adik-adik jamaah PNJ."},
    {"id": "d3", "name": "Hamba Allah (Maba)", "amount": 50000, "date": "2026-09-18", "isAnonymous": true, "message": "Bismillah berkah praktikum dan kuliah."},
    {"id": "d4", "name": "Keluarga Jamaah Mesin", "amount": 250000, "date": "2026-09-18", "isAnonymous": false, "message": "Infaq ifthar puasa sunnah."},
    {"id": "d5", "name": "Hamba Allah", "amount": 100000, "date": "2026-09-17", "isAnonymous": true}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- SEED DATA AWAL: PENGURUS RESMI (Pimpinan Inti, 5 Departemen, 4 Biro)
-- ==============================================================================
INSERT INTO management_members (id, name, role, department, division, major, batch, photo_url, quote, instagram, linkedin)
VALUES
-- Pimpinan Inti
('mgt-1', 'Ahmad Rayhan Al-Faruq', 'Ketua Umum (Ketum)', 'Pimpinan Inti', 'Pucuk Pimpinan', 'D4 Teknik Informatika', '2023', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'Dakwah adalah nafas, kampus adalah ladang amal kita bersama.', 'https://instagram.com', 'https://linkedin.com'),
('mgt-2', 'Farhan Maulana Malik', 'Wakil Ketua Umum (Waketum)', 'Pimpinan Inti', 'Pucuk Pimpinan', 'D4 Teknik Mesin Otomasi', '2023', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', 'Satu komando dalam kebaikan, saling menguatkan dalam dakwah.', 'https://instagram.com', NULL),
('mgt-3', 'Siti Sarah Azzahra', 'Ketua Keputrian', 'Pimpinan Inti', 'Pucuk Pimpinan', 'D4 Akuntansi Keuangan', '2023', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', 'Muslimah tangguh, menjaga kehormatan, menebar kemaslahatan.', 'https://instagram.com', NULL),

-- Biro Sekum
('mgt-4', 'Nabila Zahra Khairunnisa', 'Kabir Sekum (Ketua Biro)', 'Biro Sekum', 'Administrasi & Kesekretariatan', 'D4 Manajemen Pemasaran', '2023', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'Rapi dalam administrasi, ikhlas dalam dedikasi.', 'https://instagram.com', NULL),
('mgt-5', 'Salma Azizah', 'Korwat Biro Sekum', 'Biro Sekum', 'Arsip & Inventaris', 'D3 Penerbitan (Jurnalistik)', '2024', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80', 'Ketelitian mencatat adalah wujud tanggung jawab amanah.', 'https://instagram.com', NULL),
('mgt-6', 'Fajar Tri Nugroho', 'BPH Biro Sekum', 'Biro Sekum', 'Persuratan', 'D4 Teknik Informatika', '2024', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80', 'Tertib surat menyurat demi kelancaran dakwah.', 'https://instagram.com', NULL),
('mgt-7', 'Hilya Maulida', 'Staff Biro Sekum', 'Biro Sekum', 'Dokumentasi & Notulensi', 'D3 Akuntansi', '2025', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80', 'Belajar amanah dari hal-hal kecil.', 'https://instagram.com', NULL),

-- Biro Bendum
('mgt-8', 'Fathimah Al-Habsyi', 'Kabir Bendum (Ketua Biro)', 'Biro Bendum', 'Kebendaharaan', 'D4 Akuntansi Keuangan', '2023', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', 'Amanah mengelola dana ummat dengan akuntabel dan transparan.', 'https://instagram.com', NULL),
('mgt-9', 'Aisyah Rahmawati', 'Korwat Biro Bendum', 'Biro Bendum', 'Kas & Pembukuan', 'D4 Keuangan Perbankan', '2024', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80', 'Kejujuran finansial adalah benteng keberkahan organisasi.', 'https://instagram.com', NULL),
('mgt-10', 'Ridwan Pratama', 'BPH Biro Bendum', 'Biro Bendum', 'Verifikasi Anggaran', 'D3 Manajemen Pemasaran', '2024', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80', 'Cermat mengalokasikan sumber daya demi kebermanfaatan luas.', 'https://instagram.com', NULL),
('mgt-11', 'Annisa Putri', 'Staff Biro Bendum', 'Biro Bendum', 'Laporan Keuangan', 'D4 Akuntansi Keuangan', '2025', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', 'Siap belajar dan menjaga amanah dana dakwah.', 'https://instagram.com', NULL),

-- Biro Mentoring
('mgt-12', 'Haikal Firdaus', 'Kabir Mentoring (Ketua Biro)', 'Biro Mentoring', 'Pembinaan Mentoring PAMI', 'D4 Teknik Elektro', '2023', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80', 'Mentoring bukan sekadar mengajar, melainkan merangkul jiwa.', 'https://instagram.com', NULL),
('mgt-13', 'Khadijah Nuraini', 'Korwat Biro Mentoring', 'Biro Mentoring', 'Mentoring Akhwat PAMI', 'D3 Teknik Telekomunikasi', '2024', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'Membimbing adik-adik tingkat mengenal indahnya Islam.', 'https://instagram.com', NULL),
('mgt-14', 'Bilal Ramadhan', 'BPH Biro Mentoring', 'Biro Mentoring', 'Kurikulum & Evaluasi Mentor', 'D4 Teknik Mesin', '2024', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80', 'Kualitas kurikulum menentukan kedalaman pemahaman.', 'https://instagram.com', NULL),
('mgt-15', 'Yusuf Maulana', 'Staff Biro Mentoring', 'Biro Mentoring', 'Operasional Kelompok Mentoring', 'D4 Teknik Sipil', '2025', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', 'Senang bisa mendampingi teman-teman satu halaqah.', 'https://instagram.com', NULL),

-- Biro PSDM
('mgt-16', 'Zulfikar Hidayat', 'Kabir PSDM (Ketua Biro)', 'Biro PSDM', 'Pengembangan Karakter Kader', 'D4 Teknik Mesin Produksi', '2023', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80', 'Mencetak generasi tangguh penerus tongkat estafet kebaikan.', 'https://instagram.com', NULL),
('mgt-17', 'Nurul Izzah', 'Korwat Biro PSDM', 'Biro PSDM', 'Upgrading Kader Akhwat', 'D4 Administrasi Bisnis Terapan', '2024', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', 'Menguatkan soliditas dan ukhuwah antar kader muslimah.', 'https://instagram.com', NULL),
('mgt-18', 'Ilham Saputra', 'BPH Biro PSDM', 'Biro PSDM', 'Rekrutmen & Database Anggota', 'D3 Teknik Otomasi Listrik', '2024', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80', 'Kaderisasi adalah jantung keberlanjutan roda organisasi.', 'https://instagram.com', NULL),
('mgt-19', 'Dzaky Fairuz', 'Staff Biro PSDM', 'Biro PSDM', 'Acara Upgrading & Mabit', 'D4 Instrumentasi Rekayasa', '2025', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop&q=80', 'Belajar memimpin dengan melayani sesama pengurus.', 'https://instagram.com', NULL),

-- Departemen Syiar & Keumatan
('mgt-20', 'Muhammad Fikri Pratama', 'Kadept Syiar & Keumatan', 'Departemen Syiar & Keumatan', 'Kajian & Syiar Kampus', 'D3 Teknik Telekomunikasi', '2023', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80', 'Syiar yang merangkul menghangatkan hati setiap insan kampus.', 'https://instagram.com', NULL),
('mgt-21', 'Dewi Nur Aisyah', 'Korwat Syiar & Keumatan', 'Departemen Syiar & Keumatan', 'Syiar Kemasyarakatan', 'D4 Administrasi Bisnis Terapan', '2024', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80', 'Menyebarkan nilai-nilai rahmatan lil ''alamin dengan santun.', 'https://instagram.com', NULL),
('mgt-22', 'Wildan Hakim', 'BPH Dept Syiar & Keumatan', 'Departemen Syiar & Keumatan', 'Operasional Kajian & Sholat', 'D4 Teknik Sipil', '2024', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80', 'Berkhidmat memakmurkan ibadah dan majelis ilmu.', 'https://instagram.com', NULL),
('mgt-23', 'Raihan Abdurrahman', 'Staff Syiar & Keumatan', 'Departemen Syiar & Keumatan', 'Logistik Acara', 'D4 Teknik Informatika', '2025', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', 'Siap sigap menyukseskan setiap syiar kebaikan.', 'https://instagram.com', NULL),

-- Departemen Kominfo
('mgt-24', 'Rizky Dwi Ananda', 'Kadept Kominfo', 'Departemen Kominfo', 'Media & Informasi', 'D3 Penerbitan (Jurnalistik)', '2023', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', 'Menghubungkan hati lewat pesan visual yang berkelas.', 'https://instagram.com', NULL),
('mgt-25', 'Alifia Zahrotunnisa', 'Korwat Kominfo', 'Departemen Kominfo', 'Desain Grafis & Konten', 'D4 Desain Grafis', '2024', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80', 'Pena dan piksel dakwah mengalirkan kebaikan tanpa batas.', 'https://instagram.com', NULL),
('mgt-26', 'Danu Kurniawan', 'BPH Dept Kominfo', 'Departemen Kominfo', 'Website & IT Support', 'D4 Teknik Informatika', '2024', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80', 'Teknologi adalah sarana mempercepat laju kebaikan.', 'https://instagram.com', NULL),
('mgt-27', 'Hanif Musyaffa', 'Staff Kominfo', 'Departemen Kominfo', 'Video & Fotografi', 'D3 Teknik Grafika', '2025', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'Merekam momen ibadah dan mengemasnya penuh inspirasi.', 'https://instagram.com', NULL),

-- Departemen Muslimpreneur
('mgt-28', 'Syahrul Ramadhan', 'Kadept Muslimpreneur', 'Departemen Muslimpreneur', 'Kewirausahaan Mahasiswa', 'D4 Manajemen Pemasaran', '2023', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80', 'Kemandirian finansial adalah pilar ketahanan dakwah kampus.', 'https://instagram.com', NULL),
('mgt-29', 'Khadijah Putri Utami', 'Korwat Muslimpreneur', 'Departemen Muslimpreneur', 'Merchandise & Store', 'D3 Akuntansi', '2024', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', 'Berwirausaha dengan jujur, berniaga seraya beribadah.', 'https://instagram.com', NULL),
('mgt-30', 'Thoriq Al-Ghifari', 'BPH Dept Muslimpreneur', 'Departemen Muslimpreneur', 'Bazaar & Partnership', 'D4 Bisnis Digital', '2024', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80', 'Membangun ekosistem bisnis halal di kalangan mahasiswa.', 'https://instagram.com', NULL),
('mgt-31', 'Rifqi Zaidan', 'Staff Muslimpreneur', 'Departemen Muslimpreneur', 'Operasional Penjualan', 'D4 Manajemen Pemasaran', '2025', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop&q=80', 'Aktif berkarya dan mandiri secara ekonomi.', 'https://instagram.com', NULL),

-- Departemen ILC
('mgt-32', 'Salim Abdul Jabbar', 'Kadept ILC', 'Departemen ILC (Islamic Learning Center)', 'Pusat Studi & Belajar Islam', 'D4 Teknik Elektro', '2023', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80', 'Menghidupkan tradisi keilmuan dan adab para penuntut ilmu.', 'https://instagram.com', NULL),
('mgt-33', 'Mutia Hanifah', 'Korwat ILC', 'Departemen ILC (Islamic Learning Center)', 'Kajian Bahasa Arab & Tahsin', 'D4 Administrasi Bisnis Terapan', '2024', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80', 'Belajar Al-Qur''an menghadirkan ketenangan dalam jiwa.', 'https://instagram.com', NULL),
('mgt-34', 'Luthfi Hakim', 'BPH Dept ILC', 'Departemen ILC (Islamic Learning Center)', 'Kelas Studi Islam & Fikih', 'D4 Teknik Konversi Energi', '2024', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80', 'Ilmu sebelum amal, faham sebelum berpendapat.', 'https://instagram.com', NULL),
('mgt-35', 'Ihsan Mubarak', 'Staff ILC', 'Departemen ILC (Islamic Learning Center)', 'Pelayanan Modul & Pustaka', 'D3 Teknik Mesin', '2025', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80', 'Fasilitator ilmu bagi seluruh mahasiswa PNJ.', 'https://instagram.com', NULL),

-- Departemen Kemuslimahan
('mgt-36', 'Yasmin Aulia', 'Kadept Kemuslimahan', 'Departemen Kemuslimahan', 'Muslimah Center', 'D4 Akuntansi Keuangan', '2023', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'Muslimah anggun, cerdas, berdaya untuk peradaban kampus.', 'https://instagram.com', NULL),
('mgt-37', 'Nidaul Husna', 'BPH Dept Kemuslimahan', 'Departemen Kemuslimahan', 'Kajian Fikih Wanita & Keputrian', 'D4 Desain Grafis', '2024', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', 'Menjadi ruang aman dan hangat bagi seluruh mahasiswi PNJ.', 'https://instagram.com', NULL),
('mgt-38', 'Zahra Maulida', 'Staff Kemuslimahan', 'Departemen Kemuslimahan', 'Syiar & Media Muslimah', 'D3 Penerbitan (Jurnalistik)', '2025', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80', 'Menginspirasi sesama muslimah melalui karya bermanfaat.', 'https://instagram.com', NULL),
('mgt-39', 'Fatimah Azzahra', 'Staff Kemuslimahan', 'Departemen Kemuslimahan', 'Pelatihan & Keterampilan Akhwat', 'D4 Administrasi Bisnis Terapan', '2025', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80', 'Saling mendukung tumbuh menjadi muslimah berprestasi.', 'https://instagram.com', NULL)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- SEED DATA AWAL: ARTIKEL DAKWAH & EVENT
-- ==============================================================================
INSERT INTO articles (id, slug, title, excerpt, content, category, author_name, author_role, author_avatar, cover_image, read_time, tags, published_at)
VALUES
('art-1', 'menjaga-integritas-akademik-mahasiswa-muslim', 'Menjaga Integritas Akademik: Fikih Kejujuran di Bangku Kuliah', 'Bagaimana pandangan Islam terhadap fenomena joki tugas, titip absen, dan copy-paste laporan praktikum di lingkungan politeknik.', 'Kejujuran adalah pondasi utama dalam kepribadian seorang muslim. Di era perkuliahan vokasi dengan beban praktikum dan proyek yang padat, godaan untuk mencari jalan pintas seringkali hadir—mulai dari fenomena titip absen, copy-paste laporan praktikum tanpa menyebutkan sumber, hingga jasa joki tugas.\n\nRasulullah bersabda: "Barangsiapa yang menipu kami, maka ia bukanlah dari golongan kami." (HR. Muslim No. 102)\n\nSebagai insan akademis di Politeknik Negeri Jakarta yang memegang prinsip syariat, kompetensi teknis yang kita raih tidak akan bernilai berkah jika dicapai melalui ketidakjujuran.', 'Fikih Kampus', 'Departemen Syiar & Keumatan', 'Kajian Kontemporer', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80', '4 menit', '["Fikih", "Kejujuran", "Kuliah"]'::jsonb, '2026-09-18')
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, slug, title, category, date, time, location, speaker, speaker_title, description, poster_url, quota, registered_count, is_registration_open)
VALUES
('evt-1', 'kajian-akbar-syiar-kampus-2026', 'Kajian Akbar Syiar Kampus: Menemukan Makna di Tengah Badai Kuliah', 'Kajian Akbar', '2026-10-04', '08.30 - 11.45 WIB', 'Auditorium Perpustakaan Lt. 3 / Masjid Darul Ilmi PNJ', 'Ustadz Hilman Fauzi, S.E.I., M.E.Sy', 'Dai Nasional & Motivator Pemuda Hijrah', 'Kajian akbar terbuka untuk seluruh mahasiswa PNJ dan umum. Membahas cara mengelola quarter-life crisis, stres perkuliahan vokasi, dan memperkokoh tauhid.', 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&auto=format&fit=crop&q=80', 350, 184, true),
('evt-2', 'pami-pnj-2026', 'Mentoring Agama Islam (PAMI) 2026: Pondasi Spiritual Mahasiswa Baru', 'Mentoring PAMI', '2026-10-11', '13.00 - 15.30 WIB', 'Ruang Kelas Jurusan & Selasar Masjid Darul Ilmi PNJ', 'Tim Mentor Biro Mentoring LDK FIKRI PNJ', 'Mentor Senior Berpengalaman', 'Program mentoring rutin pekanan bagi mahasiswa baru angkatan 2026 untuk belajar membaca Al-Qur''an (Tahsin), adab pergaulan islami, dan diskusi akrab.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80', 250, 142, true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- STORAGE BUCKET: BUCKET GAMBAR UNTUK PENGURUS, ARTIKEL & EVENT
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies: Publik bisa melihat gambar, upload publik untuk kebutuhan admin
CREATE POLICY "Public Read Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Public Insert Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public Update Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Public Delete Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');

