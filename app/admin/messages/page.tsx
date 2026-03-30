import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";
import MessagesList from "@/components/admin/MessagesList";

export const metadata = {
    title: "Inquiries | Admin Dashboard",
};

export default async function AdminMessagesPage() {
    const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));

    return (
        <div className="fade-in">
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Messages & Inquiries</h1>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    View and manage all incoming contact form submissions.
                </p>
            </div>

            {messages.length === 0 ? (
                <div className="card" style={{ padding: "4rem", textAlign: "center", color: "var(--color-text-muted)" }}>
                    No messages found yet.
                </div>
            ) : (
                <MessagesList initialMessages={messages} />
            )}
        </div>
    );
}
