import { db } from "@/db";
import { projects, categories } from "@/db/schema";
import Link from "next/link";
import { Plus, ExternalLink, Trash2, Edit } from "lucide-react";
import { eq } from "drizzle-orm";

export default async function AdminProjectsPage() {
    const allProjects = await db
        .select({
            id: projects.id,
            title: projects.title,
            slug: projects.slug,
            techStack: projects.techStack,
            createdAt: projects.createdAt,
            categoryName: categories.name,
        })
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id))
        .orderBy(projects.createdAt);

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage Projects</h1>
                <Link href="/admin/projects/new" className="tag" style={{ background: 'var(--color-accent)', color: '#000', fontWeight: 700, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> New Project
                </Link>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--color-bg-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Title</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Tech Stack</th>
                            <th style={{ padding: '1rem' }}>Created</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.875rem' }}>
                        {allProjects.map((p) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/{p.slug}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span className="tag" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-accent)' }}>
                                        {p.categoryName || "Uncategorized"}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {(p.techStack as string[]).slice(0, 3).map(t => <span key={t} className="tag" style={{ fontSize: '10px' }}>{t}</span>)}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                        <Link href={`/admin/projects/${p.id}`} style={{ color: 'var(--color-text-muted)' }}><Edit size={16} /></Link>
                                        <Link href={`/portfolio/${p.slug}`} target="_blank" style={{ color: 'var(--color-text-muted)' }}><ExternalLink size={16} /></Link>
                                        <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
