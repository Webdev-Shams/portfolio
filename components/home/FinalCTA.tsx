import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between centering"
                    style={{
                        background: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "12px",
                        padding: "3.5rem 2.5rem",
                        gap: "1.5rem",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <style>
                        {`
                            .centering {
                            justify-content: center;
                            }

                            .centeringH {
                            text-align: center;
                            }

                            @media (min-width: 768px) {
                            .centering {
                                justify-content: space-between;
                            }
                            .centeringH {
                                text-align: left;
                            }
                        `}
                    </style>
                    <h2 className="centeringH"
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.2,
                        }}
                    >
                        Let&apos;s build something

                        <span style={{ color: "var(--color-accent)" }}> remarkable</span> together.
                    </h2>

                    <style>
                        {`
                        .wRes{
                            width: 100%;
                            max-width: 240px;
                            }

                        @media (min-width: 768px) {
                            .wRes{
                                width: auto;
                            }
                        }
                        `}
                    </style>

                    {/* CTA button */}
                    <div className="wRes" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Link className="w-full md:w-[200px]"
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
                                justifyContent: "center",
                            }}
                        >
                            <Mail size={16} />
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
