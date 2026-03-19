import { db } from "@/db";
import { researchPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import sanitizeHtml from "sanitize-html";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = await db.query.researchPosts.findFirst({
        where: eq(researchPosts.slug, slug),
    });

    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            images: [post.primaryImage],
        },
    };
}

export default async function ResearchSinglePage({ params }: Props) {
    const { slug } = await params;
    const post = await db.query.researchPosts.findFirst({
        where: eq(researchPosts.slug, slug),
    });

    if (!post) notFound();

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(post.content);

    return (
        <div className="container section fade-in" style={{ maxWidth: "800px" }}>
            <Link
                href="/research"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "3rem",
                    fontSize: "0.875rem",
                }}
            >
                <ArrowLeft size={16} /> Back to Research
            </Link>

            <header style={{ marginBottom: "4rem" }}>
                <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <Calendar size={14} />
                    {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <h1 style={{ fontSize: "3rem", lineHeight: 1.1, marginBottom: "2rem" }}>{post.title}</h1>
                {post.primaryImage && (
                    <div style={{ width: "100%", height: "400px", position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                        <img src={post.primaryImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                )}
            </header>

            <div className="research-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

            <footer style={{ marginTop: "5rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
                <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>
                    Thank you for reading. If you have any questions or feedback about this research, feel free to reach out.
                </p>
            </footer>
        </div>
    );
}
