"use client";
import { motion } from "framer-motion";

const SKILLS = [
    { name: "Next.js", icon: "nextdotjs" },
    { name: "React", icon: "react" },
    { name: "WordPress", icon: "wordpress" },
    { name: "TypeScript", icon: "typescript" },
    { name: "TailwindCSS", icon: "tailwindcss" },
    { name: "shadcn/ui", icon: "shadcnui" },
    { name: "Supabase", icon: "supabase" },
    { name: "Drizzle", icon: "drizzle" },
    { name: "Prisma", icon: "prisma" },
    { name: "Better Auth", icon: "betterauth" },
    { name: "Stripe", icon: "stripe" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Vercel", icon: "vercel" },
    { name: "GitHub", icon: "github" },
    { name: "Docker", icon: "docker" },
    { name: "Figma", icon: "figma" },
];

export default function TechSkills() {
    return (
        <section className="section" style={{ paddingTop: 0, overflow: "hidden" }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="marquee-wrapper">
                        <div className="marquee-content">
                            {[...SKILLS, ...SKILLS].map((skill, index) => (
                                <div
                                    key={`${skill.name}-${index}`}
                                    className="skill-badge"
                                >
                                    <img
                                        src={`https://cdn.simpleicons.org/${skill.icon}/ffffff`}
                                        alt={skill.name}
                                        style={{ width: "16px", height: "16px" }}
                                    />
                                    <span
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: 300,
                                            color: "var(--color-text-secondary)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          padding: 1rem 0;
        }

        .marquee-content {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: scroll-right 60s linear infinite;
        }

        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .skill-badge {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 0.875rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }

        .skill-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
        </section>
    );
}
