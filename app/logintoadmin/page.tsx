"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validations";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const validation = loginSchema.safeParse({ username, password });
        if (!validation.success) {
            setError(validation.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-bg)",
                padding: "1rem",
            }}
        >
            <div
                className="card"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "2.5rem",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Admin Portal</h1>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                        Please sign in to manage your portfolio.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.25rem" }}>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="admin-input"
                        />
                    </div>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="admin-input"
                        />
                    </div>

                    {error && (
                        <div style={{ color: "#ef4444", fontSize: "0.8125rem", textAlign: "center" }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "var(--color-accent)",
                            color: "#000",
                            border: "none",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            fontWeight: 700,
                            cursor: "pointer",
                            marginTop: "0.5rem",
                        }}
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>
            </div>

            <style>{`
        .admin-input {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 0.625rem;
          border-radius: 6px;
          color: #fff;
          outline: none;
        }
        .admin-input:focus {
          border-color: var(--color-accent);
        }
      `}</style>
        </div>
    );
}
