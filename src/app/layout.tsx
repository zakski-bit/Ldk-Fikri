import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ldk-fikri-pnj.vercel.app"),
  title: "UKM LDK FIKRI PNJ | Portal Resmi & Syiar Kampus Politeknik Negeri Jakarta",
  description:
    "Website resmi Lembaga Dakwah Kampus (LDK) FIKRI Politeknik Negeri Jakarta. Pusat informasi kajian mahasiswa, mentoring PAMI, syiar fikih kampus, dan wakaf pembangunan Masjid Daarul Ilmi PNJ.",
  keywords: [
    "LDK FIKRI PNJ",
    "Politeknik Negeri Jakarta",
    "Masjid Daarul Ilmi PNJ",
    "Pembangunan Masjid PNJ",
    "Wakaf Masjid PNJ",
    "Kajian PNJ",
    "Mentoring PAMI PNJ",
    "Dakwah Kampus PNJ",
    "UKM PNJ",
    "FIKRI PNJ",
  ],
  authors: [{ name: "LDK FIKRI PNJ", url: "https://ldk-fikri-pnj.vercel.app" }],
  openGraph: {
    title: "UKM LDK FIKRI PNJ | Portal Resmi & Syiar Kampus Politeknik Negeri Jakarta",
    description:
      "Website resmi Lembaga Dakwah Kampus (LDK) FIKRI Politeknik Negeri Jakarta. Pusat kajian mahasiswa, mentoring PAMI, syiar fikih kampus, dan wakaf pembangunan Masjid Daarul Ilmi PNJ.",
    url: "https://ldk-fikri-pnj.vercel.app",
    siteName: "LDK FIKRI PNJ",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UKM LDK FIKRI PNJ",
    description: "Portal Resmi & Syiar Kampus Politeknik Negeri Jakarta",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
