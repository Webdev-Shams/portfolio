import { z } from "zod";

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

// ─── Experience ───────────────────────────────────────────────────────────────
export const experienceSchema = z.object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    employmentType: z.string().min(1, "Employment type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().nullable(),
    isCurrent: z.boolean().default(false),
    responsibilities: z.string().min(1, "Responsibilities are required"),
    techStack: z.array(z.string()).default([]),
});

// ─── Education ────────────────────────────────────────────────────────────────
export const educationSchema = z.object({
    degree: z.string().min(1, "Degree is required"),
    institution: z.string().min(1, "Institution is required"),
    major: z.string().min(1, "Major is required"),
    startYear: z.coerce.number().int().min(1900).max(2100),
    endYear: z.coerce.number().int().min(1900).max(2100).optional().nullable(),
    description: z.string().optional().nullable(),
});

// ─── Project ──────────────────────────────────────────────────────────────────
export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
    summary: z.string().min(1, "Summary is required"),
    description: z.string().min(1, "Description is required"),
    problem: z.string().min(1, "Problem statement is required"),
    solution: z.string().min(1, "Solution is required"),
    architecture: z.string().min(1, "Architecture is required"),
    primaryImage: z.string().min(1, "Primary image is required"),
    secondaryImages: z.array(z.string()).default([]),
    techStack: z.array(z.string()).default([]),
    liveUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
    githubUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
    categoryId: z.string().uuid().optional().nullable(),
    order: z.number().int().default(0),
    featured: z.boolean().default(false),
});

// ─── Research Post ────────────────────────────────────────────────────────────
export const researchPostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
    excerpt: z.string().min(1, "Excerpt is required").max(300, "Max 300 chars"),
    content: z.string().min(1, "Content is required"),
    primaryImage: z.string().min(1, "Primary image is required"),
    featured: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ResearchPostInput = z.infer<typeof researchPostSchema>;
