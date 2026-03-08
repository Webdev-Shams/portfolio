import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { researchPosts } from "@/db/schema";
import { researchPostSchema } from "@/lib/validations";
import { getSessionFromRequest } from "@/lib/auth";
import { eq, and, ne } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const post = await db.query.researchPosts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id as any),
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Research fetch error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
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

        // Check if slug exists in ANOTHER post
        const existing = await db.query.researchPosts.findFirst({
            where: (posts, { eq, and, ne }) => and(eq(posts.slug, slug), ne(posts.id, id as any)),
        });

        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }

        await db.update(researchPosts)
            .set({
                title,
                slug,
                excerpt,
                content,
                primaryImage,
                featured,
                updatedAt: new Date(),
            })
            .where(eq(researchPosts.id, id as any));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Research update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await db.delete(researchPosts).where(eq(researchPosts.id, id as any));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Research delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
