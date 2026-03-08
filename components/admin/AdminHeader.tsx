"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/logintoadmin");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header
            style={{
                height: "64px",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: "2rem",
                background: "var(--color-bg-secondary)",
            }}
        >
            <div style={{ fontWeight: 800 }}>ADMIN DASHBOARD</div>
            <nav style={{ display: "flex", gap: "2rem" }}>
                <a href="/admin" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Dashboard</a>
                <a href="/admin/projects" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Projects</a>
                <a href="/admin/research" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Research</a>
                <a href="/admin/experience" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Experience</a>
                <a href="/admin/education" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Education</a>
                <a href="/" style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-accent)" }}>View Site</a>
            </nav>
            <button
                onClick={handleLogout}
                style={{
                    background: "none",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>
        </header>
    );
}
