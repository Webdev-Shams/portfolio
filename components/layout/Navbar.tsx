"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, FlaskConical, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/research", label: "Research", icon: FlaskConical },
    { href: "/contact", label: "Hire me", icon: Mail },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: "rgba(13,13,13,0.92)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid var(--color-border)",
                    transform: (scrolled && !open) ? "translateY(-100%)" : "translateY(0)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <nav className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "relative" }}>
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{
                            fontWeight: 800,
                            fontSize: "1.25rem",
                            letterSpacing: "-0.03em",
                            color: "var(--color-text-primary)",
                            zIndex: 60,
                            flex: "0 0 auto",
                            minWidth: "120px"
                        }}
                        onClick={() => setOpen(false)}
                    >
                        shams<span style={{ color: "var(--color-accent)" }}>.</span>
                    </Link>

                    {/* Desktop Links - Centered */}
                    <ul
                        style={{
                            display: "flex",
                            gap: "2.5rem",
                            listStyle: "none",
                            alignItems: "center",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                        className="desktop-nav"
                    >
                        {NAV_LINKS.filter(link => link.label !== "Hire me").map((link) => {
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            color: active
                                                ? "var(--color-text-primary)"
                                                : "var(--color-text-secondary)",
                                            transition: "color 0.2s ease",
                                            borderBottom: active
                                                ? "1px solid var(--color-accent)"
                                                : "1px solid transparent",
                                            paddingBottom: "2px",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!active) (e.target as HTMLElement).style.color = "#fff";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!active)
                                                (e.target as HTMLElement).style.color =
                                                    "var(--color-text-secondary)";
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right Side Actions - CTA and Contact */}
                    <div
                        className="desktop-nav"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            flex: "0 0 auto"
                        }}
                    >
                        <div style={{ display: "flex", marginRight: "0.25rem", gap: "0.2rem" }}>
                            <a
                                href="https://wa.me/8801874224558"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "28px",
                                    height: "38px",
                                    color: "var(--color-text-secondary)",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#25D366";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--color-text-secondary)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:webdev.shams@gmail.com"
                                title="Email"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "28px",
                                    height: "38px",
                                    color: "var(--color-text-secondary)",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(var(--color-accent-rgb), 0.1)";
                                    e.currentTarget.style.color = "var(--color-accent)";
                                    e.currentTarget.style.borderColor = "rgba(var(--color-accent-rgb), 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--color-text-secondary)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                }}
                            >
                                <Mail size={20} />
                            </a>
                        </div>

                        <Link
                            href="/contact"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0.5rem 1.25rem",
                                background: "var(--color-accent)",
                                color: "#000",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                transition: "all 0.2s ease",
                                boxShadow: "0 4px 15px rgba(var(--color-accent-rgb), 0.2)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 6px 20px rgba(var(--color-accent-rgb), 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 15px rgba(var(--color-accent-rgb), 0.2)";
                            }}
                        >
                            Hire me
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="mobile-nav-toggle"
                        style={{
                            background: "none",
                            border: "none",
                            color: "var(--color-text-primary)",
                            cursor: "pointer",
                            display: "none",
                            padding: "0.5rem",
                            zIndex: 60,
                            position: "relative",
                        }}
                        aria-label="Toggle navigation"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={open ? "close" : "open"}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {open ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </nav>

                {/* Mobile menu - Full Screen Overlay */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "var(--color-bg)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "100px 2rem 3rem",
                                zIndex: 55,
                                minHeight: "100vh"
                            }}
                            className="mobile-menu"
                        >
                            {/* Main Links - Vertically Centered */}
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem", width: "100%", alignItems: "center" }}>
                                {NAV_LINKS.filter(l => l.href !== "/contact").map((link, index) => {
                                    const active = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setOpen(false)}
                                                style={{
                                                    fontSize: "1.5rem",
                                                    fontWeight: 600,
                                                    color: active ? "var(--color-accent)" : "rgba(255,255,255,0.7)",
                                                    letterSpacing: "-0.02em",
                                                    textAlign: "center",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Action Buttons at Bottom */}
                            <div style={{ marginTop: "auto", width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {/* Social Actions */}
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                    <motion.a
                                        href="https://wa.me/8801874224558"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.5rem",
                                            padding: "0.875rem",
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            color: "#fff",
                                            fontSize: "0.9375rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        WhatsApp
                                    </motion.a>
                                    <motion.a
                                        href="mailto:webdev.shams@gmail.com"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.5rem",
                                            padding: "0.875rem",
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            color: "#fff",
                                            fontSize: "0.9375rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        <Mail size={18} />
                                        Email
                                    </motion.a>
                                </div>

                                {/* Hire Me Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setOpen(false)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            padding: "1rem",
                                            background: "var(--color-accent)",
                                            color: "#000",
                                            fontSize: "1.125rem",
                                            fontWeight: 700,
                                            textAlign: "center",
                                            boxShadow: "0 10px 30px rgba(var(--color-accent-rgb), 0.2)"
                                        }}
                                    >
                                        Hire me
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Minimal Icon Menu */}
            <div
                className="minimal-nav"
                style={{
                    position: "fixed",
                    right: "1.5rem",
                    top: "50%",
                    transform: (scrolled && !open) ? "translateY(-50%)" : "translateY(-50%) translateX(120px)",
                    zIndex: 100,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s",
                    opacity: (scrolled && !open) ? 1 : 0,
                    pointerEvents: (scrolled && !open) ? "auto" : "none",
                }}
            >
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                        padding: "0.6rem",
                        background: "rgba(30,30,30,0.85)",
                        backdropFilter: "blur(24px)",
                        borderRadius: "24px",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(180, 240, 0, 0.03)",
                    }}
                >
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <div key={link.href} className="nav-item-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <Link
                                    href={link.href}
                                    className="icon-link"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "14px",
                                        background: active ? "var(--color-accent)" : "transparent",
                                        color: active ? "#000" : "var(--color-text-secondary)",
                                        border: active ? "1px solid var(--color-accent)" : "1px solid transparent",
                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                        position: "relative",
                                        zIndex: 2,
                                    }}
                                >
                                    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                                </Link>
                                <span
                                    className="nav-label"
                                    style={{
                                        position: "absolute",
                                        right: "55px",
                                        background: "var(--color-bg-secondary)",
                                        color: "#fff",
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                        opacity: 0,
                                        transform: "translateX(10px)",
                                        transition: "all 0.2s ease",
                                        pointerEvents: "none",
                                        border: "1px solid var(--color-border)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                    }}
                                >
                                    {link.label}
                                </span>
                            </div>
                        );
                    })}
                </nav>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .desktop-nav { display: none !important; }
                    .mobile-nav-toggle { display: flex !important; }
                    .minimal-nav { display: none !important; }
                }

                .nav-item-container:hover .nav-label {
                    opacity: 1 !important;
                    transform: translateX(0) !important;
                }

                .icon-link:hover {
                    transform: scale(1.1);
                    border-color: var(--color-accent) !important;
                }
            `}</style>
        </>
    );
}
