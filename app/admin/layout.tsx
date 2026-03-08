import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
    title: "Admin Dashboard | Shams",
    robots: "noindex, nofollow",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <AdminHeader />
                <main style={{ flex: 1, padding: "2rem" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
