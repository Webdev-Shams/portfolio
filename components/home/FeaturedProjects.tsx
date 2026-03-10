import { db } from "@/db";
import { projects, categories } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { eq } from "drizzle-orm";

export default async function FeaturedProjects() {
    let items: any[] = [];
    try {
        items = await db.select({
            id: projects.id,
            title: projects.title,
            slug: projects.slug,
            summary: projects.summary,
            primaryImage: projects.primaryImage,
            techStack: projects.techStack,
            categoryName: categories.name,
        }).from(projects)
            .leftJoin(categories, eq(projects.categoryId, categories.id))
            .limit(3)
            .orderBy(projects.createdAt);
    } catch {
        // DB not seeded
    }

    const placeholder = [
        {
            id: "1",
            title: "SaaS Analytics Platform",
            slug: "saas-analytics-platform",
            summary: "Real-time analytics dashboard for SaaS products with event tracking, funnel visualization, and cohort analysis.",
            primaryImage: "/placeholder-project.jpg",
            techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Prisma"],
            categoryName: "Next.js",
            createdAt: new Date(),
        },
        {
            id: "2",
            title: "AI Content Generator",
            slug: "ai-content-generator",
            summary: "GPT-4 powered content generation platform with custom fine-tuned models, template system, and team collaboration.",
            primaryImage: "/placeholder-project.jpg",
            techStack: ["Next.js", "OpenAI", "Drizzle ORM", "NeonDB", "Stripe"],
            categoryName: "Next.js",
            createdAt: new Date(),
        },
        {
            id: "3",
            title: "E-Commerce Engine",
            slug: "e-commerce-engine",
            summary: "High-performance multi-vendor e-commerce platform with real-time inventory, payment processing, and seller dashboard.",
            primaryImage: "/placeholder-project.jpg",
            techStack: ["Next.js", "Stripe", "Supabase", "TypeScript", "Vercel"],
            categoryName: "WordPress",
            createdAt: new Date(),
        },
    ];

    const displayItems = items.length ? items : placeholder;

    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <style>{`
                .dNoneDInlineBlock {
                display: none !important;
                }

                @media (min-width: 768px) {
                .dNoneDInlineBlock {
                    display: inline-block !important;
                }
                }
            `}</style>
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.5rem",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--color-text-muted)",
                        }}
                    >
                        Featured Projects
                    </h2>
                    <div
                        className=" dNoneDInlineBlock"
                        style={{ paddingTop: "1rem", textAlign: "center" }}
                    >
                        <Link href="/portfolio" className="btn-outline border-white! hover:border-accent! rounded-none! font-[500]! text-center!"
                            style={{
                                fontSize: "0.8rem",
                            }}
                        >
                            <span className="w-full">View all</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1.25rem",
                    }}
                >
                    {displayItems.map((project) => (
                        <Link
                            key={project.id}
                            href={`/portfolio/${project.slug}`}
                            style={{ textDecoration: "none" }}
                        >
                            <article
                                className="card"
                                style={{
                                    overflow: "hidden",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Image */}
                                <div
                                    style={{
                                        height: "180px",
                                        background: "var(--color-bg-tertiary)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    {project.primaryImage && project.primaryImage !== "/placeholder-project.jpg" ? (
                                        <Image
                                            src={project.primaryImage}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "var(--color-bg-tertiary)",
                                                fontSize: "2rem",
                                                fontWeight: 800,
                                                color: "var(--color-border)",
                                                letterSpacing: "-0.04em",
                                            }}
                                        >
                                            {project.title.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ padding: "1.25rem" }}>
                                    {project.categoryName && (
                                        <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                                            {project.categoryName}
                                        </div>
                                    )}
                                    <h3
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-secondary)",
                                            lineHeight: 1.6,
                                            marginBottom: "1rem",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {project.summary}
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                                        {(project.techStack as string[]).slice(0, 4).map((t) => (
                                            <span key={t} className="tag" style={{ fontSize: "0.7rem" }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                <div
                    className=" md:hidden"
                    style={{ paddingTop: "1rem", textAlign: "center" }}
                >
                    <Link href="/portfolio" className="btn-outline border-white! hover:border-accent! rounded-none! font-[500]! text-center!"
                        style={{
                            fontSize: "0.8rem",
                        }}
                    >
                        <span className="w-full">View all</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
