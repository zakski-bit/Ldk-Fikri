"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, MapPin, Moon, Sun, Sunrise, Sunset, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PrayerSchedule {
  name: string;
  arabic: string;
  time: string;
  icon: LucideIcon;
}

const prayers: PrayerSchedule[] = [
  { name: "Subuh", arabic: "الفجر", time: "04:35", icon: Sunrise },
  { name: "Terbit", arabic: "الشروق", time: "05:48", icon: Sun },
  { name: "Dzuhur", arabic: "الظهر", time: "11:55", icon: Sun },
  { name: "Ashar", arabic: "العصر", time: "15:08", icon: Sun },
  { name: "Maghrib", arabic: "المغرب", time: "17:58", icon: Sunset },
  { name: "Isya", arabic: "العشاء", time: "19:07", icon: Moon },
];

export default function PrayerTimesWidget() {
  const [nextPrayer, setNextPrayer] = useState<{ name: string; timeLeft: string }>({
    name: "Dzuhur",
    timeLeft: "--:--",
  });

  const updateTime = useCallback(() => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentInMinutes = currentHours * 60 + currentMinutes;

    for (const p of prayers) {
      if (p.name === "Terbit") continue;
      const [h, m] = p.time.split(":").map(Number);
      const pInMinutes = h * 60 + m;
      if (pInMinutes > currentInMinutes) {
        const diffMinutes = pInMinutes - currentInMinutes;
        const hrs = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        setNextPrayer({
          name: p.name,
          timeLeft: hrs > 0 ? `${hrs} jam ${mins} menit` : `${mins} menit`,
        });
        return;
      }
    }

    // If passed Isha, next is Subuh tomorrow
    setNextPrayer({
      name: "Subuh",
      timeLeft: "Menjelang Fajar",
    });
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 30000); // update every 30s, not every 1s
    return () => clearInterval(interval);
  }, [updateTime]);

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-lg border border-emerald-800/60 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-emerald-700/15 blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-800/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/20 flex items-center justify-center text-amber-300">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Jadwal Sholat Kampus</h3>
            <p className="text-[10px] text-emerald-300/70 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-amber-400" />
              Masjid Darul Ilmi PNJ, Depok
            </p>
          </div>
        </div>

        {/* Next Prayer Countdown */}
        <div className="flex items-center gap-2 bg-emerald-800/50 border border-emerald-700/50 px-3 py-1.5 rounded-xl">
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold tracking-wider text-amber-300 block">
              {nextPrayer.name}
            </span>
            <span className="text-xs font-bold text-white">
              {nextPrayer.timeLeft}
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400">
            <Bell className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Prayer Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4">
        {prayers.map((prayer) => {
          const isNext = prayer.name === nextPrayer.name;
          const Icon = prayer.icon;

          return (
            <div
              key={prayer.name}
              className={`p-2.5 rounded-xl text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                isNext
                  ? "bg-gradient-to-b from-amber-500/20 to-amber-600/10 border border-amber-400/60 shadow-md shadow-amber-500/10"
                  : "bg-emerald-900/30 border border-emerald-800/30 hover:bg-emerald-900/50"
              }`}
            >
              <div className="flex items-center justify-between w-full px-0.5">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isNext ? "text-amber-400" : "text-emerald-400/70"
                  }`}
                />
                <span className="text-[10px] font-arabic text-emerald-300/60">
                  {prayer.arabic}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold tracking-wide ${
                  isNext ? "text-amber-300 font-bold" : "text-emerald-200/80"
                }`}
              >
                {prayer.name}
              </span>
              <span className="text-sm font-extrabold tracking-tight text-white">
                {prayer.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
