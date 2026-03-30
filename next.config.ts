import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    serverExternalPackages: ["sharp"],
    // ─── HTTP Cache Headers ────────────────────────────────────────────
    // Public pages get long-lived stale-while-revalidate headers so the
    // browser and CDN serve them instantly on repeat visits.
    async headers() {
        return [
            {
                // Static assets – immutable for 1 year
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Homepage
                source: "/",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=3600, stale-while-revalidate=86400",
                    },
                ],
            },
            {
                // Public pages: about, contact, portfolio, research
                source: "/(about|contact|portfolio|research)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=3600, stale-while-revalidate=86400",
                    },
                ],
            },
            {
                // Portfolio sub-pages (dynamic project slugs)
                source: "/portfolio/:slug*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=1800, stale-while-revalidate=43200",
                    },
                ],
            },
            {
                // Research sub-pages
                source: "/research/:slug*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=1800, stale-while-revalidate=43200",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
