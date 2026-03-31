import { db } from "@/db";
import { projects, researchPosts, experiences, education, contactMessages } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";
import { Briefcase, GraduationCap, Laptop, FileText, Plus, Bell } from "lucide-react";

export default async function AdminDashboard() {
    const [projectCount] = await db.select({ value: count() }).from(projects);
    const [researchCount] = await db.select({ value: count() }).from(researchPosts);
    const [experienceCount] = await db.select({ value: count() }).from(experiences);
    const [educationCount] = await db.select({ value: count() }).from(education);
    const [messageCount] = await db.select({ value: count() }).from(contactMessages);

    const stats = [
        { label: "Projects", count: projectCount.value, icon: Laptop, href: "/admin/projects" },
        { label: "Research", count: researchCount.value, icon: FileText, href: "/admin/research" },
        { label: "Experience", count: experienceCount.value, icon: Briefcase, href: "/admin/experience" },
        { label: "Education", count: educationCount.value, icon: GraduationCap, href: "/admin/education" },
        { label: "Messages", count: messageCount.value, icon: Bell, href: "/admin/messages" },
    ];

    return (
        <div className="fade-in">
            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: "1.75rem" }}>System Overview</h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                {stats.map((stat) => (
                    <Link href={`${stat.href}`}>
                        <div key={stat.label} className="card" style={{ padding: "1.5rem" }}>

                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                <stat.icon size={24} className="accent" />
                                {stat.label !== "Messages" && (
                                    <Link href={`${stat.href}/new`}>
                                        <Plus size={20} style={{ color: "var(--color-text-muted)" }} />
                                    </Link>
                                )}
                            </div>

                            <div style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>{stat.count}</div>
                            <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                {stat.label}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>Quick Actions</h2>
                    <div style={{ display: "grid", gap: "1rem" }}>
                        <Link href="/admin/projects/new" className="admin-btn">Create New Project</Link>
                        <Link href="/admin/research/new" className="admin-btn">Publish Research Post</Link>
                        <Link href="/admin/experience/new" className="admin-btn">Add Work Experience</Link>
                        <Link href="/admin/education/new" className="admin-btn">Add Education Record</Link>
                    </div>
                </div>

                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>Platform Status</h2>
                    <div style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                            <span>Environment</span>
                            <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>Production-Ready</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                            <span>Database</span>
                            <span>NeonDB (PostgreSQL)</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Auth System</span>
                            <span>Secure JWT / Http-Only</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .admin-btn {
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          color: #fff;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .admin-btn:hover {
          border-color: var(--color-accent);
          background: var(--color-bg-secondary);
        }
      `}</style>
        </div>
    );
}
