"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { researchPostSchema } from "@/lib/validations";
import { ArrowLeft, Save, Upload, Link as LinkIcon } from "lucide-react";

export default function NewResearchPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        primaryImage: "",
        featured: false,
    });

    const [useUpload, setUseUpload] = useState(true);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            if (res.ok) {
                setFormData(prev => ({ ...prev, primaryImage: result.url }));
            } else {
                alert(result.error);
            }
        } catch {
            alert("Upload failed");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = researchPostSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/research", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/research");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save post");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fade-in" style={{ maxWidth: "1000px" }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem', fontSize: '14px' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1>Create Research Post</h1>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        background: 'var(--color-accent)',
                        color: '#000',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <Save size={18} /> {loading ? "Saving..." : "Publish Post"}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Post Title"
                            className="admin-input"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <TiptapEditor
                            content={formData.content}
                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                            placeholder="Describe your research in technical detail..."
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
                    <div className="form-group">
                        <label>Slug</label>
                        <input
                            type="text"
                            placeholder="post-slug"
                            className="admin-input"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        />
                    </div>

                    <div className="form-group">
                        <label>Excerpt</label>
                        <textarea
                            rows={4}
                            placeholder="Brief summary..."
                            className="admin-input"
                            style={{ resize: 'none' }}
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        />
                    </div>

                    <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', background: 'var(--color-bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-accent)' }}
                        />
                        <label htmlFor="featured" style={{ margin: 0, cursor: 'pointer' }}>Featured Research</label>
                    </div>

                    <div className="form-group">
                        <label>Primary Image</label>
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                            <button
                                type="button"
                                onClick={() => setUseUpload(true)}
                                style={{ flex: 1, padding: "6px", fontSize: "12px", background: useUpload ? "var(--color-bg-secondary)" : "none", border: "1px solid var(--color-border)", borderRadius: "4px", color: useUpload ? "#fff" : "var(--color-text-muted)", cursor: "pointer" }}
                            >
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => setUseUpload(false)}
                                style={{ flex: 1, padding: "6px", fontSize: "12px", background: !useUpload ? "var(--color-bg-secondary)" : "none", border: "1px solid var(--color-border)", borderRadius: "4px", color: !useUpload ? "#fff" : "var(--color-text-muted)", cursor: "pointer" }}
                            >
                                URL
                            </button>
                        </div>

                        {useUpload ? (
                            <div style={{ position: "relative" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                                />
                                <div style={{ border: "2px dashed var(--color-border)", borderRadius: "8px", padding: "1.5rem", textAlign: "center", pointerEvents: "none" }}>
                                    <Upload size={24} style={{ margin: "0 auto 8px" }} className="accent" />
                                    <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{formData.primaryImage ? "Image Uploaded" : "Click to select"}</span>
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder="https://..."
                                className="admin-input"
                                value={formData.primaryImage}
                                onChange={(e) => setFormData(prev => ({ ...prev, primaryImage: e.target.value }))}
                            />
                        )}

                        {formData.primaryImage && (
                            <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', height: '180px' }}>
                                <img src={formData.primaryImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    {error && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "1rem" }}>{error}</p>}
                </div>
            </div>

            <style>{`
        .form-group { display: flex; flexDirection: column; gap: 8px; }
        .form-group label { font-size: 13px; font-weight: 600; color: var(--color-text-secondary); }
        .admin-input {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 10px;
          border-radius: 6px;
          color: #fff;
          outline: none;
          font-family: inherit;
        }
        .admin-input:focus { border-color: var(--color-accent); }
      `}</style>
        </div>
    );
}
