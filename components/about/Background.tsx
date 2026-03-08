"use client";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";

export default function Background() {
    const focusAreas = [
        {
            title: "Next.js & Full-stack Architecture",
            description: "Building production-ready applications with highly optimized layouts, server-side rendering, and efficient data flow using modern patterns.",
            icon: <Zap className="accent" size={24} />
        },
        {
            title: "Performance & Scalability",
            description: "Implementing advanced caching strategies, database optimization, and CI/CD pipelines to ensure seamless user experiences at scale.",
            icon: <TrendingUp className="accent" size={24} />
        },
        {
            title: "Product-Driven Engineering",
            description: "Leveraging my marketing background to build features that solve real business problems and align with user intent and product goals.",
            icon: <CheckCircle2 className="accent" size={24} />
        }
    ];

    return (
        <section className="section bg-bg-secondary" style={{ background: "var(--color-bg-secondary)", borderRadius: "var(--radius-lg)", margin: "2rem 0" }}>
            <div className="container">
                <div style={{ maxWidth: "900px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                            Professional Background
                        </h2>
                        <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)", marginBottom: "3rem", lineHeight: 1.8 }}>
                            With over <span className="accent">2 years of experience</span> in full-stack development, I’ve transitioned from a Marketing foundation into a technical powerhouse focused on <span className="accent">Next.js and React ecosystems</span>. My unique blend of product-first thinking and engineering rigor allows me to build applications that don't just work, but excel in user engagement and business impact.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                        {focusAreas.map((area, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card"
                                style={{ padding: "2rem", height: "100%" }}
                            >
                                <div style={{ marginBottom: "1.5rem" }}>{area.icon}</div>
                                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", fontWeight: 600 }}>{area.title}</h3>
                                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)" }}>{area.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
