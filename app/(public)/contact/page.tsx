import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
    title: "Contact",
    description: "Get in touch with Shams for projects or collaborations.",
};

export default function ContactPage() {
    return (
        <div className="container section fade-in" style={{ maxWidth: "800px" }}>
            <h1 style={{ marginBottom: "1rem" }}>Get in Touch</h1>
            <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)", marginBottom: "3rem" }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    <a
                        href="mailto:hello@shams.dev"
                        className="card"
                        style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}
                    >
                        <div style={{ background: "var(--color-accent-dim)", padding: "0.75rem", borderRadius: "8px" }}>
                            <Mail className="accent" size={20} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "0.9375rem", marginBottom: "0.125rem" }}>Email</h3>
                            <p style={{ fontSize: "0.875rem" }}>hello@shams.dev</p>
                        </div>
                    </a>

                    <div className="grid grid-cols-3 gap-3 mb-5!">
                        <a
                            href="https://github.com"
                            target="_blank"
                            className="card"
                            style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}
                        >
                            <Github size={18} />
                            <span style={{ fontSize: "0.875rem" }}>GitHub</span>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            className="card"
                            style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}
                        >
                            <Linkedin size={18} />
                            <span style={{ fontSize: "0.875rem" }}>LinkedIn</span>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            className="card"
                            style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}
                        >
                            <Twitter size={18} />
                            <span style={{ fontSize: "0.875rem" }}>Twitter</span>
                        </a>
                    </div>
                </div>

                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
