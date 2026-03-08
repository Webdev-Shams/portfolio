"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, RefreshCw, User, Mail, MessageSquare, Tag } from "lucide-react";
import { sendContactMessage } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

export default function ContactForm() {
    const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({ type: "idle" });
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });
    const [captchaInput, setCaptchaInput] = useState("");

    const generateCaptcha = () => {
        setCaptcha({
            num1: Math.floor(Math.random() * 9) + 1,
            num2: Math.floor(Math.random() * 9) + 1,
        });
        setCaptchaInput("");
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus({ type: "loading" });

        const formData = new FormData(event.currentTarget);
        formData.append("num1", captcha.num1.toString());
        formData.append("num2", captcha.num2.toString());
        formData.append("captchaResult", captchaInput);

        const result = await sendContactMessage(formData);

        if (result.success) {
            setStatus({ type: "success", message: result.message });
            (event.target as HTMLFormElement).reset();
            generateCaptcha();
        } else {
            setStatus({ type: "error", message: result.error });
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
            style={{ padding: "2rem", marginTop: "2rem", perspective: "1000px" }}
        >
            <form onSubmit={handleSubmit} className="contact-form">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <div className="input-group">
                        <label htmlFor="name" className="label">
                            <User size={16} /> Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="label">
                            <Mail size={16} /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className="input"
                        />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="subject" className="label">
                        <Tag size={16} /> Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder="Inquiry about project"
                        className="input"
                    />
                </div>

                <div className="input-group" style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="message" className="label">
                        <MessageSquare size={16} /> Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="input"
                    ></textarea>
                </div>

                <div className="input-group" style={{ marginBottom: "2rem" }}>
                    <label className="label">Security Check</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div className="captcha-box">
                            {captcha.num1} + {captcha.num2} = ?
                        </div>
                        <input
                            type="number"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            required
                            placeholder="Result"
                            className="input"
                            style={{ width: "100px" }}
                        />
                        <button
                            type="button"
                            onClick={generateCaptcha}
                            className="icon-button"
                            title="Refresh Captcha"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className={cn("button-primary w-full", status.type === "loading" && "loading")}
                >
                    {status.type === "loading" ? (
                        <RefreshCw className="animate-spin" size={20} />
                    ) : (
                        <>
                            Send Message <Send size={18} />
                        </>
                    )}
                </button>

                <AnimatePresence>
                    {status.message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={cn(
                                "status-message",
                                status.type === "success" ? "success" : "error"
                            )}
                            style={{ marginTop: "1.5rem" }}
                        >
                            {status.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {status.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            <style jsx>{`
                .label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                    color: var(--color-text-secondary);
                }
                .input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: var(--color-bg-tertiary);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    color: var(--color-text-primary);
                    transition: all 0.2s ease;
                }
                .input:focus {
                    outline: none;
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 2px var(--color-accent-dim);
                }
                .captcha-box {
                    padding: 0.75rem 1rem;
                    background: var(--color-accent-dim);
                    border-radius: 8px;
                    font-weight: 600;
                    color: var(--color-accent);
                    border: 1px dashed var(--color-accent);
                }
                .icon-button {
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                .icon-button:hover {
                    background: var(--color-bg-tertiary);
                    color: var(--color-accent);
                }
                .status-message {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    border-radius: 8px;
                    font-size: 0.9375rem;
                }
                .status-message.success {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                    border: 1px solid rgba(34, 197, 94, 0.2);
                }
                .status-message.error {
                    background: rgba(239, 44, 44, 0.1);
                    color: #ef2c2c;
                    border: 1px solid rgba(239, 44, 44, 0.2);
                }
                .w-full {
                    width: 100%;
                }
                .button-primary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1.5rem;
                    background: var(--color-accent);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .button-primary:hover:not(:disabled) {
                    background: var(--color-accent-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px var(--color-accent-dim);
                }
                .button-primary:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
}
