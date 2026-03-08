import { db } from "@/db";
import { education } from "@/db/schema";
import { GraduationCap } from "lucide-react";
import { desc } from "drizzle-orm";

export default async function Education() {
    let items: (typeof education.$inferSelect)[] = [];
    try {
        items = await db.select().from(education).orderBy(desc(education.startYear));
    } catch {
        // DB not yet seeded
    }


    const data = items;

    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
                <h2
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        marginBottom: "1.5rem",
                    }}
                >
                    Education
                </h2>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        paddingLeft: "1.5rem",
                    }}
                >
                    {/* Timeline line */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "8px",
                            bottom: "8px",
                            width: "1px",
                            background: "var(--color-border)",
                        }}
                    />

                    {data.map((edu, idx) => (
                        <div
                            key={edu.id}
                            style={{
                                position: "relative",
                                paddingBottom: idx < data.length - 1 ? "2rem" : 0,
                            }}
                        >
                            {/* Dot */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: "-1.875rem",
                                    top: "0.35rem",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    background: idx === 0 ? "var(--color-accent)" : "var(--color-border)",
                                    border: "2px solid var(--color-bg)",
                                }}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    gap: "0.5rem",
                                    marginBottom: "0.35rem",
                                }}
                            >
                                <div>
                                    <h3
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            marginBottom: "0.2rem",
                                        }}
                                    >
                                        {edu.degree}
                                    </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.4rem",
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        <GraduationCap size={14} />
                                        {edu.institution}
                                        <span style={{ color: "var(--color-text-muted)" }}>·</span>
                                        <span>{edu.major}</span>
                                    </div>
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.8125rem",
                                        color: "var(--color-text-muted)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {edu.startYear} — {edu.endYear ?? "Present"}
                                </span>
                            </div>
                            {edu.description && (
                                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                                    {edu.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
