"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, MapPin, Briefcase, GraduationCap, Github, Linkedin, Globe } from "lucide-react";
import { motion } from "framer-motion";

import { BD } from 'country-flag-icons/react/3x2';

export default function HeroSection() {
    return (
        <section
            className="section min-h-[65vh] pt-11! md:pt-25! pb-13! md:pb-25!"
        >
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: "4rem", alignItems: "center" }} className="hero-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >

                        <h1
                            style={{
                                fontSize: "clamp(3.5rem, 8vw, 3.5rem)",
                                fontWeight: 200,
                                lineHeight: 1.08,
                                letterSpacing: "-0.04em",
                                marginBottom: "1.5rem",
                                maxWidth: "800px",
                            }}
                        >
                            <span className="md:hidden">
                                <span style={{ fontWeight: "800" }}>Full Stack <br /> <span style={{ color: "var(--color-accent)" }}>Next.js</span> <br /> Developer</span>
                            </span>
                            <span className="hidden sm:block">
                                <span style={{ fontWeight: "800" }}>Full Stack <span style={{ color: "var(--color-accent)" }}>Next.js</span> Developer</span>
                            </span>

                        </h1>

                        <p
                            style={{
                                fontSize: "clamp(1rem, 2vw, 1rem)",
                                fontWeight: 400,
                                color: "var(--color-text-secondary)",
                                lineHeight: 1.7,
                                marginBottom: "1rem",
                            }}
                        >
                            <strong className="text-white!">2+ years</strong> building <strong className="text-white!">full-stack</strong> SaaS applications with <strong className="text-white!">Next.js</strong>, focused on scalable architecture, performance, and clean system design. As a  <strong className="text-white!">Marketing</strong> graduate, I bring product thinking and user-focused strategy into every build.
                        </p>

                        <div className="flex flex-row flex-wrap gap-2 md:gap-6 pt-2!"
                            style={{
                                marginBottom: "2.5rem",
                                maxWidth: "700px",
                            }}
                        >
                            {[
                                { icon: Briefcase, value: "2+ Years" },
                                { icon: MapPin, value: "Demra, Dhaka, BD", flag: true },
                                { icon: GraduationCap, value: "Marketing Graduate" },
                                { icon: Globe, value: "English & Bengali" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-1 sm:gap-2 py-1 border-b border-border/40 group">
                                    <item.icon size={15} className="text-accent" strokeWidth={1.5} />
                                    <span className="text-sm md:text-xs text-text-secondary font-bold flex items-center gap-2 tracking-wide">
                                        {item.value}
                                        {item.flag && <BD className="w-4 h-auto rounded-[1px] opacity-80" title="Bangladesh" />}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 md:gap-3">
                            <Link href="/portfolio" className="btn-primary rounded-none! font-[600]!">
                                View Projects
                                <ArrowRight size={16} className="hidden sm:inline-block" />
                            </Link>
                            <Link href="/research" className="btn-outline border-white! hover:border-accent! rounded-none! font-[500]!">
                                View Research
                            </Link>
                        </div>
                    </motion.div>

                    <div className="hero-image-container">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ position: "relative" }}
                            className="hero-image-wrapper w-[100%] md:w-[230px] h-[300px]! md:h-[230px]!"
                        >
                            <div className="h-[320px] md:h-[246px]"
                                style={{
                                    position: "absolute",
                                    inset: -10,
                                    border: "1px solid var(--color-accent-dim)",
                                    transform: "rotate(-2deg)",
                                    zIndex: 0,
                                }}
                            />
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    overflow: "hidden",
                                    border: "1px solid var(--color-border)",
                                    zIndex: 1,
                                }}
                                className="h-[300px] md:h-[228px]"
                            >
                                <Image
                                    src="/profile-img.png"
                                    alt="Shams"
                                    fill
                                    priority
                                    className="object-cover sm:object-contain h-auto!"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-image-container { order: -1; }
          .hero-image-wrapper { height: 400px !important; max-width: 400px; margin: 0 auto; }
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-accent);
          color: #000;
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          transition: opacity 0.2s ease, transform 0.15s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--color-text-primary);
          font-weight: 600;
          font-size: 0.9375rem;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          transition: border-color 0.2s ease, color 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-outline:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
      `}</style>
        </section>
    );
}
