"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  Link as LinkIcon, 
  CheckCircle2, 
  Loader2, 
  Eye, 
  Sparkles 
} from "lucide-react";
import { uploadImage } from "@/lib/upload";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "pengurus" | "artikel" | "event" | "umum";
  aspectRatio?: "square" | "wide";
  helperText?: string;
  placeholderText?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  folder = "umum",
  aspectRatio = "square",
  helperText,
  placeholderText = "Pilih file gambar dari komputer atau seret ke sini",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLocalBase64 = value?.startsWith("data:image/");
  const isCloudUrl = value?.startsWith("http");

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (JPG, PNG, WEBP, dll)");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Memproses & mengunggah gambar...");

    try {
      const res = await uploadImage(file, folder);
      onChange(res.url);
      setManualUrl(res.url);
      setUploadStatus(
        res.isCloud
          ? "Tersimpan di Supabase Cloud Storage"
          : "Tersimpan secara lokal (Preview aktif)"
      );
      setTimeout(() => setUploadStatus(null), 3500);
    } catch (err) {
      console.error("Gagal mengunggah gambar:", err);
      alert("Gagal memproses gambar. Silakan coba kembali.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleClear = () => {
    onChange("");
    setManualUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApplyManualUrl = () => {
    onChange(manualUrl.trim());
    setShowUrlInput(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 block">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? "Tutup Mode URL" : "Input URL Manual"}
        </button>
      </div>

      {showUrlInput && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-2 items-center">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyManualUrl}
            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Terapkan
          </button>
        </div>
      )}

      {/* Main Upload Box & Preview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Thumbnail Preview */}
        {value ? (
          <div className="relative group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className={`object-cover border border-slate-200 bg-slate-100 shadow-sm ${
                aspectRatio === "square"
                  ? "w-20 h-20 sm:w-24 sm:h-24 rounded-2xl"
                  : "w-36 h-20 sm:w-40 sm:h-24 rounded-xl"
              }`}
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 bg-white/90 hover:bg-white text-slate-800 rounded-lg text-[10px] font-bold shadow"
                title="Ganti gambar"
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold shadow"
                title="Hapus gambar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 ${
              aspectRatio === "square"
                ? "w-20 h-20 sm:w-24 sm:h-24 rounded-2xl"
                : "w-36 h-20 sm:w-40 sm:h-24 rounded-xl"
            }`}
          >
            <ImageIcon className="w-6 h-6 stroke-1 mb-1" />
            <span className="text-[10px] font-medium">Belum Ada</span>
          </div>
        )}

        {/* Dropzone & Action */}
        <div className="flex-1 w-full space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-xl p-3 text-center transition-all ${
              isDragging
                ? "border-emerald-600 bg-emerald-50/60 text-emerald-800"
                : "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-slate-600"
            }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center gap-2 py-1 text-emerald-800 font-bold text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sedang Mengunggah Gambar...</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 hover:text-emerald-900">
                    Klik untuk Pilih Gambar dari Komputer
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Mendukung JPG, PNG, WEBP (otomatis dikompresi)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status & Badges */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-[10px]">
            {uploadStatus ? (
              <span className="text-emerald-800 font-semibold flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {uploadStatus}
              </span>
            ) : value ? (
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                {isCloudUrl ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Supabase Cloud Storage
                  </span>
                ) : isLocalBase64 ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Gambar Lokal (Base64)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                    URL Eksternal
                  </span>
                )}
                <span>Pratinjau aktif</span>
              </span>
            ) : (
              <span className="text-slate-400 italic">
                {helperText || "Belum ada file dipilih"}
              </span>
            )}

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-600 hover:text-rose-800 font-semibold transition-colors"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
