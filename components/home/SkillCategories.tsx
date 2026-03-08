"use client";
import { motion } from "framer-motion";

const FRONTEND_SKILLS = [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextdotjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Framer Motion", icon: "framer" },
    { name: "Shadcn UI", icon: "shadcnui", color: "ffffff" },
    { name: "WordPress", icon: "wordpress" },
];

const BACKEND_SKILLS = [
    { name: "Node.js", icon: "nodedotjs" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Supabase", icon: "supabase" },
    { name: "Drizzle ORM", icon: "drizzle" },
    { name: "Prisma", icon: "prisma", color: "1FA995" },
    { name: "Docker", icon: "docker" },
    { name: "REST APIs", icon: "fastapi" },
];


const SECURITY_SKILLS = [
    { name: "Better Auth", icon: "betterauth" },
    { name: "Redis", icon: "redis" },
    { name: "Cookies", icon: "cookiecutter" },
    { name: "Session", icon: "auth0" },
    { name: "JWT", icon: "jsonwebtokens", color: "ffffff" },
];



interface SkillCardProps {
    title: string;
    skills: { name: string; icon: string; color?: string }[];
    delay: number;
}

function SkillCategory({ title, skills, delay }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="skill-category-card"
        >
            <h3 className="category-label">{title}</h3>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: delay + 0.1 + (index * 0.05) }}
                        className="skill-item"
                    >
                        <img
                            src={`https://cdn.simpleicons.org/${skill.icon}${skill.color ? `/${skill.color}` : ""}`}
                            alt={skill.name}
                            className="skill-icon"
                        />
                        <span className="skill-name">{skill.name}{index !== skills.length - 1 ? "," : ""}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillCategories() {
    return (
        <section className="section skill-categories-section pb-13! md:pb-25!">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkillCategory title="Frontend Development" skills={FRONTEND_SKILLS} delay={0.1} />
                    <SkillCategory title="Backend & Infrastructure" skills={BACKEND_SKILLS} delay={0.2} />
                    <SkillCategory title="Security & Authentication" skills={SECURITY_SKILLS} delay={0.3} />
                </div>
            </div>

            <style>{`
                .skill-categories-section {
                    padding-top: 2rem;
                }

                .skill-category-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }

                .category-label {
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: var(--color-text-muted);
                    padding-left: 0.75rem;
                    border-left: 2px solid var(--color-accent);
                    margin: 0;
                    line-height: 1;
                }

                .skills-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.8rem;
                }

                .skill-item {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                }

                .skill-icon {
                    width: 16px;
                    height: 16px;
                    opacity: 0.9;
                }

                .skill-name {
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: var(--color-text-secondary);
                    white-space: nowrap;
                }
            `}</style>
        </section>
    );
}
