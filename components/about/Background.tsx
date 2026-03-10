"use client";
import { motion } from "framer-motion";
import { BookOpen, Clock, GraduationCap } from "lucide-react";
import Education from "../home/Education";

export default function Background() {

    return (
        <section className="section" style={{ borderRadius: "var(--radius-lg)", margin: "2rem 0" }}>
            <div className="container">
                <div style={{}}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
                            Background
                        </h2>


                        <style>{`
                                    .w-100-w-50 {
                                    width: 100%;
                                    }
                                    @media (max-width: 768px) {
                                    .w-100-w-50 {
                                    width: 50%;
                                    }
                                    }
                                `}</style>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-100-w-50"
                                style={{
                                    background: "var(--color-bg-secondary)",
                                    border: "1px solid var(--color-border)",
                                    padding: "2rem",
                                    position: "relative",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.25rem",
                                    height: "100%",
                                }}
                            >

                                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.7rem" }}>
                                    Professional
                                </h2>
                                <p
                                    style={{
                                        fontSize: "clamp(1rem, 2vw, 1rem)",
                                        fontWeight: 400,
                                        color: "var(--color-text-secondary)",
                                        lineHeight: 1.7,
                                        marginBottom: "1rem",
                                    }}
                                >
                                    I have over <span className="accent">3+ years</span> of experience across frontend and full-stack web development. I began my career focusing on frontend engineering, building responsive and user-focused interfaces with modern JavaScript frameworks.
                                    <br />
                                    <br />

                                    Over time, I expanded into full-stack development, working with technologies like Next.js, Laravel, and WordPress to build scalable web applications and SaaS platforms. Today, my primary focus is building modern SaaS products with Next.js, emphasizing performance, clean architecture, and thoughtful user experience.
                                </p>
                            </div>
                            <div className="w-100-w-50"
                                style={{
                                    background: "var(--color-bg-secondary)",
                                    border: "1px solid var(--color-border)",
                                    padding: "2rem",
                                    position: "relative",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.25rem",
                                }}
                            >
                                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.7rem" }}>
                                    Educational
                                </h2>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                        }}
                                    >

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
                                                    Master of Business Administration (MBA)
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
                                                    <GraduationCap size={16} />
                                                    Jashore University of Science and Technology
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                        fontSize: "0.875rem",
                                                        color: "var(--color-text-secondary)",
                                                    }}
                                                >
                                                    <BookOpen size={16} />
                                                    Marketing
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                        fontSize: "0.875rem",
                                                        color: "var(--color-text-secondary)",
                                                    }}
                                                >
                                                    <Clock size={14} />
                                                    2023 — 2025
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                        }}
                                    >

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
                                                    Bachelor of Business Administration (BBA)

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
                                                    <GraduationCap size={16} />
                                                    Jashore University of Science and Technology
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                        fontSize: "0.875rem",
                                                        color: "var(--color-text-secondary)",
                                                    }}
                                                >
                                                    <BookOpen size={16} />
                                                    Marketing
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                        fontSize: "0.875rem",
                                                        color: "var(--color-text-secondary)",
                                                    }}
                                                >
                                                    <Clock size={14} />
                                                    2019 — 2021
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
