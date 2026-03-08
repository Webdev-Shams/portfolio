"use server";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { z } from "zod";
import { headers } from "next/headers";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    captchaResult: z.string(),
    num1: z.number(),
    num2: z.number(),
});

// A simple in-memory rate limiter for demonstration. 
// In a real production app with multiple instances, use Redis or a database-backed one.
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;

export async function sendContactMessage(formData: FormData) {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";

    // Rate limiting check
    const now = Date.now();
    const userRateData = rateLimitMap.get(ip);

    if (userRateData) {
        if (now - userRateData < RATE_LIMIT_WINDOW / MAX_REQUESTS) {
            return { success: false, error: "Too many requests. Please try again later." };
        }
    }

    const rawData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
        captchaResult: formData.get("captchaResult") as string,
        num1: Number(formData.get("num1")),
        num2: Number(formData.get("num2")),
    };

    const validated = contactSchema.safeParse(rawData);

    if (!validated.success) {
        return { success: false, error: validated.error.issues[0].message };
    }

    const { name, email, subject, message, captchaResult, num1, num2 } = validated.data;

    // Validate Simple Math Captcha
    if (parseInt(captchaResult) !== num1 + num2) {
        return { success: false, error: "Incorrect math solution. Please try again." };
    }

    try {
        await db.insert(contactMessages).values({
            name,
            email,
            subject,
            message,
        });

        // Update rate limit
        rateLimitMap.set(ip, now);

        return { success: true, message: "Your message has been sent successfully!" };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Failed to send message. Please try again later." };
    }
}
