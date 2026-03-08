import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shams.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shams — Full-Stack Next.js Developer",
    template: "%s | Shams",
  },
  description:
    "I build scalable SaaS applications and AI-powered web platforms with performance, security, and clean architecture in mind.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "SaaS",
    "React",
    "Node.js",
    "Web Development",
  ],
  authors: [{ name: "Shams" }],
  creator: "Shams",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Shams",
    title: "Shams — Full-Stack Next.js Developer",
    description:
      "I build scalable SaaS applications and AI-powered web platforms with performance, security, and clean architecture in mind.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shams — Full-Stack Next.js Developer",
    description:
      "I build scalable SaaS applications and AI-powered web platforms with performance, security, and clean architecture in mind.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shams",
  jobTitle: "Full-Stack Next.js Developer",
  description:
    "I build scalable SaaS applications and AI-powered web platforms with performance, security, and clean architecture in mind.",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
