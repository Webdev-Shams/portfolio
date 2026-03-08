"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { experienceSchema } from "@/lib/validations";
import { ArrowLeft, Save } from "lucide-react";

export default function NewExperiencePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        employmentType: "Full-time",
        startDate: "",
        endDate: "",
        isCurrent: false,
        responsibilities: "",
        techStack: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const techStackArray = formData.techStack.split(",").map(t => t.trim()).filter(Boolean);
        const dataToValidate = {
            ...formData,
            techStack: techStackArray,
            endDate: formData.isCurrent ? null : formData.endDate
        };

        const result = experienceSchema.safeParse(dataToValidate);
        if (!result.success) {
            setError(result.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/experience", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToValidate),
            });
            if (res.ok) {
                router.push("/admin/experience");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save experience");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fade-in" style={{ maxWidth: "800px" }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Add Experience</h1>
                <button onClick={handleSubmit} disabled={loading} style={{ background: 'var(--color-accent)', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Save size={18} /> {loading ? "Saving..." : "Save Record"}
                </button>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Company</label>
                        <input type="text" className="admin-input" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Role</label>
                        <input type="text" className="admin-input" value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Employment Type</label>
                        <select className="admin-input" value={formData.employmentType} onChange={e => setFormData(p => ({ ...p, employmentType: e.target.value }))}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                    <div className="admin-field">
                        <label>Tech Stack (comma separated)</label>
                        <input type="text" className="admin-input" placeholder="Next.js, Drizzle, GSAP" value={formData.techStack} onChange={e => setFormData(p => ({ ...p, techStack: e.target.value }))} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Start Date</label>
                        <input type="text" className="admin-input" placeholder="e.g. Jan 2024" value={formData.startDate} onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>End Date</label>
                        <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Present or Dec 2024"
                            disabled={formData.isCurrent}
                            value={formData.isCurrent ? "Present" : formData.endDate}
                            onChange={e => setFormData(p => ({ ...p, endDate: e.target.value }))}
                        />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', cursor: 'pointer', fontSize: '12px' }}>
                            <input type="checkbox" checked={formData.isCurrent} onChange={e => setFormData(p => ({ ...p, isCurrent: e.target.checked }))} /> I currently work here
                        </label>
                    </div>
                </div>

                <div className="admin-field" style={{ marginBottom: '1rem' }}>
                    <label>Responsibilities & Achievements</label>
                    <textarea
                        className="admin-input"
                        rows={6}
                        placeholder="• Built a SaaS platform using Next.js&#10;• Optimized database queries by 40%..."
                        value={formData.responsibilities}
                        onChange={e => setFormData(p => ({ ...p, responsibilities: e.target.value }))}
                    />
                </div>

                {error && <p style={{ color: "#ef4444", fontSize: "13px" }}>{error}</p>}
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
