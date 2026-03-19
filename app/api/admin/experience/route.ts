import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { experiences } from "@/db/schema";
import { experienceSchema } from "@/lib/validations";
import { getSessionFromRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const session = await getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const result = experienceSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
        }

        await db.insert(experiences).values(result.data);

        // Clear cache for homepage and about page
        revalidatePath("/", "page");
        revalidatePath("/about", "page");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Experience create error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
