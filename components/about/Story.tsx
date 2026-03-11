"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Story() {
    return (
        <section className="section bg-bg"
            style={{
                paddingTop: "0",
            }}
        >
            <div className="container">
                <div style={{ maxWidth: "680px", margin: "0 auto" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            position: "relative",
                            margin: "0 auto",
                        }}
                        className="md:hidden hero-image-wrapper w-[100%] md:w-[230px] h-[300px]! md:h-[230px]!"
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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            marginTop: "2rem",
                        }}
                    >
                        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>The Story Behind the Code</h2>
                        <div style={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "1.5rem", 
                            fontSize: "clamp(1rem, 2vw, 1rem)",
                            fontWeight: 400,
                            color: "var(--color-text-secondary)",
                            lineHeight: 1.7,
                        }}>
                            <p className="text-center!">
                                My interest in technology started when I was around eight or ten years old. While playing games on the computer, I became fascinated by how clicking a few buttons could make the machine perform different actions. That curiosity about how software works stayed with me as I grew older.
                            </p>
                            <p className="text-center!">
                                After getting my first smartphone, I began exploring the web more seriously and discovered platforms like W3Schools, where I started learning HTML and CSS. Experimenting with simple code and seeing how small changes affected a webpage sparked my early interest in web development.
                            </p>
                            <p className="text-center!">
                                Alongside technology, I also developed an interest in design and digital marketing, which led me to complete both my BBA and MBA in Marketing. Today, I combine that marketing perspective with my technical background to build web applications and SaaS products that focus on performance, usability, and real user value.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
