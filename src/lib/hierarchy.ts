import type { ManagementMember } from "@/data/mockData";

export const OFFICIAL_DEPARTMENT_ORDER = [
  "Pimpinan Inti",
  "Biro Sekum",
  "Biro Bendum",
  "Biro Mentoring",
  "Biro PSDM",
  "Departemen Syiar & Keumatan",
  "Departemen Kominfo",
  "Departemen Muslimpreneur",
  "Departemen ILC (Islamic Learning Center)",
  "Departemen Kemuslimahan",
] as const;

/**
 * Menghitung bobot urutan departemen/biro.
 * 1. Pimpinan Inti
 * 2. Biro resmi (Sekum, Bendum, Mentoring, PSDM)
 * 3. Biro kustom baru hasil CRUD (abjad)
 * 4. Departemen resmi (Syiar, Kominfo, Muslimpreneur, ILC, Kemuslimahan)
 * 5. Departemen kustom baru hasil CRUD (abjad)
 * 6. Unit lainnya
 */
export function getDepartmentWeight(deptName: string): number {
  const norm = deptName.trim();

  if (norm.toLowerCase().includes("pimpinan") || norm.toLowerCase().includes("inti")) {
    return 10;
  }

  // Biro Resmi
  const officialBiros = ["Biro Sekum", "Biro Bendum", "Biro Mentoring", "Biro PSDM"];
  const biroIndex = officialBiros.findIndex((b) => b.toLowerCase() === norm.toLowerCase());
  if (biroIndex !== -1) {
    return 20 + biroIndex;
  }

  // Biro Kustom
  if (norm.toLowerCase().startsWith("biro")) {
    return 30;
  }

  // Departemen Resmi
  const officialDepts = [
    "Departemen Syiar & Keumatan",
    "Departemen Kominfo",
    "Departemen Muslimpreneur",
    "Departemen ILC (Islamic Learning Center)",
    "Departemen Kemuslimahan",
  ];
  const deptIndex = officialDepts.findIndex((d) => d.toLowerCase() === norm.toLowerCase());
  if (deptIndex !== -1) {
    return 40 + deptIndex;
  }

  // Departemen Kustom
  if (norm.toLowerCase().startsWith("departemen") || norm.toLowerCase().startsWith("dept")) {
    return 50;
  }

  return 60;
}

/**
 * Mengurutkan daftar nama departemen secara terstruktur.
 */
export function sortDepartments(departments: string[]): string[] {
  const unique = Array.from(new Set(departments.filter(Boolean)));

  return unique.sort((a, b) => {
    const weightA = getDepartmentWeight(a);
    const weightB = getDepartmentWeight(b);

    if (weightA !== weightB) {
      return weightA - weightB;
    }
    return a.localeCompare(b, "id");
  });
}

/**
 * Menghitung bobot jabatan pengurus sesuai hierarki resmi FIKRI:
 * 1. Ketum (10)
 * 2. Waketum (20)
 * 3. Ketua Keputrian (30)
 * 4. Kadept / Kabir / Ketua (40)
 * 5. Korwat / Koordinator Akhwat (50)
 * 6. BPH Divisi (60)
 * 7. Staff / Anggota (70)
 * 8. Lainnya (80)
 */
export function getRoleWeight(role: string): number {
  const r = role.toLowerCase().trim();

  if (r.includes("ketum") || r.includes("ketua umum")) return 10;
  if (r.includes("waketum") || r.includes("wakil ketua umum") || r.includes("wakil")) return 20;
  if (r.includes("keputrian")) return 30;
  if (r.includes("kadept") || r.includes("kabir") || r.includes("ketua biro") || r.includes("ketua departemen")) return 40;
  if (r.includes("korwat") || r.includes("koordinator akhwat") || r.includes("koordinator")) return 50;
  if (r.includes("bph") || r.includes("sekretaris") || r.includes("bendahara")) return 60;
  if (r.includes("staff") || r.includes("staf") || r.includes("anggota")) return 70;

  return 80;
}

/**
 * Mengurutkan pengurus secara konsisten:
 * 1. Berdasarkan bobot departemen/biro
 * 2. Berdasarkan hierarki jabatan (Ketum -> Waketum -> Kabir/Kadept -> Korwat -> BPH -> Staff)
 * 3. Berdasarkan nama (abjad)
 */
export function sortMembers(members: ManagementMember[]): ManagementMember[] {
  return [...members].sort((a, b) => {
    const deptWeightA = getDepartmentWeight(a.department);
    const deptWeightB = getDepartmentWeight(b.department);

    if (deptWeightA !== deptWeightB) {
      return deptWeightA - deptWeightB;
    }

    const roleWeightA = getRoleWeight(a.role);
    const roleWeightB = getRoleWeight(b.role);

    if (roleWeightA !== roleWeightB) {
      return roleWeightA - roleWeightB;
    }

    return a.name.localeCompare(b.name, "id");
  });
}
