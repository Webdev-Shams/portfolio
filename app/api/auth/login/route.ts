import { NextRequest, NextResponse } from "next/server";
import { signToken, buildSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { username, password } = result.data;

        // Check credentials against ENV
        const envUsername = process.env.ADMIN_USERNAME;
        const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (username !== envUsername || password !== envPasswordHash) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT
        const token = await signToken({ username });

        const response = NextResponse.json({ success: true });

        // Set HTTP-only cookie
        response.headers.set("Set-Cookie", buildSessionCookie(token));

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
