import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
                <div
                    style={{
                        background: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "12px",
                        padding: "3.5rem 2.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "1.5rem",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Accent dot */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-40px",
                            right: "-40px",
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            background: "var(--color-accent-dim)",
                            filter: "blur(60px)",
                        }}
                    />

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-accent)",
                        }}
                    >
                        <span
                            style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "var(--color-accent)",
                                display: "inline-block",
                            }}
                        />
                        Open to Opportunities
                    </div>

                    <h2
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            maxWidth: "500px",
                            lineHeight: 1.2,
                        }}
                    >
                        Let&apos;s build something
                        <br />
                        <span style={{ color: "var(--color-accent)" }}>remarkable</span> together.
                    </h2>

                    <p
                        style={{
                            fontSize: "1rem",
                            color: "var(--color-text-secondary)",
                            maxWidth: "420px",
                            lineHeight: 1.7,
                        }}
                    >
                        Whether you have a product to build, a team to join, or a
                        problem to solve — I&apos;m interested in hearing about it.
                    </p>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Link
                            href="/contact"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                background: "var(--color-accent)",
                                color: "#000",
                                fontWeight: 700,
                                fontSize: "0.9375rem",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "6px",
                                textDecoration: "none",
                                transition: "opacity 0.2s ease",
                            }}
                        >
                            <Mail size={16} />
                            Get in Touch
                        </Link>
                        <Link
                            href="/portfolio"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                background: "transparent",
                                color: "var(--color-text-primary)",
                                fontWeight: 600,
                                fontSize: "0.9375rem",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "6px",
                                border: "1px solid var(--color-border)",
                                textDecoration: "none",
                                transition: "border-color 0.2s ease",
                            }}
                        >
                            View Work <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
