"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Trash2, Edit, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Post {
    id: string;
    title: string;
    slug: string;
    featured: boolean;
    createdAt: Date;
}

export default function ResearchTable({ posts }: { posts: Post[] }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this research post?")) return;

        setDeleting(id);
        try {
            const res = await fetch(`/api/admin/research/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            alert("An error occurred");
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'var(--color-bg-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                    <tr>
                        <th style={{ padding: '1rem' }}>Title</th>
                        <th style={{ padding: '1rem' }}>Featured</th>
                        <th style={{ padding: '1rem' }}>Created</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '0.875rem' }}>
                    {posts.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: 600 }}>{p.title}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/{p.slug}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                {p.featured ? (
                                    <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                                        <Star size={14} fill="var(--color-accent)" /> Featured
                                    </span>
                                ) : (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>Standard</span>
                                )}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                {new Date(p.createdAt).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                    <Link href={`/research/${p.slug}`} target="_blank" style={{ color: 'var(--color-text-muted)' }} title="View Public"><ExternalLink size={16} /></Link>
                                    <Link href={`/admin/research/${p.id}`} style={{ color: 'var(--color-text-muted)' }} title="Edit"><Edit size={16} /></Link>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        disabled={deleting === p.id}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: deleting === p.id ? 0.5 : 1 }}
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {posts.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                No research posts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
