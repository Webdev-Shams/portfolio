import { db } from "@/db";
import { researchPosts } from "@/db/schema";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
    title: "Research",
    description: "Technical articles, engineering research, and architectural deep-dives.",
};

export default async function ResearchPage() {
    const allPosts = await db.select().from(researchPosts).orderBy(researchPosts.createdAt);

    return (
        <div className="container section fade-in" style={{ maxWidth: "800px" }}>
            <div style={{ marginBottom: "4rem" }}>
                <h1 style={{ marginBottom: "1rem" }}>Research</h1>
                <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)" }}>
                    Deep-dives into specific technologies, architectural patterns, and production engineering challenges.
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                {allPosts.map((post) => (
                    <article key={post.id} style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "3rem" }}>
                        <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <Calendar size={14} />
                            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </div>
                        <Link href={`/research/${post.slug}`} style={{ textDecoration: "none" }}>
                            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", transition: "color 0.2s" }} className="hover-accent">
                                {post.title}
                            </h2>
                        </Link>
                        <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                            {post.excerpt}
                        </p>
                        <Link href={`/research/${post.slug}`} style={{ color: "var(--color-accent)", fontSize: "0.9375rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                            Read Full Article <ArrowRight size={16} />
                        </Link>
                    </article>
                ))}
            </div>

            <style>{`
        .hover-accent:hover {
          color: var(--color-accent);
        }
      `}</style>
        </div>
    );
}
