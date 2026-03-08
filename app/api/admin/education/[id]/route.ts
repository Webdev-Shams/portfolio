import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { education } from "@/db/schema";
import { educationSchema } from "@/lib/validations";
import { getSessionFromRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;
        const data = await db.query.education.findFirst({
            where: (e, { eq }) => eq(e.id, id),
        });
        if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(data);
    } catch (error) {
        console.error("Education get error:", error);
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
        const result = educationSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
        }

        await db.update(education).set(result.data).where(eq(education.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Education update error:", error);
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
        await db.delete(education).where(eq(education.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Education delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
