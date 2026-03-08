"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { projectSchema } from "@/lib/validations";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Category } from "@/db/schema";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        summary: "",
        description: "",
        problem: "",
        solution: "",
        architecture: "",
        primaryImage: "",
        techStack: "",
        liveUrl: "",
        githubUrl: "",
        categoryId: "",
    });

    useEffect(() => {
        // Fetch categories and project data
        Promise.all([
            fetch("/api/admin/categories").then(res => res.json()),
            fetch(`/api/admin/projects/${id}`).then(res => res.json())
        ]).then(([cats, project]) => {
            setCategories(cats);
            if (project.error) {
                setError(project.error);
            } else {
                setFormData({
                    ...project,
                    techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack || "",
                    categoryId: project.categoryId || "",
                    liveUrl: project.liveUrl || "",
                    githubUrl: project.githubUrl || "",
                });
            }
        }).catch(err => {
            console.error("Failed to load data", err);
            setError("Failed to load data");
        }).finally(() => {
            setFetching(false);
        });
    }, [id]);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: data });
            const result = await res.json();
            if (res.ok) setFormData(prev => ({ ...prev, primaryImage: result.url }));
        } catch { alert("Upload failed"); }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const techStackArray = formData.techStack.split(",").map(t => t.trim()).filter(Boolean);
        const dataToValidate = { ...formData, techStack: techStackArray };

        const result = projectSchema.safeParse(dataToValidate);
        if (!result.success) {
            setError(result.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToValidate),
            });
            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save project");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            }
        } catch { alert("Delete failed"); }
    }

    if (fetching) return <div className="fade-in">Loading project...</div>;

    return (
        <div className="fade-in" style={{ maxWidth: "1000px" }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Edit Project</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleDelete} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 24px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Trash2 size={18} /> Delete
                    </button>
                    <button onClick={handleSubmit} disabled={loading} style={{ background: 'var(--color-accent)', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Title</label>
                        <input type="text" className="admin-input" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Description (Rich Text)</label>
                        <TiptapEditor content={formData.description} onChange={html => setFormData(p => ({ ...p, description: html }))} />
                    </div>
                    <div className="admin-field">
                        <label>Problem Statement</label>
                        <textarea className="admin-input" rows={3} value={formData.problem} onChange={e => setFormData(p => ({ ...p, problem: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>The Solution</label>
                        <textarea className="admin-input" rows={3} value={formData.solution} onChange={e => setFormData(p => ({ ...p, solution: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Architecture Note</label>
                        <textarea className="admin-input" rows={3} value={formData.architecture} onChange={e => setFormData(p => ({ ...p, architecture: e.target.value }))} />
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
                    <div className="admin-field">
                        <label>Slug</label>
                        <input type="text" className="admin-input" value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Short Summary</label>
                        <textarea className="admin-input" rows={2} value={formData.summary} onChange={e => setFormData(p => ({ ...p, summary: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Category</label>
                        <select className="admin-input" value={formData.categoryId} onChange={e => setFormData(p => ({ ...p, categoryId: e.target.value }))}>
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label>Tech Stack (comma separated)</label>
                        <input type="text" className="admin-input" placeholder="Next.js, TypeScript, Drizzle" value={formData.techStack} onChange={e => setFormData(p => ({ ...p, techStack: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Primary Image</label>
                        <input type="file" onChange={handleImageUpload} style={{ display: 'block', marginBottom: '8px' }} />
                        {formData.primaryImage && <img src={formData.primaryImage} style={{ width: '100%', borderRadius: '4px' }} />}
                    </div>
                    <div className="admin-field">
                        <label>URLs</label>
                        <input type="text" placeholder="Live Demo URL" className="admin-input" style={{ marginBottom: '8px' }} value={formData.liveUrl} onChange={e => setFormData(p => ({ ...p, liveUrl: e.target.value }))} />
                        <input type="text" placeholder="GitHub URL" className="admin-input" value={formData.githubUrl} onChange={e => setFormData(p => ({ ...p, githubUrl: e.target.value }))} />
                    </div>
                    {error && <p style={{ color: "#ef4444", fontSize: "13px" }}>{error}</p>}
                </div>
            </div>

            <style>{`
        .admin-field { display: flex; flex-direction: column; gap: 8px; }
        .admin-field label { font-size: 13px; font-weight: 600; color: var(--color-text-secondary); }
        .admin-input { background: var(--color-bg-secondary); border: 1px solid var(--color-border); padding: 10px; border-radius: 6px; color: #fff; outline: none; }
        .admin-input:focus { border-color: var(--color-accent); }
      `}</style>
        </div>
    );
}
