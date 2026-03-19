import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { researchPosts } from "@/db/schema";
import { researchPostSchema } from "@/lib/validations";
import { getSessionFromRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const session = await getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const result = researchPostSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
        }

        const { title, slug, excerpt, content, primaryImage, featured } = result.data;

        // Check if slug exists
        const existing = await db.query.researchPosts.findFirst({
            where: (posts, { eq }) => eq(posts.slug, slug),
        });

        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }

        await db.insert(researchPosts).values({
            title,
            slug,
            excerpt,
            content,
            primaryImage,
            featured,
        });

        // Clear cache for relevant pages
        revalidatePath("/research", "page");
        revalidatePath("/", "page");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Research create error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

