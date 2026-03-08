import { db } from "@/db";
import { categories } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allCategories = await db.select().from(categories).orderBy(categories.name);
        return NextResponse.json(allCategories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, slug } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        const newCategory = await db.insert(categories).values({
            name,
            slug,
        }).returning();

        return NextResponse.json(newCategory[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
