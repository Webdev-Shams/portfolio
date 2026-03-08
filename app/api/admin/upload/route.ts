import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { getSessionFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
    // Protect the route
    const session = await getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${uuidv4()}.webp`;
        const uploadDir = join(process.cwd(), "public", "uploads", "research");

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true });

        // Optimize image using Sharp (Convert to WebP, resize if too large)
        const optimizedBuffer = await sharp(buffer)
            .resize(1200, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, optimizedBuffer);

        return NextResponse.json({
            url: `/uploads/research/${fileName}`
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
