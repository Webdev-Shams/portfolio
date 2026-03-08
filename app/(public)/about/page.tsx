import type { Metadata } from "next";
import AboutHeader from "@/components/about/AboutHeader";
import Background from "@/components/about/Background";
import Education from "@/components/home/Education";
import Story from "@/components/about/Story";

export const metadata: Metadata = {
    title: "About | Shams Portfolio",
    description: "Learn about Shams, a full-stack Next.js developer with a marketing background focused on high-performance digital products and scalable architecture.",
};

export default function AboutPage() {
    return (
        <div className="fade-in">
            <AboutHeader />
            <Background />
            <Education />
            <Story />
        </div>
    );
}
