import { db } from "@/db";
import { researchPosts } from "@/db/schema";
import Link from "next/link";
import { Plus } from "lucide-react";
import ResearchTable from "@/components/admin/ResearchTable";
import { desc } from "drizzle-orm"; // Ensure desc is imported

export default async function AdminResearchPage() {
    // Sort by createdAt descending
    const allPosts = await db.select().from(researchPosts).orderBy(desc(researchPosts.createdAt));

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage Research</h1>
                <Link href="/admin/research/new" className="tag" style={{ background: 'var(--color-accent)', color: '#000', fontWeight: 700, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> New Post
                </Link>
            </div>

            <ResearchTable posts={allPosts as any} />
        </div>
    );
}
