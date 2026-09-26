import { supabase, isSupabaseConfigured } from "./supabase";

export interface UploadResult {
  url: string;
  isCloud: boolean;
  error?: string;
}

/**
 * Mengompres gambar di sisi klien menggunakan HTML5 Canvas.
 * Ini memastikan jika disimpan dalam mode lokal (Base64), ukurannya tidak membebani localStorage (< 150KB).
 */
export async function compressImage(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Jika bukan file gambar atau sedang di lingkungan non-browser
    if (typeof window === "undefined" || !file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = Math.round(maxHeight);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(img.src);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Konversi ke format JPEG terkompresi
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Mengunggah file gambar:
 * 1. Jika Supabase aktif: langsung unggah ke Supabase Storage (bucket 'images')
 *    dan mengembalikan URL publik resmi Supabase CDN.
 * 2. Jika offline / belum konfigurasi Supabase: kompres gambar ke Base64 lokal
 *    agar dapat langsung dilihat (preview) dan disimpan di penyimpanan browser.
 */
export async function uploadImage(
  file: File,
  folder: "pengurus" | "artikel" | "event" | "umum" = "umum"
): Promise<UploadResult> {
  // Jika Supabase terkonfigurasi, coba upload ke cloud storage
  if (isSupabaseConfigured()) {
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 30);
      const filePath = `${folder}/${Date.now()}-${cleanName}.${ext}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type || "image/jpeg",
        });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          return {
            url: publicData.publicUrl,
            isCloud: true,
          };
        }
      } else if (error) {
        console.warn("Supabase Storage upload gagal, beralih ke kompresi lokal:", error.message);
      }
    } catch (err) {
      console.warn("Terjadi kendala saat upload Supabase:", err);
    }
  }

  // Fallback: Kompresi Base64 lokal untuk preview instan & persistensi offline
  const base64Url = await compressImage(file);
  return {
    url: base64Url,
    isCloud: false,
  };
}
