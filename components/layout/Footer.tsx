import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                borderTop: "1px solid var(--color-border)",
                padding: "2.5rem 0",
                marginTop: "auto",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                }}
            >
                <div>
                    <Link
                        href="/"
                        style={{
                            fontWeight: 800,
                            fontSize: "1rem",
                            letterSpacing: "-0.03em",
                            color: "var(--color-text-primary)",
                        }}
                    >
                        shams<span style={{ color: "var(--color-accent)" }}>.</span>
                    </Link>
                    <p
                        style={{
                            fontSize: "0.8125rem",
                            color: "var(--color-text-muted)",
                            marginTop: "0.25rem",
                        }}
                    >
                        Full-Stack Next.js Developer
                    </p>
                </div>

                <nav
                    style={{
                        display: "flex",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        { href: "/portfolio", label: "Portfolio" },
                        { href: "/research", label: "Research" },
                        { href: "/contact", label: "Contact" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="link-hover"
                            style={{
                                fontSize: "0.8125rem",
                                color: "var(--color-text-muted)",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <p
                    style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-muted)",
                    }}
                >
                    © {year} Shams. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
