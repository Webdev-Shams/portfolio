"use client";

import { useState } from "react";
import { Mail, User, Trash2, ChevronRight, MessageSquare, AlertCircle } from "lucide-react";
import { deleteContactMessage } from "@/lib/actions/contact";
import { motion, AnimatePresence } from "framer-motion";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
});

import type { ContactMessage } from "@/db/schema";

interface MessagesListProps {
    initialMessages: ContactMessage[];
}

export default function MessagesList({ initialMessages }: MessagesListProps) {
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this message?")) return;

        setIsDeleting(id);
        const result = await deleteContactMessage(id);
        if (result.success) {
            setMessages(messages.filter((msg) => msg.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
        } else {
            alert("Error deleting message");
        }
        setIsDeleting(null);
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
            {/* List of Messages */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {messages.map((msg, index) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`message-card ${selectedMessage?.id === msg.id ? "active" : ""}`}
                        onClick={() => setSelectedMessage(msg)}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                                <User size={14} /> <span>{msg.name}</span>
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                                {dateFormatter.format(new Date(msg.createdAt))}
                            </div>
                        </div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--color-text-primary)" }}>
                            {msg.subject}
                        </h3>
                        <p style={{
                            fontSize: "0.875rem",
                            color: "var(--color-text-secondary)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: "1.4"
                        }}>
                            {msg.message}
                        </p>
                        
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                            <button
                                onClick={(e) => handleDelete(msg.id, e)}
                                disabled={isDeleting === msg.id}
                                className="delete-btn"
                                title="Delete Message"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Message Detail View */}
            <div style={{ position: "sticky", top: "2rem" }}>
                <AnimatePresence mode="wait">
                    {selectedMessage ? (
                        <motion.div
                            key={selectedMessage.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="card detail-card"
                            style={{ padding: "2rem" }}
                        >
                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                                    <div style={{ padding: "0.5rem", background: "var(--color-accent-dim)", borderRadius: "8px" }}>
                                        <Mail className="accent" size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: "1.125rem" }}>{selectedMessage.name}</div>
                                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{selectedMessage.email}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginLeft: "3.25rem" }}>
                                    Received on {fullDateFormatter.format(new Date(selectedMessage.createdAt))}
                                </div>
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <div className="label-text">SUBJECT</div>
                                <div style={{ fontWeight: 600, fontSize: "1rem" }}>{selectedMessage.subject}</div>
                            </div>

                            <div>
                                <div className="label-text">MESSAGE</div>
                                <div style={{
                                    whiteSpace: "pre-wrap",
                                    lineHeight: "1.6",
                                    color: "var(--color-text-primary)",
                                    fontSize: "1rem"
                                }}>
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div style={{ marginTop: "3rem" }}>
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                                    className="reply-btn"
                                >
                                    Reply via Email <Mail size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="card" style={{ padding: "4rem", textAlign: "center", borderStyle: "dashed", borderColor: "var(--color-border)" }}>
                            <div style={{ color: "var(--color-text-muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                                <MessageSquare size={32} opacity={0.3} />
                                <div>Select a message to view details</div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .message-card {
                    padding: 1.5rem;
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }
                .message-card:hover {
                    border-color: var(--color-accent);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    background: var(--color-bg-tertiary);
                }
                .message-card.active {
                    border-color: var(--color-accent);
                    background: var(--color-bg-tertiary);
                    box-shadow: 0 0 0 3px var(--color-accent-dim);
                }
                .delete-btn {
                    background: none;
                    border: none;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 6px;
                    transition: all 0.2s;
                }
                .delete-btn:hover {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }
                .label-text {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    color: var(--color-text-muted);
                    margin-bottom: 0.5rem;
                }
                .reply-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: var(--color-accent);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .reply-btn:hover {
                    background: var(--color-accent-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px var(--color-accent-dim);
                }
            `}</style>
        </div>
    );
}
