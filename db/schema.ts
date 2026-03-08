import {
    pgTable,
    uuid,
    text,
    boolean,
    timestamp,
    json,
    integer,
} from "drizzle-orm/pg-core";

// ─── Experiences ─────────────────────────────────────────────────────────────
export const experiences = pgTable("experiences", {
    id: uuid("id").primaryKey().defaultRandom(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    employmentType: text("employment_type").notNull().default("Full-time"),
    startDate: text("start_date").notNull(),
    endDate: text("end_date"),
    isCurrent: boolean("is_current").notNull().default(false),
    responsibilities: text("responsibilities").notNull(),
    techStack: json("tech_stack").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Education ───────────────────────────────────────────────────────────────
export const education = pgTable("education", {
    id: uuid("id").primaryKey().defaultRandom(),
    degree: text("degree").notNull(),
    institution: text("institution").notNull(),
    major: text("major").notNull(),
    startYear: integer("start_year").notNull(),
    endYear: integer("end_year"),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Categories ─────────────────────────────────────────────────────────────
export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Projects ────────────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    problem: text("problem").notNull(),
    solution: text("solution").notNull(),
    architecture: text("architecture").notNull(),
    primaryImage: text("primary_image").notNull(),
    secondaryImages: json("secondary_images").$type<string[]>().notNull().default([]),
    techStack: json("tech_stack").$type<string[]>().notNull().default([]),
    liveUrl: text("live_url"),
    githubUrl: text("github_url"),
    categoryId: uuid("category_id").references(() => categories.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Research Posts ───────────────────────────────────────────────────────────
export const researchPosts = pgTable("research_posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    primaryImage: text("primary_image").notNull(),
    featured: boolean("featured").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Contact Messages ────────────────────────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ResearchPost = typeof researchPosts.$inferSelect;
export type NewResearchPost = typeof researchPosts.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
