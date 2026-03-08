"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Briefcase, GraduationCap, Github, Linkedin, Globe } from "lucide-react";
import { BD } from 'country-flag-icons/react/3x2';

export default function AboutHeader() {
    return (
        <section className="section bg-bg" style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_270px] gap-16 lg:gap-24 items-center">
                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-10"
                    >
                        <div className="space-y-6">
                            <h1
                                style={{
                                    fontSize: "clamp(2.5rem, 8vw, 3.9rem)",
                                    fontWeight: 200,
                                    lineHeight: 1.08,
                                    letterSpacing: "-0.04em",
                                    color: "var(--color-text-primary)"
                                }}
                            >
                                I am <span style={{ fontWeight: 600 }} className="accent">Shams</span>.
                            </h1>
                            <p
                                style={{
                                    fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
                                    fontWeight: 300,
                                    color: "var(--color-text-secondary)",
                                    lineHeight: 1.7,
                                    maxWidth: "750px"
                                }}
                            >
                                A <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Full-Stack Developer</span> blending technical expertise with marketing strategy to build products that people actually want to use.
                            </p>
                        </div>

                        {/* Personal Details - Thin & Minimalist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-2xl">
                            {[
                                { icon: Briefcase, value: "2+ Years in Dev" },
                                { icon: MapPin, value: "Dhaka, BD", flag: true },
                                { icon: GraduationCap, value: "Marketing Graduate" },
                                { icon: Globe, value: "English & Bengali" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 py-1 border-b border-border/40 group">
                                    <item.icon size={15} className="text-text-muted group-hover:text-accent transition-colors" strokeWidth={1.5} />
                                    <span className="text-sm text-text-secondary font-[200] flex items-center gap-2 tracking-wide">
                                        {item.value}
                                        {item.flag && <BD className="w-4 h-auto rounded-[1px] opacity-80" title="Bangladesh" />}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Social Links - Minimal icons */}
                        <div className="flex gap-6 mt-4">
                            {[
                                { icon: Github, href: "https://github.com", label: "GitHub" },
                                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                                { icon: Mail, href: "mailto:hello@shams.dev", label: "Email" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-muted hover:text-accent transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={17} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Column - Styled like HeroSection */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                        style={{ height: "230px", width: "230px" }}
                    >
                        {/* Rotated decorative border from Hero style */}
                        <div
                            style={{
                                position: "absolute",
                                inset: -10,
                                border: "1px solid var(--color-accent-dim)",
                                transform: "rotate(-3deg)",
                                zIndex: 0,
                                borderRadius: "2px"
                            }}
                        />
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                border: "1px solid var(--color-border)",
                                zIndex: 1,
                                backgroundColor: "var(--color-bg-secondary)"
                            }}
                        >
                            <Image
                                src="/profile-img.png"
                                alt="Shams"
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>

                        {/* Status Dot */}
                        <div className="absolute -top-1 -right-1 z-10 w-3 h-3 bg-accent rounded-full border-2 border-bg shadow-[0_0_10px_rgba(180,240,0,0.4)]">
                            <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-75"></span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
