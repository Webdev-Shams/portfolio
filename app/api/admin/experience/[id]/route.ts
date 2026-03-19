import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { experiences } from "@/db/schema";
import { experienceSchema } from "@/lib/validations";
import { getSessionFromRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;
        const data = await db.query.experiences.findFirst({
            where: (e, { eq }) => eq(e.id, id),
        });
        if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(data);
    } catch (error) {
        console.error("Experience get error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;
        const body = await req.json();
        const result = experienceSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
        }

        await db.update(experiences).set(result.data).where(eq(experiences.id, id));

        // Clear cache
        revalidatePath("/", "page");
        revalidatePath("/about", "page");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Experience update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;
        await db.delete(experiences).where(eq(experiences.id, id));

        // Clear cache
        revalidatePath("/", "page");
        revalidatePath("/about", "page");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Experience delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
