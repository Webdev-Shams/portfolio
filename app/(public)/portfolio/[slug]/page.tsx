import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const project = await db.query.projects.findFirst({
        where: eq(projects.slug, slug),
    });

    if (!project) return { title: "Project Not Found" };

    return {
        title: project.title,
        description: project.summary,
    };
}

export default async function ProjectSinglePage({ params }: Props) {
    const { slug } = await params;
    const project = await db.query.projects.findFirst({
        where: eq(projects.slug, slug),
    });

    if (!project) notFound();

    return (
        <div className="container section fade-in" style={{ maxWidth: "900px" }}>
            <Link
                href="/portfolio"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "2rem",
                    fontSize: "0.875rem",
                }}
            >
                <ArrowLeft size={16} /> Back to Portfolio
            </Link>

            <h1 style={{ marginBottom: "1rem" }}>{project.title}</h1>
            <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
                {project.summary}
            </p>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="tag" style={{ background: "var(--color-accent)", color: "#000", fontWeight: 600 }}>
                        Live Demo <ExternalLink size={14} style={{ marginLeft: "4px" }} />
                    </a>
                )}
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="tag">
                        <Github size={14} style={{ marginRight: "4px" }} /> GitHub
                    </a>
                )}
            </div>

            <div
                style={{
                    width: "100%",
                    height: "450px",
                    background: "var(--color-bg-secondary)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    marginBottom: "4rem",
                }}
            >
                <Image
                    src={project.primaryImage}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <div style={{ display: "grid", gap: "3rem" }}>
                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Overview</h2>
                    <div className="research-content" dangerouslySetInnerHTML={{ __html: project.description }} />
                </section>

                <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    <div>
                        <h3 style={{ marginBottom: "0.75rem" }}>The Problem</h3>
                        <p style={{ color: "var(--color-text-secondary)" }}>{project.problem}</p>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: "0.75rem" }}>The Solution</h3>
                        <p style={{ color: "var(--color-text-secondary)" }}>{project.solution}</p>
                    </div>
                </section>

                <section>
                    <h3 style={{ marginBottom: "1rem" }}>Architecture</h3>
                    <p style={{ color: "var(--color-text-secondary)", whiteSpace: "pre-wrap" }}>{project.architecture}</p>
                </section>

                <section>
                    <h3 style={{ marginBottom: "1rem" }}>Tech Stack</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                        {(project.techStack as string[]).map((tech) => (
                            <span key={tech} className="tag" style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>{tech}</span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
