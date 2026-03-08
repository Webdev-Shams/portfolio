"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, Calendar, GraduationCap } from "lucide-react";

export default function PersonalDetails() {
    const details = [
        { label: "Full Name", value: "Shams", icon: <Calendar size={18} /> },
        { label: "Location", value: "Dhaka, BD", icon: <MapPin size={18} /> },
        { label: "Email", value: "hello@shams.dev", icon: <Mail size={18} />, link: "mailto:hello@shams.dev" },
        { label: "Current Focus", value: "Next.js / Full-stack Development", icon: <GraduationCap size={18} /> },
    ];

    const socials = [
        { name: "GitHub", href: "https://github.com", icon: <Github size={20} /> },
        { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={20} /> },
    ];

    return (
        <section className="section">
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="details-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>Personal Details</h2>
                        <p style={{ color: "var(--color-text-secondary)", marginBottom: "2.5rem", maxWidth: "450px" }}>
                            I’m a software engineer who believes in <span className="accent">form following function</span>. Based in Dhaka, I work with global teams to build digital products that are as performant as they are beautiful.
                        </p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card"
                                    style={{ padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem", width: "fit-content" }}
                                >
                                    {social.icon}
                                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}
                    >
                        {details.map((detail, index) => (
                            <div key={index} style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                                    {detail.icon}
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{detail.label}</span>
                                </div>
                                {detail.link ? (
                                    <a href={detail.link} style={{ fontSize: "1rem", fontWeight: 500 }} className="link-hover-accent">{detail.value}</a>
                                ) : (
                                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>{detail.value}</span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .details-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                }
            `}</style>
        </section>
    );
}
