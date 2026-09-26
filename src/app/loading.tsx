export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wide">
          Memuat halaman LDK FIKRI PNJ...
        </span>
      </div>
    </div>
  );
}
