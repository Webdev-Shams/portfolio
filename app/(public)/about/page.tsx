import type { Metadata } from "next";
import Background from "@/components/about/Background";
import Story from "@/components/about/Story";
import AboutHeader from "@/components/about/AboutHeader";
import { motion } from "framer-motion";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About | Shams Portfolio",
    description: "Learn about Shams, a full-stack Next.js developer with a marketing background focused on high-performance digital products and scalable architecture.",
};

export default function AboutPage() {
    return (
        <div className="fade-in">
            <AboutHeader />
            <div className="hidden md:block"
                style={{
                    position: "relative",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -70,
                        right: 0,

                    }}
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
                </div>
            </div>
            <Background />
            <Story />
        </div>
    );
}


