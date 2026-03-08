import { config } from "dotenv";
config({ path: ".env" });

import { db } from "./index";
import { experiences, education, projects, researchPosts, categories } from "./schema";

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // 1. Current Job
        await db.insert(experiences).values({
            company: "SaaS Rocket",
            role: "Lead Full-Stack Engineer",
            employmentType: "Full-time",
            startDate: "Jan 2024",
            isCurrent: true,
            responsibilities: "Leading the development of a multi-tenant SaaS platform.\nManaging a team of 5 developers.\nImplementing core architectural patterns with Next.js and Postgres.",
            techStack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Tailwind"],
        });

        // 2. Past Job
        await db.insert(experiences).values({
            company: "Digital Agency X",
            role: "Senior Frontend Developer",
            employmentType: "Full-time",
            startDate: "Jun 2021",
            endDate: "Dec 2023",
            isCurrent: false,
            responsibilities: "Architected modern frontend solutions for Fortune 500 clients.\nOptimized web performance and Lighthouse scores.",
            techStack: ["React", "Next.js", "Framer Motion", "GraphQL"],
        });

        // 3. Education
        await db.insert(education).values([
            {
                degree: "Master of Business Administration (MBA)",
                institution: "University of Dhaka",
                major: "Management Information Systems",
                startYear: 2020,
                endYear: 2022,
                description: "Specialized in Digital Transformation and IT Strategy.",
            },
            {
                degree: "Bachelor of Business Administration (BBA)",
                institution: "University of Dhaka",
                major: "Management Information Systems",
                startYear: 2016,
                endYear: 2020,
            }
        ]);

        // 4. Categories
        const [nextjsCat] = await db.insert(categories).values({
            name: "Next.js",
            slug: "next-js",
        }).onConflictDoNothing().returning();

        const [wordpressCat] = await db.insert(categories).values({
            name: "WordPress",
            slug: "wordpress",
        }).onConflictDoNothing().returning();

        // If onConflictDoNothing returned nothing, fetch them
        const allCats = await db.select().from(categories);
        const nextId = allCats.find(c => c.slug === "next-js")?.id;
        const wpId = allCats.find(c => c.slug === "wordpress")?.id;

        // 5. Projects
        await db.insert(projects).values([
            {
                title: "Omni-Channel Analytics platform",
                slug: "omnichannel-analytics",
                summary: "A production-level analytics platform for retail businesses.",
                description: "Detailed description of the analytics platform...",
                problem: "Data fragmentation across various retail channels caused inefficiencies.",
                solution: "High-performance data aggregation engine with unified dashboard.",
                architecture: "Next.js 14, Server Actions, Drizzle ORM, NeonDB.",
                primaryImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                techStack: ["Next.js", "Drizzle", "NeonDB", "Tailwind"],
                categoryId: nextId,
            },
            {
                title: "AI Project Architect",
                slug: "ai-project-architect",
                summary: "Automated architectural diagram generation using LLMs.",
                description: "Innovative tool for software engineers to visualize systems.",
                problem: "Creating technical diagrams remains a manual, time-consuming task.",
                solution: "LLM-driven engine that converts text specs to system diagrams.",
                architecture: "Node.js, OpenAI, Canvas API, TypeScript.",
                primaryImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
                techStack: ["Node.js", "OpenAI", "React", "TypeScript"],
                categoryId: nextId,
            },
            {
                title: "Modern WordPress Agency Site",
                slug: "wp-agency-site",
                summary: "Speed-optimized WordPress site with custom headless integration.",
                description: "A high-performance WordPress site built for a creative agency.",
                problem: "Existing site was slow and hard to maintain.",
                solution: "Transitioned to a headless WordPress setup with optimized core web vitals.",
                architecture: "WordPress CMS, GraphQL, Advanced Custom Fields.",
                primaryImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
                techStack: ["WordPress", "PHP", "MySQL", "SCSS"],
                categoryId: wpId,
            }
        ]);

        // 5. Research
        await db.insert(researchPosts).values([
            {
                title: "Optimizing PostgreSQL for Serverless Next.js Apps",
                slug: "optimizing-postgres-serverless",
                excerpt: "Strategies for connection pooling and cold-start reduction in edge environments.",
                content: "<h1>The Challenge</h1><p>Serverless functions present unique challenges for traditional DB connections...</p>",
                primaryImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2026&auto=format&fit=crop",
            },
            {
                title: "The Case for Matte Design in Modern SaaS",
                slug: "matte-design-saas",
                excerpt: "Why minimal, high-contrast interfaces are winning the attention economy.",
                content: "<h1>Matte Aesthetic</h1><p>In a world of gradients and neomorphism, matte black interfaces represent stability...</p>",
                primaryImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
            }
        ]);

        console.log("✅ Seeding completed successfuly.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }
}

seed();
