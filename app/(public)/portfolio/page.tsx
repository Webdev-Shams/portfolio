import { db } from "@/db";
import { projects, categories } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { eq } from "drizzle-orm";

export const metadata = {
    title: "Portfolio",
    description: "Recent engineering projects and case studies.",
};

export default async function PortfolioPage() {
    const allProjects = await db
        .select({
            id: projects.id,
            title: projects.title,
            slug: projects.slug,
            summary: projects.summary,
            primaryImage: projects.primaryImage,
            techStack: projects.techStack,
            categoryName: categories.name,
            categorySlug: categories.slug,
        })
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id))
        .orderBy(projects.createdAt);

    return (
        <div className="container section fade-in">
            <div style={{ marginBottom: "3rem" }}>
                <h1 style={{ marginBottom: "1rem" }}>Portfolio</h1>
                <p style={{ maxWidth: "600px" }}>
                    A collection of production-ready applications, SaaS platforms, and open-source contributions. Each project is a deep-dive into specific engineering challenges.
                </p>
            </div>

            <PortfolioList projects={allProjects} />
        </div>
    );
}

import PortfolioList from "@/components/portfolio/PortfolioList";
