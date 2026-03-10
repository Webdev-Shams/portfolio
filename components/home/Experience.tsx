import { db } from "@/db";
import { experiences } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Calendar, Briefcase, Building2, Circle } from "lucide-react";

export default async function Experience() {
    let allExperiences: typeof experiences.$inferSelect[] = [];

    try {
        allExperiences = await db
            .select()
            .from(experiences)
            .orderBy(desc(experiences.isCurrent), desc(experiences.createdAt));
    } catch {
        // Fallback
    }

    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
                        gap: "2rem 1rem",
                        alignItems: "start"
                    }}>
                        {allExperiences.map((exp, index) => {
                            const isFirstPast = !exp.isCurrent && (index === 0 || allExperiences[index - 1].isCurrent);
                            const isFirstCurrent = exp.isCurrent && index === 0;

                            return (
                                <div key={exp.id} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    {(isFirstCurrent || isFirstPast) && (
                                        <h2
                                            style={{
                                                fontSize: "0.85rem",
                                                fontWeight: 600,
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                color: "var(--color-text-muted)",
                                                marginBottom: "0.25rem"
                                            }}
                                        >
                                            {exp.isCurrent ? "Current Position" : "Past Experience"}
                                        </h2>
                                    )}

                                    <div
                                        style={{
                                            background: "var(--color-bg-secondary)",
                                            border: exp.isCurrent ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                                            padding: "2rem",
                                            position: "relative",
                                            overflow: "hidden",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "1.25rem",
                                            height: "100%",
                                        }}
                                    >


                                        <div>
                                            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                                                {exp.role}
                                            </h3>
                                            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "0.25rem 1.25rem" }}>
                                                <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <Building2 size={16} />
                                                    {exp.company}
                                                </span>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1rem", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                                        <Briefcase size={14} />
                                                        {exp.employmentType}
                                                    </span>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                                        <Calendar size={14} />
                                                        {exp.startDate} — {exp.endDate ?? "Present"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {exp.responsibilities && (
                                            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none" }}>
                                                {exp.responsibilities.split("\n").filter(Boolean).map((resp, i) => (
                                                    <li key={i} style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6, display: "flex", gap: "0.75rem" }}>
                                                        <span style={{ marginTop: "0.2rem", flexShrink: 0 }}>
                                                            <Circle size={8} fill={exp.isCurrent ? "var(--color-accent)" : "currentColor"} style={{ marginTop: "0.2rem", color: exp.isCurrent ? "var(--color-accent)" : "var(--color-text-muted)" }} />
                                                        </span>
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                                            {(exp.techStack as string[]).map((tech) => (
                                                <span key={tech} className="tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
