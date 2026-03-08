"use client";
import { motion } from "framer-motion";

export default function Story() {
    return (
        <section className="section bg-bg">
            <div className="container">
                <div style={{ maxWidth: "680px", margin: "0 auto" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>The Story Behind the Code</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.125rem", lineHeight: 1.8, color: "var(--color-text-secondary)" }}>
                            <p>
                                I didn't start my career in tech. My background is in <span className="accent">Marketing</span>, where I learned to understand what makes products stick and how to communicate value. But I’ve always been someone who wanted to know how things work under the hood.
                            </p>
                            <p>
                                When I first discovered web development, it felt like finding a missing piece. It was the perfect intersection of <span className="accent">creativity and logic</span>. I began teaching myself JavaScript, then moved into the world of React and Next.js, and I haven't looked back since.
                            </p>
                            <p>
                                Today, I combine my marketing-trained "product-eye" with my engineering skills to build full-stack applications. I’m especially passionate about <span className="accent">open-source</span>, building shared tools, and the incredible speed of iteration that Next.js provides.
                            </p>
                            <p>
                                Outside of coding, I’m often exploring new design trends, reading about product growth, or experimenting with new research tools. I’m constantly learning, iterating, and striving to build something that adds real value to the web.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
