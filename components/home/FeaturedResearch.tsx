import { db } from "@/db";
import { researchPosts } from "@/db/schema";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { eq, desc } from "drizzle-orm";

export default async function FeaturedResearch() {
    let posts: typeof researchPosts.$inferSelect[] = [];
    try {
        posts = await db.select()
            .from(researchPosts)
            .where(eq(researchPosts.featured, true))
            .orderBy(desc(researchPosts.createdAt))
            .limit(3);
    } catch {
        // DB not seeded
    }

    if (posts.length === 0) return null;

    return (
        <section className="section" style={{ paddingTop: 0 }}>
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
                        Selected Research
                    </h2>
                    <div
                        className=" dNoneDInlineBlock"
                        style={{ paddingTop: "1rem", textAlign: "center" }}
                    >
                        <Link href="/research" className="btn-outline border-white! hover:border-accent! rounded-none! font-[500]! text-center!"
                            style={{
                                fontSize: "0.8rem",
                            }}
                        >
                            <span className="w-full">View all</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/research/${post.slug}`}
                            style={{ textDecoration: "none" }}
                        >
                            <article
                                className="card"
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "1.25rem",
                                    padding: "1.25rem",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                            >
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3
                                        style={{
                                            fontSize: "0.9375rem",
                                            fontWeight: 600,
                                            marginBottom: "0.35rem",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {post.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-muted)",
                                            lineHeight: 1.6,
                                            marginBottom: "0.75rem",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.35rem",
                                            fontSize: "0.85rem",
                                            color: "var(--color-text-muted)",
                                        }}
                                    >
                                        <Calendar size={11} />
                                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </div>
                                </div>
                                <ArrowRight
                                    size={16}
                                    style={{
                                        color: "var(--color-text-muted)",
                                        flexShrink: 0,
                                        marginTop: "0.2rem",
                                    }}
                                />
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
