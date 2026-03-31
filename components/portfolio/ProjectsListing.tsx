"use client";

// Client-side portfolio list with filtering and animation support
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    slug: string;
    summary: string;
    primaryImage: string;
    techStack: string[];
    categoryName: string | null;
    categorySlug: string | null;
}

export default function ProjectsListing({ projects }: { projects: any[] }) {
    const [filter, setFilter] = useState("all");

    const categories = ["all", ...Array.from(new Set(projects.map(p => p.categorySlug).filter(Boolean)))];
    const categoryNames: Record<string, string> = { all: "All Projects" };
    projects.forEach(p => {
        if (p.categorySlug && p.categoryName) {
            categoryNames[p.categorySlug] = p.categoryName;
        }
    });

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.categorySlug === filter);

    return (
        <div>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`tag ${filter === cat ? "active" : ""}`}
                        style={{
                            cursor: "pointer",
                            background: filter === cat ? "var(--color-accent)" : "transparent",
                            color: filter === cat ? "#000" : "var(--color-text-secondary)",
                            border: `1px solid ${filter === cat ? "var(--color-accent)" : "var(--color-border)"}`,
                            padding: "8px 20px",
                            borderRadius: "100px",
                            fontWeight: 600,
                            transition: "all 0.3s ease"
                        }}
                    >
                        {categoryNames[cat as string]}
                    </button>
                ))}
            </div>

            <motion.div
                layout
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "2rem",
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={`/portfolio/${project.slug}`}
                                style={{ textDecoration: "none" }}
                            >
                                <article
                                    className="card"
                                    style={{
                                        overflow: "hidden",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "transform 0.3s ease, border-color 0.3s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "220px",
                                            background: "var(--color-bg-tertiary)",
                                            position: "relative",
                                            borderBottom: "1px solid var(--color-border)",
                                        }}
                                    >
                                        {project.primaryImage && (
                                            <Image
                                                src={project.primaryImage}
                                                alt={project.title}
                                                fill
                                                quality={50}
                                                sizes="(max-width: 768px) 100vw, 300px"
                                                style={{ objectFit: "cover", objectPosition: "top" }}
                                                priority
                                            />
                                        )}
                                    </div>
                                    <div style={{ padding: "1.5rem", flex: 1 }}>
                                        {project.categoryName && (
                                            <div style={{
                                                fontSize: "0.85rem",
                                                fontWeight: 700,
                                                color: "var(--color-accent)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em",
                                                marginBottom: "0.5rem"
                                            }}>
                                                {project.categoryName}
                                            </div>
                                        )}
                                        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                                            {project.title}
                                        </h2>
                                        <p
                                            style={{
                                                fontSize: "0.9375rem",
                                                color: "var(--color-text-secondary)",
                                                marginBottom: "1.5rem",
                                            }}
                                        >
                                            {project.summary}
                                        </p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                            {(project.techStack as string[]).map((tag: string) => (
                                                <span key={tag} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
