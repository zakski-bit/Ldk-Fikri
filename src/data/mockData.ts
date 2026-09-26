export interface DonationMilestone {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
}

export interface DonorRecord {
  id: string;
  name: string;
  amount: number;
  date: string;
  bank?: string;
  message?: string;
  isAnonymous: boolean;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  nim: string;
  major: string;
  waNumber: string;
  registeredAt: string;
}

export interface OprecApplication {
  id: string;
  fullName: string;
  nim: string;
  major: string;
  departmentChoice: string;
  motivation: string;
  submittedAt: string;
  status: 'pending' | 'interview' | 'accepted' | 'rejected';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Fikih Kampus' | 'Opini Mahasiswa' | 'Renungan' | 'Kemuslimahan' | 'Kabar FIKRI';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: 'Kajian Akbar' | 'Mentoring PAMI' | 'Pelatihan' | 'Mabit' | 'Social Project';
  date: string;
  time: string;
  location: string;
  speaker: string;
  speakerTitle: string;
  description: string;
  posterUrl: string;
  quota: number;
  registeredCount: number;
  isRegistrationOpen: boolean;
}

export interface OrgValue {
  id: string;
  title: string;
  desc: string;
}

export interface OrgProfile {
  cabinetName: string;
  period: string;
  tagline: string;
  aboutText: string;
  vision: string;
  missions: string[];
  values: OrgValue[];
}

export interface ManagementMember {
  id: string;
  name: string;
  role: string;
  department: string;
  division?: string;
  major: string;
  batch: string;
  photoUrl: string;
  quote?: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface QuestionAnswer {
  id: string;
  question: string;
  askedBy: string;
  major?: string;
  category: 'Fikih' | 'Akademik & Karir' | 'Hubungan & Keluarga' | 'Motivasi Hijrah';
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  status: 'answered' | 'pending';
  createdAt: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  price: number;
  category: 'Pakaian' | 'Aksesoris' | 'Buku & Kitab';
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  preOrder: boolean;
}

export const initialMosqueCampaign = {
  title: "Wakaf & Donasi Pembangunan Masjid Daarul Ilmi PNJ",
  location: "Kawasan Kampus Politeknik Negeri Jakarta (PNJ), UI Depok",
  targetAmount: 2500000000,
  collectedAmount: 1185000000,
  donorCount: 468,
  bankAccounts: [
    {
      bank: "Bank Syariah Indonesia (BSI)",
      accountNumber: "712-345-6789",
      accountName: "Panitia Pembangunan Masjid Daarul Ilmi PNJ",
    },
    {
      bank: "Bank Mandiri",
      accountNumber: "157-00-0987654-3",
      accountName: "Panitia Pembangunan Masjid Daarul Ilmi Politeknik Negeri Jakarta",
    },
  ],
  qrisImageUrl: "/images/qris-darul-ilmi.svg",
  milestones: [
    {
      id: "m1",
      title: "Pondasi Tiang Pancang & Struktur Beton Lantai 1 (Ground Breaking)",
      targetAmount: 800000000,
      currentAmount: 800000000,
      status: "completed",
      description: "Pekerjaan pondasi cakar ayam, sloof, kolom beton utama, dan lantai dasar area ibadah utama.",
    },
    {
      id: "m2",
      title: "Struktur Konstruksi Lantai 2, Kolom Penyangga, & Dak Beton",
      targetAmount: 700000000,
      currentAmount: 385000000,
      status: "in_progress",
      description: "Pengecoran lantai 2 area sholat akhwat, perakitan tulangan baja, dan pengecoran dak beton bertulang.",
    },
    {
      id: "m3",
      title: "Konstruksi Atap, Kubah Masjid, & Sistem Sirkulasi Green Building",
      targetAmount: 500000000,
      currentAmount: 0,
      status: "upcoming",
      description: "Pemasangan rangka baja atap, ventilasi udara alami ramah lingkungan, kubah utama, dan fasad pencahayaan alami.",
    },
    {
      id: "m4",
      title: "Fasilitas Wudhu Modern, Sanitasi Higienis, & Finishing Interior",
      targetAmount: 500000000,
      currentAmount: 0,
      status: "upcoming",
      description: "Instalasi plumbing kran wudhu hemat air, partisi sanitasi, karpet sholat shaf tebal, dan akustik tata suara.",
    },
  ] as DonationMilestone[],
  recentDonors: [
    { id: "d1", name: "Hamba Allah", amount: 500000, date: "2026-09-22", isAnonymous: true, message: "Wakaf semen dan besi untuk pembangunan Masjid Daarul Ilmi." },
    { id: "d2", name: "Ikatan Alumni PNJ", amount: 15000000, date: "2026-09-21", isAnonymous: false, message: "Bismillah, partisipasi alumni untuk pembangunan fisik masjid kebanggaan kampus." },
    { id: "d3", name: "Hamba Allah (Keluarga Dosen PNJ)", amount: 2500000, date: "2026-09-21", isAnonymous: true, message: "Semoga pembangunan gedung masjid 3.500 jamaah segera tuntas dan berkah." },
    { id: "d4", name: "Hamba Allah (Mahasiswa Teknik)", amount: 100000, date: "2026-09-20", isAnonymous: true, message: "Wakaf tunai material pembangunan masjid kampus." },
    { id: "d5", name: "Komunitas Peduli Masjid PNJ", amount: 5000000, date: "2026-09-19", isAnonymous: false, message: "Wakaf pembebasan material dan fasilitas wudhu." },
  ] as DonorRecord[],
};

export const initialArticles: Article[] = [
  {
    id: "art-1",
    slug: "menjaga-integritas-akademik-mahasiswa-muslim",
    title: "Menjaga Integritas Akademik: Fikih Kejujuran di Bangku Kuliah",
    excerpt: "Bagaimana pandangan Islam terhadap fenomena joki tugas, titip absen, dan copy-paste laporan praktikum di lingkungan politeknik.",
    content: `Kejujuran adalah pondasi utama dalam kepribadian seorang muslim. Di era perkuliahan vokasi dengan beban praktikum dan proyek yang padat, godaan untuk mencari jalan pintas seringkali hadir—mulai dari fenomena titip absen, copy-paste laporan praktikum tanpa menyebutkan sumber, hingga jasa joki tugas.

Rasulullah ﷺ bersabda:
> *"Barangsiapa yang menipu kami, maka ia bukanlah dari golongan kami."* (HR. Muslim No. 102)

Sebagai insan akademis di Politeknik Negeri Jakarta yang memegang prinsip syariat, kompetensi teknis yang kita raih tidak akan bernilai berkah jika dicapai melalui ketidakjujuran. Memahami bahwa Allah Maha Mengawasi (Muraqabatullah) di setiap baris kode, di setiap lembar laporan laboratorium, dan di setiap ujian adalah kunci keberkahan ilmu yang akan kita bawa hingga dunia kerja nanti.`,
    category: "Fikih Kampus",
    author: {
      name: "Divisi Syiar Kreatif FIKRI",
      role: "Kajian Kontemporer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    publishedAt: "2026-09-15",
    readTime: "4 menit",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    tags: ["Akademik", "Fikih Kampus", "Integritas"],
  },
  {
    id: "art-2",
    slug: "tips-manajemen-waktu-aktivis-dakwah-kampus",
    title: "Tetap Cumlaude dan Produktif: Seni Manajemen Waktu Mahasiswa Muslim",
    excerpt: "Kiat membagi waktu antara jadwal kuliah padat PNJ, kepengurusan organisasi, dan ibadah harian tanpa burnout.",
    content: `Banyak mahasiswa politeknik merasa kewalahan membagi waktu antara jadwal bengkel/lab, laporan mingguan, dan amanah organisasi dakwah. Padahal, manajemen waktu yang baik justru merupakan cerminan dari kedisiplinan seorang muslim yang terbiasa sholat tepat waktu.

Kuncinya ada pada penetapan prioritas:
1. Menjadwalkan aktivitas di sekeliling waktu sholat, bukan sebaliknya.
2. Menggunakan prinsip *Deep Work* saat mengerjakan modul atau proyek bengkel.
3. Menjaga ruhiyah dengan tilawah harian minimal satu juz agar pikiran tetap jernih dan produktif.`,
    category: "Opini Mahasiswa",
    author: {
      name: "Ahmad Rayhan",
      role: "Ketua Umum LDK FIKRI 2025/2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    publishedAt: "2026-09-10",
    readTime: "5 menit",
    coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80",
    tags: ["Manajemen Waktu", "Tips Kuliah", "Produktivitas"],
  },
  {
    id: "art-3",
    slug: "keutamaan-membangun-masjid-kampus",
    title: "Sedekah Jariyah Abadi: Revitalisasi & Pembangunan Masjid Daarul Ilmi PNJ",
    excerpt: "Menilik proyek bersejarah pembangunan fisik Masjid Daarul Ilmi (Daim) PNJ berkapasitas 3.500 jamaah dengan konsep green building.",
    content: `Masjid Daarul Ilmi (sering akrab disapa Masjid Daim) memiliki nilai historis mendalam bagi keluarga besar Politeknik Negeri Jakarta sejak era kampus masih bergabung dengan Universitas Indonesia. Kini, seiring pertumbuhan pesat mahasiswa politeknik, revitalisasi total dan pembangunan fisik masjid representatif berkapasitas 3.500 jamaah menjadi amanah bersama.

Dengan mengusung konsep Green Campus Mosque—mengoptimalkan pencahayaan alami, sirkulasi udara sejuk, dan efisiensi energi—pembangunan ini didukung oleh sinergi industri, alumni, civitas akademika, serta masyarakat luas.

Rasulullah ﷺ bersabda:
> *"Barangsiapa membangun masjid karena Allah, kecil atau besar, maka Allah membangunkan baginya rumah di surga."* (HR. At-Tirmidzi No. 319)

Setiap rupiah wakaf yang dialirkan untuk pembelian semen, besi beton, atap, dan fasilitas sanitasi Masjid Daarul Ilmi PNJ akan menjadi saksi abadi dan amal jariyah yang pahalanya terus mengalir hingga yaumil akhir.`,
    category: "Renungan",
    author: {
      name: "Panitia Pembangunan Masjid Daarul Ilmi",
      role: "Tim Pembangunan Masjid Daim",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    publishedAt: "2026-09-05",
    readTime: "3 menit",
    coverImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80",
    tags: ["Masjid Daarul Ilmi", "Pembangunan Masjid", "Wakaf Pembangunan"],
  }
];

export const initialEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Kajian Akbar Syiar Kampus: Menemukan Makna di Tengah Badai Kuliah",
    slug: "kajian-akbar-syiar-kampus-2026",
    category: "Kajian Akbar",
    date: "2026-10-04",
    time: "08.30 - 11.45 WIB",
    location: "Auditorium Perpustakaan Lt. 3 / Masjid Darul Ilmi PNJ",
    speaker: "Ustadz Hilman Fauzi, S.E.I., M.E.Sy",
    speakerTitle: "Dai Nasional & Motivator Pemuda Hijrah",
    description: "Kajian akbar terbuka untuk seluruh mahasiswa PNJ dan umum. Membahas cara mengelola quarter-life crisis, stres perkuliahan vokasi, dan memperkokoh tauhid.",
    posterUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&auto=format&fit=crop&q=80",
    quota: 350,
    registeredCount: 284,
    isRegistrationOpen: true,
  },
  {
    id: "evt-2",
    title: "Mentoring Agama Islam (PAMI) 2026: Pondasi Spiritual Mahasiswa Baru",
    slug: "pami-pnj-2026",
    category: "Mentoring PAMI",
    date: "2026-10-11",
    time: "13.00 - 15.30 WIB",
    location: "Ruang Kelas Jurusan & Selasar Masjid Darul Ilmi PNJ",
    speaker: "Tim Mentor LDK FIKRI PNJ",
    speakerTitle: "Mentor Senior Berpengalaman",
    description: "Program mentoring rutin pekanan bagi mahasiswa baru angkatan 2026 untuk belajar membaca Al-Qur'an (Tahsin), adab pergaulan islami, dan diskusi akrab.",
    posterUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    quota: 1000,
    registeredCount: 745,
    isRegistrationOpen: true,
  },
  {
    id: "evt-3",
    title: "Workshop Desain Grafis & AI Dakwah Kreatif",
    slug: "workshop-desain-dakwah-kreatif",
    category: "Pelatihan",
    date: "2026-10-25",
    time: "09.00 - 14.00 WIB",
    location: "Lab Komputer Gedung Serba Guna PNJ",
    speaker: "Faris Al-Fatih",
    speakerTitle: "Creative Lead Muslim Designers Community",
    description: "Pelatihan teknis Figma, Illustrator, dan prompt engineering etis untuk memproduksi infografis dakwah yang estetik dan viral.",
    posterUrl: "https://images.unsplash.com/photo-1542744094-3a31727221eb?w=800&auto=format&fit=crop&q=80",
    quota: 60,
    registeredCount: 60,
    isRegistrationOpen: false, // Full quota
  }
];

export const initialOrgProfile: OrgProfile = {
  cabinetName: "Kabinet Bersama Menebar Manfaat",
  period: "2025/2026",
  tagline: "Merajut Ukhuwah, Menebar Maslahat di Kampus Vokasi",
  aboutText: "Forum Silaturahim Kajian Remaja Islam (FIKRI) adalah Unit Kegiatan Mahasiswa (UKM) resmi di Politeknik Negeri Jakarta yang bergerak di bidang pembinaan spiritualitas, intelektualitas, dan syiar islam di lingkungan kampus vokasi.",
  vision: "Menjadi poros penggerak peradaban kampus vokasi yang berakar pada nilai-nilai ketauhidan, melahirkan teknokrat dan profesional muslim yang berakhlak mulia, kompeten, dan berkontribusi nyata bagi bangsa.",
  missions: [
    "Menyelenggarakan pembinaan keislaman berkala (Mentoring PAMI & Kajian) yang terstruktur dan aplikatif bagi mahasiswa Politeknik Negeri Jakarta.",
    "Memperluas syiar dakwah kreatif berbasis multimedia, teknologi digital, dan literasi kontemporer di era modern.",
    "Mengoptimalkan kemakmuran dan pembangunan Masjid Darul Ilmi PNJ sebagai episentrum ibadah, keilmuan, dan pelayanan sosial civitas akademika.",
    "Membangun jejaring sinergi dan kolaborasi ukhuwah dengan seluruh jurusan, himpunan mahasiswa, BEM, dan birokrasi kampus PNJ."
  ],
  values: [
    { id: "val-1", title: "Integritas (Shidq)", desc: "Menjaga kejujuran dalam ranah akademik, amanah, dan kehidupan sehari-hari." },
    { id: "val-2", title: "Profesional (Itqan)", desc: "Bekerja secara tuntas, rapi, dan memberikan mutu terbaik di setiap tugas." },
    { id: "val-3", title: "Ukhuwah (Persaudaraan)", desc: "Merawat tali kasih sayang dan saling tolong menolong sesama civitas akademika." },
    { id: "val-4", title: "Kreatif (Ibtikar)", desc: "Menghadirkan gagasan syiar baru yang relevan dengan perkembangan zaman." },
    { id: "val-5", title: "Maslahat (Naf'un)", desc: "Setiap langkah dan karya selalu berorientasi memberi manfaat bagi ummat." },
  ]
};

export const OFFICIAL_DEPARTMENTS = [
  "Pimpinan Inti",
  "Departemen Syiar & Keumatan",
  "Departemen Kominfo",
  "Departemen Muslimpreneur",
  "Departemen ILC (Islamic Learning Center)",
  "Departemen Kemuslimahan",
  "Biro Sekum",
  "Biro Bendum",
  "Biro Mentoring",
  "Biro PSDM"
] as const;

export const OFFICIAL_ROLE_LEVELS = [
  "Ketum",
  "Waketum",
  "Ketua Keputrian",
  "Kadept",
  "Kabir",
  "Korwat",
  "BPH",
  "Staff"
] as const;

export const initialManagement: ManagementMember[] = [
  // 1. Pimpinan Inti
  {
    id: "mgt-1",
    name: "Ahmad Rayhan Al-Faruq",
    role: "Ketua Umum (Ketum)",
    department: "Pimpinan Inti",
    division: "Pucuk Pimpinan",
    major: "D4 Teknik Informatika",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    quote: "Dakwah adalah nafas, kampus adalah ladang amal kita bersama.",
    socials: { instagram: "https://instagram.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "mgt-2",
    name: "Farhan Maulana Malik",
    role: "Wakil Ketua Umum (Waketum)",
    department: "Pimpinan Inti",
    division: "Pucuk Pimpinan",
    major: "D4 Teknik Mesin Otomasi",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    quote: "Satu komando dalam kebaikan, saling menguatkan dalam dakwah.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-3",
    name: "Siti Sarah Azzahra",
    role: "Ketua Keputrian",
    department: "Pimpinan Inti",
    division: "Pucuk Pimpinan",
    major: "D4 Akuntansi Keuangan",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    quote: "Muslimah tangguh, menjaga kehormatan, menebar kemaslahatan.",
    socials: { instagram: "https://instagram.com" }
  },

  // 2. Biro Sekum (Sekretaris Umum)
  {
    id: "mgt-4",
    name: "Nabila Zahra Khairunnisa",
    role: "Kabir Sekum (Ketua Biro)",
    department: "Biro Sekum",
    division: "Administrasi & Kesekretariatan",
    major: "D4 Manajemen Pemasaran",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    quote: "Rapi dalam administrasi, ikhlas dalam dedikasi.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-5",
    name: "Salma Azizah",
    role: "Korwat Biro Sekum",
    department: "Biro Sekum",
    division: "Arsip & Inventaris",
    major: "D3 Penerbitan (Jurnalistik)",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    quote: "Ketelitian mencatat adalah wujud tanggung jawab amanah.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-6",
    name: "Fajar Tri Nugroho",
    role: "BPH Biro Sekum",
    department: "Biro Sekum",
    division: "Persuratan",
    major: "D4 Teknik Informatika",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    quote: "Tertib surat menyurat demi kelancaran dakwah.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-7",
    name: "Hilya Maulida",
    role: "Staff Biro Sekum",
    department: "Biro Sekum",
    division: "Dokumentasi & Notulensi",
    major: "D3 Akuntansi",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    quote: "Belajar amanah dari hal-hal kecil.",
    socials: { instagram: "https://instagram.com" }
  },

  // 3. Biro Bendum (Bendahara Umum)
  {
    id: "mgt-8",
    name: "Fathimah Al-Habsyi",
    role: "Kabir Bendum (Ketua Biro)",
    department: "Biro Bendum",
    division: "Kebendaharaan",
    major: "D4 Akuntansi Keuangan",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    quote: "Amanah mengelola dana ummat dengan akuntabel dan transparan.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-9",
    name: "Aisyah Rahmawati",
    role: "Korwat Biro Bendum",
    department: "Biro Bendum",
    division: "Kas & Pembukuan",
    major: "D4 Keuangan Perbankan",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    quote: "Kejujuran finansial adalah benteng keberkahan organisasi.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-10",
    name: "Ridwan Pratama",
    role: "BPH Biro Bendum",
    department: "Biro Bendum",
    division: "Verifikasi Anggaran",
    major: "D3 Manajemen Pemasaran",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    quote: "Cermat mengalokasikan sumber daya demi kebermanfaatan luas.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-11",
    name: "Annisa Putri",
    role: "Staff Biro Bendum",
    department: "Biro Bendum",
    division: "Laporan Keuangan",
    major: "D4 Akuntansi Keuangan",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    quote: "Siap belajar dan menjaga amanah dana dakwah.",
    socials: { instagram: "https://instagram.com" }
  },

  // 4. Biro Mentoring
  {
    id: "mgt-12",
    name: "Haikal Firdaus",
    role: "Kabir Mentoring (Ketua Biro)",
    department: "Biro Mentoring",
    division: "Pembinaan Mentoring PAMI",
    major: "D4 Teknik Elektro",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    quote: "Mentoring bukan sekadar mengajar, melainkan merangkul jiwa.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-13",
    name: "Khadijah Nuraini",
    role: "Korwat Biro Mentoring",
    department: "Biro Mentoring",
    division: "Mentoring Akhwat PAMI",
    major: "D3 Teknik Telekomunikasi",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    quote: "Membimbing adik-adik tingkat mengenal indahnya Islam.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-14",
    name: "Bilal Ramadhan",
    role: "BPH Biro Mentoring",
    department: "Biro Mentoring",
    division: "Kurikulum & Evaluasi Mentor",
    major: "D4 Teknik Mesin",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
    quote: "Kualitas kurikulum menentukan kedalaman pemahaman.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-15",
    name: "Yusuf Maulana",
    role: "Staff Biro Mentoring",
    department: "Biro Mentoring",
    division: "Operasional Kelompok Mentoring",
    major: "D4 Teknik Sipil",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    quote: "Senang bisa mendampingi teman-teman satu halaqah.",
    socials: { instagram: "https://instagram.com" }
  },

  // 5. Biro PSDM (Pengembangan Sumber Daya Manusia)
  {
    id: "mgt-16",
    name: "Zulfikar Hidayat",
    role: "Kabir PSDM (Ketua Biro)",
    department: "Biro PSDM",
    division: "Pengembangan Karakter Kader",
    major: "D4 Teknik Mesin Produksi",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    quote: "Mencetak generasi tangguh penerus tongkat estafet kebaikan.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-17",
    name: "Nurul Izzah",
    role: "Korwat Biro PSDM",
    department: "Biro PSDM",
    division: "Upgrading Kader Akhwat",
    major: "D4 Administrasi Bisnis Terapan",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    quote: "Menguatkan soliditas dan ukhuwah antar kader muslimah.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-18",
    name: "Ilham Saputra",
    role: "BPH Biro PSDM",
    department: "Biro PSDM",
    division: "Rekrutmen & Database Anggota",
    major: "D3 Teknik Otomasi Listrik",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80",
    quote: "Kaderisasi adalah jantung keberlanjutan roda organisasi.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-19",
    name: "Dzaky Fairuz",
    role: "Staff Biro PSDM",
    department: "Biro PSDM",
    division: "Acara Upgrading & Mabit",
    major: "D4 Instrumentasi Rekayasa",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop&q=80",
    quote: "Belajar memimpin dengan melayani sesama pengurus.",
    socials: { instagram: "https://instagram.com" }
  },

  // 6. Departemen Syiar & Keumatan
  {
    id: "mgt-20",
    name: "Muhammad Fikri Pratama",
    role: "Kadept Syiar & Keumatan",
    department: "Departemen Syiar & Keumatan",
    division: "Kajian & Syiar Kampus",
    major: "D3 Teknik Telekomunikasi",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    quote: "Syiar yang merangkul menghangatkan hati setiap insan kampus.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-21",
    name: "Dewi Nur Aisyah",
    role: "Korwat Syiar & Keumatan",
    department: "Departemen Syiar & Keumatan",
    division: "Syiar Kemasyarakatan",
    major: "D4 Administrasi Bisnis Terapan",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    quote: "Menyebarkan nilai-nilai rahmatan lil 'alamin dengan santun.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-22",
    name: "Wildan Hakim",
    role: "BPH Dept Syiar & Keumatan",
    department: "Departemen Syiar & Keumatan",
    division: "Operasional Kajian & Sholat",
    major: "D4 Teknik Sipil",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    quote: "Berkhidmat memakmurkan ibadah dan majelis ilmu.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-23",
    name: "Raihan Abdurrahman",
    role: "Staff Syiar & Keumatan",
    department: "Departemen Syiar & Keumatan",
    division: "Logistik Acara",
    major: "D4 Teknik Informatika",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    quote: "Siap sigap menyukseskan setiap syiar kebaikan.",
    socials: { instagram: "https://instagram.com" }
  },

  // 7. Departemen Kominfo (Komunikasi dan Informasi)
  {
    id: "mgt-24",
    name: "Rizky Dwi Ananda",
    role: "Kadept Kominfo",
    department: "Departemen Kominfo",
    division: "Media & Informasi",
    major: "D3 Penerbitan (Jurnalistik)",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    quote: "Menghubungkan hati lewat pesan visual yang berkelas.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-25",
    name: "Alifia Zahrotunnisa",
    role: "Korwat Kominfo",
    department: "Departemen Kominfo",
    division: "Desain Grafis & Konten",
    major: "D4 Desain Grafis",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    quote: "Pena dan piksel dakwah mengalirkan kebaikan tanpa batas.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-26",
    name: "Danu Kurniawan",
    role: "BPH Dept Kominfo",
    department: "Departemen Kominfo",
    division: "Website & IT Support",
    major: "D4 Teknik Informatika",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    quote: "Teknologi adalah sarana mempercepat laju kebaikan.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-27",
    name: "Hanif Musyaffa",
    role: "Staff Kominfo",
    department: "Departemen Kominfo",
    division: "Video & Fotografi",
    major: "D3 Teknik Grafika",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    quote: "Merekam momen ibadah dan mengemasnya penuh inspirasi.",
    socials: { instagram: "https://instagram.com" }
  },

  // 8. Departemen Muslimpreneur
  {
    id: "mgt-28",
    name: "Syahrul Ramadhan",
    role: "Kadept Muslimpreneur",
    department: "Departemen Muslimpreneur",
    division: "Kewirausahaan Mahasiswa",
    major: "D4 Manajemen Pemasaran",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
    quote: "Kemandirian finansial adalah pilar ketahanan dakwah kampus.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-29",
    name: "Khadijah Putri Utami",
    role: "Korwat Muslimpreneur",
    department: "Departemen Muslimpreneur",
    division: "Merchandise & Store",
    major: "D3 Akuntansi",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    quote: "Berwirausaha dengan jujur, berniaga seraya beribadah.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-30",
    name: "Thoriq Al-Ghifari",
    role: "BPH Dept Muslimpreneur",
    department: "Departemen Muslimpreneur",
    division: "Bazaar & Partnership",
    major: "D4 Bisnis Digital",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    quote: "Membangun ekosistem bisnis halal di kalangan mahasiswa.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-31",
    name: "Rifqi Zaidan",
    role: "Staff Muslimpreneur",
    department: "Departemen Muslimpreneur",
    division: "Operasional Penjualan",
    major: "D4 Manajemen Pemasaran",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop&q=80",
    quote: "Aktif berkarya dan mandiri secara ekonomi.",
    socials: { instagram: "https://instagram.com" }
  },

  // 9. Departemen ILC (Islamic Learning Center)
  {
    id: "mgt-32",
    name: "Salim Abdul Jabbar",
    role: "Kadept ILC",
    department: "Departemen ILC (Islamic Learning Center)",
    division: "Pusat Studi & Belajar Islam",
    major: "D4 Teknik Elektro",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80",
    quote: "Menghidupkan tradisi keilmuan dan adab para penuntut ilmu.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-33",
    name: "Mutia Hanifah",
    role: "Korwat ILC",
    department: "Departemen ILC (Islamic Learning Center)",
    division: "Kajian Bahasa Arab & Tahsin",
    major: "D4 Administrasi Bisnis Terapan",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    quote: "Belajar Al-Qur'an menghadirkan ketenangan dalam jiwa.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-34",
    name: "Luthfi Hakim",
    role: "BPH Dept ILC",
    department: "Departemen ILC (Islamic Learning Center)",
    division: "Kelas Studi Islam & Fikih",
    major: "D4 Teknik Konversi Energi",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    quote: "Ilmu sebelum amal, faham sebelum berpendapat.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-35",
    name: "Ihsan Mubarak",
    role: "Staff ILC",
    department: "Departemen ILC (Islamic Learning Center)",
    division: "Pelayanan Modul & Pustaka",
    major: "D3 Teknik Mesin",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    quote: "Fasilitator ilmu bagi seluruh mahasiswa PNJ.",
    socials: { instagram: "https://instagram.com" }
  },

  // 10. Departemen Kemuslimahan
  {
    id: "mgt-36",
    name: "Yasmin Aulia",
    role: "Kadept Kemuslimahan",
    department: "Departemen Kemuslimahan",
    division: "Muslimah Center",
    major: "D4 Akuntansi Keuangan",
    batch: "2023",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    quote: "Muslimah anggun, cerdas, berdaya untuk peradaban kampus.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-37",
    name: "Nidaul Husna",
    role: "BPH Dept Kemuslimahan",
    department: "Departemen Kemuslimahan",
    division: "Kajian Fikih Wanita & Keputrian",
    major: "D4 Desain Grafis",
    batch: "2024",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    quote: "Menjadi ruang aman dan hangat bagi seluruh mahasiswi PNJ.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-38",
    name: "Zahra Maulida",
    role: "Staff Kemuslimahan",
    department: "Departemen Kemuslimahan",
    division: "Syiar & Media Muslimah",
    major: "D3 Penerbitan (Jurnalistik)",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    quote: "Menginspirasi sesama muslimah melalui karya bermanfaat.",
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: "mgt-39",
    name: "Fatimah Azzahra",
    role: "Staff Kemuslimahan",
    department: "Departemen Kemuslimahan",
    division: "Pelatihan & Keterampilan Akhwat",
    major: "D4 Administrasi Bisnis Terapan",
    batch: "2025",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    quote: "Saling mendukung tumbuh menjadi muslimah berprestasi.",
    socials: { instagram: "https://instagram.com" }
  }
];

export const initialQuestions: QuestionAnswer[] = [
  {
    id: "q-1",
    question: "Bagaimana cara menjaga sholat fardhu saat ada jadwal praktikum padat di lab yang dosennya tidak memberi jeda adzan?",
    askedBy: "Mahasiswa TI (Anonim)",
    major: "Teknik Informatika",
    category: "Fikih",
    answer: "Sebaiknya sampaikan dengan sopan dan penuh adab kepada dosen sebelum praktikum dimulai bahwa Anda mohon izin 7-10 menit saat adzan berkumandang untuk sholat. Mayoritas dosen PNJ sangat menghargai mahasiswa yang mengomunikasikannya terlebih dahulu. Jika sangat darurat, usahakan sholat segera setelah praktikum berakhir sebelum waktu habis.",
    answeredBy: "Ustadz Pembina LDK FIKRI",
    answeredAt: "2026-09-18",
    status: "answered",
    createdAt: "2026-09-17",
  },
  {
    id: "q-2",
    question: "Apakah boleh akhwat ikut kepengurusan organisasi teknik yang dominan ikhwan?",
    askedBy: "Mahasiswi Mesin (Anonim)",
    major: "Teknik Mesin",
    category: "Hubungan & Keluarga",
    answer: "Tentu diperbolehkan selama tetap menjaga batasan adab pergaulan islami (menjaga pandangan, tidak berkhalwat/berdua-duaan tanpa keperluan, menjaga busana syar'i, dan komunikasi sebatas ranah profesional amanah organisasi).",
    answeredBy: "Divisi Kemuslimahan LDK FIKRI",
    answeredAt: "2026-09-19",
    status: "answered",
    createdAt: "2026-09-18",
  },
  {
    id: "q-3",
    question: "Saya ingin mulai berhijrah dan ikut kajian tapi minder karena belum lancar baca Al-Qur'an, apakah di FIKRI ada bimbingan dari dasar?",
    askedBy: "Maba PNJ (Anonim)",
    major: "Teknik Grafika Penerbitan",
    category: "Motivasi Hijrah",
    answer: "Ahlan wa sahlan! LDK FIKRI memiliki program Mentoring PAMI dan kelas Tahsin dasar yang sangat ramah pemula, dimulai dari pengenalan huruf hijaiyah hingga tajwid. Tidak perlu merasa minder, majelis ilmu adalah tempat orang belajar, bukan tempat orang yang sudah merasa sempurna.",
    answeredBy: "Departemen Kaderisasi",
    answeredAt: "2026-09-20",
    status: "answered",
    createdAt: "2026-09-20",
  }
];

export const initialMerchandise: MerchandiseItem[] = [
  {
    id: "merch-1",
    name: "Hoodie Eksklusif LDK FIKRI 2026",
    price: 165000,
    category: "Pakaian",
    description: "Bahan Cotton Fleece tebal dan adem, sablon bordir halus bertuliskan 'Khairunnaas Anfa'uhum Linnaas'.",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
    isAvailable: true,
    preOrder: false,
  },
  {
    id: "merch-2",
    name: "Buku Dzikir Pagi Petang & Doa Pilihan Al-Ma'tsurat",
    price: 25000,
    category: "Buku & Kitab",
    description: "Ukuran saku praktis, dilengkapi transliterasi latin, terjemahan, dan faedah dzikir harian.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80",
    isAvailable: true,
    preOrder: false,
  },
  {
    id: "merch-3",
    name: "Totebag Canvas Syiar 'Iqra & Berkarya'",
    price: 45000,
    category: "Aksesoris",
    description: "Bahan canvas premium tebal, muat laptop 14 inch dan buku perkuliahan praktikum.",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80",
    isAvailable: true,
    preOrder: false,
  }
];
