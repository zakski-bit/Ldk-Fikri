# LDK FIKRI PNJ — Campus Outreach & Organizational Web Portal

Official campus ministry and organization web portal for **Lembaga Dakwah Kampus (LDK) FIKRI Politeknik Negeri Jakarta**. Engineered with **Next.js 15 (React 19 App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth & Storage)**.

[![Next.js](https://img.shields.io/badge/Next.js-15.x%20App%20Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%203.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%26%20Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Portal-black?style=flat&logo=vercel)](https://ldk-fikri-pnj.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Live Deployment

- **Official Web Portal**: [https://ldk-fikri-pnj.vercel.app](https://ldk-fikri-pnj.vercel.app)

## Core Capabilities & Modules

- **Campus Outreach & Prayer Schedules**: Dynamic prayer time synchronization, daily hadith feeds, and contextual campus articles rendered via React Server Components.
- **Mosque Endowment (Waqf) Engine**: Financial transparency reporting for the Daarul Ilmi Mosque project, interactive waqf calculators, official Bank Syariah Indonesia (BSI) payment parameters, and interactive QRIS payment integration.
- **Academic Mentoring Registration**: Digital registration portal for Islamic Academic Mentoring (PAMI), seminar announcements, and leadership training programs.
- **Administrative CMS**: Role-based back-office dashboard powered by Supabase for incoming donation verification, article publication, and organization inventory oversight.
- **Enterprise Performance**: Server-side rendering (SSR) and edge-cached static generation achieving 95+ performance metrics on Google Lighthouse.

## Technical Architecture

```
src/
├── app/                       # Next.js 15 App Router pages & server layouts
│   ├── admin/                 # Protected management dashboard
│   ├── profil/                # Organization heritage & executive directory
│   ├── syiar/                 # Articles, prayer schedules & hadith feeds
│   └── wakaf/                 # Mosque construction & waqf calculator
├── components/                # Modular UI primitives (Navbar, Footer, Modals)
├── data/                      # Structured schemas & mock datasets
└── lib/                       # Supabase client instances & state stores
```

## Quickstart

### Prerequisites

- Node.js 18.18+ or 20+
- npm or pnpm
- Supabase project URL and anon API key

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/zakski-bit/Ldk-Fikri.git
   cd Ldk-Fikri
   npm install
   ```

2. Configure environment variables:
   Create `.env.local`:
   ```ini
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Access `http://localhost:3000` in your browser.

4. Build production bundle:
   ```bash
   npm run build
   npm run start
   ```

## License

MIT License. See [LICENSE](LICENSE) for details.
