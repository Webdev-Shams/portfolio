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

                            }}
                        >
                            <span className="md:hidden ">
                                <span style={{ fontWeight: "800" }}>Full Stack <br /> <span style={{ color: "var(--color-accent)" }}>Next.js</span> <br /> Developer</span>
                            </span>
                            <span className="hidden sm:block">
                                <span style={{ fontWeight: "800" }}>Full Stack <span style={{ color: "var(--color-accent)" }}>Next.js</span> Developer</span>
                            </span>

                        </h1>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
