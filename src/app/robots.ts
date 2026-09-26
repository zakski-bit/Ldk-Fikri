import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ldk-fikri-pnj.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"], // Lindungi dashboard admin agar tidak diindeks publik oleh Google
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
