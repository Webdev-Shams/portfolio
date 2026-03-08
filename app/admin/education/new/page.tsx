"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { educationSchema } from "@/lib/validations";
import { ArrowLeft, Save } from "lucide-react";

export default function NewEducationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        institution: "",
        degree: "",
        major: "",
        startYear: new Date().getFullYear(),
        endYear: "",
        description: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const dataToValidate = {
            ...formData,
            endYear: formData.endYear ? parseInt(formData.endYear.toString()) : null,
            startYear: parseInt(formData.startYear.toString()),
        };

        const result = educationSchema.safeParse(dataToValidate);
        if (!result.success) {
            setError(result.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/education", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToValidate),
            });
            if (res.ok) {
                router.push("/admin/education");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save education");
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
                <h1>Add Education</h1>
                <button onClick={handleSubmit} disabled={loading} style={{ background: 'var(--color-accent)', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Save size={18} /> {loading ? "Saving..." : "Save Record"}
                </button>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Institution / University</label>
                        <input type="text" className="admin-input" placeholder="e.g. University of Dhaka" value={formData.institution} onChange={e => setFormData(p => ({ ...p, institution: e.target.value }))} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Degree</label>
                        <input type="text" className="admin-input" placeholder="e.g. B.Sc." value={formData.degree} onChange={e => setFormData(p => ({ ...p, degree: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                        <label>Major</label>
                        <input type="text" className="admin-input" placeholder="e.g. Computer Science" value={formData.major} onChange={e => setFormData(p => ({ ...p, major: e.target.value }))} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="admin-field">
                        <label>Start Year</label>
                        <input type="number" className="admin-input" value={formData.startYear} onChange={e => setFormData(p => ({ ...p, startYear: parseInt(e.target.value) }))} />
                    </div>
                    <div className="admin-field">
                        <label>End Year (Optional)</label>
                        <input type="number" className="admin-input" placeholder="e.g. 2024" value={formData.endYear} onChange={e => setFormData(p => ({ ...p, endYear: e.target.value }))} />
                    </div>
                </div>

                <div className="admin-field" style={{ marginBottom: '1rem' }}>
                    <label>Description (Optional)</label>
                    <textarea
                        className="admin-input"
                        rows={4}
                        placeholder="Relevant coursework or activities..."
                        value={formData.description}
                        onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
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
