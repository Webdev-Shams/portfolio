"use client";

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

const DESIGN_SKILLS = [
    { name: "Figma", icon: "figma" },
    { name: "Adobe Photoshop", icon: "eclipseadoptium", color: "31A8FF" },
    { name: "Adobe Illustrator", icon: "eclipseadoptium", color: "FF9A00" },
    { name: "Filmora", icon: "wondersharefilmora" },
    { name: "CapCut", icon: "tiktok" },
];

const MARKETING_SKILLS = [
    { name: "Google Trends", icon: "google" },
    { name: "Google Ads", icon: "googleads" },
    { name: "Google Search Console", icon: "googlesearchconsole" },
    { name: "Go High Level", icon: "circle" },
    { name: "Zapier", icon: "zapier" },
    { name: "ActiveCampaign", icon: "mailchimp" },
    { name: "Buffer", icon: "buffer", color: "D24726" },
];

const OFFICE_SKILLS = [
    { name: "MS Word", icon: "circle", color: "2B579A" },
    { name: "MS PowerPoint", icon: "circle", color: "D24726" },
    { name: "MS Excel", icon: "circle", color: "217346" },
];






interface SkillCardProps {
    title: string;
    skills: { name: string; icon: string; color?: string }[];
    delay: number;
}

function SkillCategory({ title, skills, delay }: SkillCardProps) {
    return (
        <div
            className="skill-category-card"
        >
            <h3 className="category-label">{title}</h3>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div
                        key={skill.name}
                        className="skill-item"
                    >
                        <img
                            src={`https://cdn.simpleicons.org/${skill.icon}${skill.color ? `/${skill.color}` : ""}`}
                            alt={skill.name}
                            className="skill-icon"
                        />
                        <span className="skill-name">{skill.name}{index !== skills.length - 1 ? "," : ""}</span>
                    </div>
                ))}
            </div>
        </div>
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
                    <SkillCategory title="Design & UI/UX" skills={DESIGN_SKILLS} delay={0.4} />
                    <SkillCategory title="Marketing & Automation" skills={MARKETING_SKILLS} delay={0.5} />
                    <SkillCategory title="Office Tools" skills={OFFICE_SKILLS} delay={0.6} />
                </div>
            </div>

            <style>{`
                .skill-categories-section {
                    padding-top: 2rem;
                }

                .skill-category-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--color-border);
                    border-radius: 0px;
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
