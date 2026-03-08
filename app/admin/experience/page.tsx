import { db } from "@/db";
import { experiences } from "@/db/schema";
import Link from "next/link";
import { Plus } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminExperiencePage() {
    const allExperiences = await db.select().from(experiences).orderBy(experiences.createdAt);

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage Experience</h1>
                <Link href="/admin/experience/new" className="tag" style={{ background: 'var(--color-accent)', color: '#000', fontWeight: 700, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> New Experience
                </Link>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--color-bg-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Company & Role</th>
                            <th style={{ padding: '1rem' }}>Duration</th>
                            <th style={{ padding: '1rem' }}>Type</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.875rem' }}>
                        {allExperiences.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                    No experience records found.
                                </td>
                            </tr>
                        ) : (
                            allExperiences.map((exp) => (
                                <tr key={exp.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 600 }}>{exp.company}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{exp.role}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className="tag" style={{ fontSize: '10px' }}>{exp.employmentType}</span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                            <Link href={`/admin/experience/${exp.id}`} style={{ color: 'var(--color-text-muted)' }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                            </Link>
                                            <DeleteButton id={exp.id} endpoint="experience" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
