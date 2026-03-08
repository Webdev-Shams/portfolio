import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shams.dev";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/logintoadmin/", "/api/admin/"],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
