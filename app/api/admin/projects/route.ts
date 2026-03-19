import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { projectSchema } from "@/lib/validations";
import { getSessionFromRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const session = await getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const result = projectSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
        }

        const existing = await db.query.projects.findFirst({
            where: (p, { eq }) => eq(p.slug, result.data.slug),
        });

        if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 400 });

        await db.insert(projects).values(result.data);
        revalidatePath("/portfolio", "page");
        revalidatePath("/", "page");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Project create error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
