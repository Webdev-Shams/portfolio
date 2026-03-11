import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                borderTop: "1px solid var(--color-border)",
                padding: "1.2rem 0",
                marginTop: "auto",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
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
