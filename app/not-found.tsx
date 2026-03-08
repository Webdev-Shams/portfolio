import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "6rem", fontWeight: 900, marginBottom: "0", color: "var(--color-bg-secondary)", WebkitTextStroke: "1px var(--color-border)" }}>404</h1>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>System Entry Not Found</h2>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "400px", marginBottom: "2.5rem" }}>
                The page you are looking for has been moved, deleted, or never existed in the current architectural state.
            </p>
            <Link href="/" className="tag" style={{ background: "var(--color-accent)", color: "#000", fontWeight: 700, padding: "10px 24px", fontSize: "0.875rem" }}>
                Return to Home
            </Link>
        </div>
    );
}
