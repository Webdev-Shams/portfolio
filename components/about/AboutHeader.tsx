"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { BD } from 'country-flag-icons/react/3x2';
import Link from "next/link";
import { ArrowRight, Briefcase, Globe, GraduationCap, MapPin } from "lucide-react";

export default function AboutHeader() {
    return (
        <section
            className="section pt-11! md:pt-25! pb-13! md:pb-25!"
            style={{
                backgroundColor: "var(--color-bg-secondary)",
            }}
        >
            <div className="container">
                <div className="">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <h1
                            style={{
                                fontSize: "clamp(3.5rem, 8vw, 3.5rem)",
                                fontWeight: 200,
                                lineHeight: 1.08,
                                letterSpacing: "-0.04em",
                                maxWidth: "800px",
                                textAlign: "center",

                            }}
                        >
                            <span>

                                <span style={{ fontWeight: "800" }}>About <span style={{ color: "var(--color-accent)" }}>Full Stack</span> Web Developer <span style={{ color: "var(--color-accent)" }}>Shams</span></span>
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
