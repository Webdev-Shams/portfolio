import { MetadataRoute } from "next";
import { db } from "@/db";
import { projects, researchPosts } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shams.dev";

    const allProjects = await db.select().from(projects);
    const allPosts = await db.select().from(researchPosts);

    const projectUrls = allProjects.map((p) => ({
        url: `${siteUrl}/portfolio/${p.slug}`,
        lastModified: new Date(),
    }));

    const researchUrls = allPosts.map((p) => ({
        url: `${siteUrl}/research/${p.slug}`,
        lastModified: new Date(),
    }));

    const staticUrls = ["", "/portfolio", "/research", "/contact"].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
    }));

    return [...staticUrls, ...projectUrls, ...researchUrls];
}
