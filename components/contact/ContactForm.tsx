"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, RefreshCw, User, Mail, MessageSquare, Tag, X, ShieldCheck } from "lucide-react";
import { sendContactMessage } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

export default function ContactForm() {
    const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({ type: "idle" });
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });
    const [captchaInput, setCaptchaInput] = useState("");
    const [showCaptchaModal, setShowCaptchaModal] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

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

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowCaptchaModal(true);
    };

    async function handleFinalSubmit() {
        if (!formRef.current) return;

        setStatus({ type: "loading" });

        const formData = new FormData(formRef.current);
        formData.append("num1", captcha.num1.toString());
        formData.append("num2", captcha.num2.toString());
        formData.append("captchaResult", captchaInput);

        const result = await sendContactMessage(formData);

        if (result.success) {
            setStatus({ type: "success", message: result.message });
            formRef.current.reset();
            generateCaptcha();
            setShowCaptchaModal(false);
        } else {
            setStatus({ type: "error", message: result.error });
            // If it's a captcha error, keep modal open but maybe refresh captcha
            if (result.error?.toLowerCase().includes("captcha") || result.error?.toLowerCase().includes("math")) {
                generateCaptcha();
            } else {
                setShowCaptchaModal(false);
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
            style={{ padding: "2rem", marginTop: "1.5rem", perspective: "1000px" }}
        >
            <form ref={formRef} onSubmit={handleInitialSubmit} className="contact-form">
                <div
                    className="flex flex-col md:flex-row"
                    style={{ gap: "1.5rem", marginBottom: "1.5rem" }}
                >
                    <div className="input-group w-full">
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
                    <div className="input-group w-full">
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
                    {status.message && !showCaptchaModal && (
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

            <AnimatePresence>
                {showCaptchaModal && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="modal-content"
                        >
                            <div className="modal-header">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="text-accent" size={20} />
                                    <h3 className="modal-title">Security Check</h3>
                                </div>
                                <button
                                    onClick={() => setShowCaptchaModal(false)}
                                    className="close-button"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="modal-description">
                                Please solve this simple math problem to verify you're human.
                            </p>

                            <div className="captcha-container">
                                <div className="captcha-box">
                                    {captcha.num1} + {captcha.num2}
                                </div>
                                <input
                                    type="number"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && captchaInput && status.type !== "loading") {
                                            handleFinalSubmit();
                                        }
                                    }}
                                    autoFocus
                                    placeholder="= ?"
                                    className="input captcha-input"
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

                            {status.type === "error" && status.message?.toLowerCase().includes("captcha") && (
                                <div className="modal-error">
                                    <AlertCircle size={16} />
                                    {status.message}
                                </div>
                            )}

                            <button
                                onClick={handleFinalSubmit}
                                disabled={status.type === "loading" || !captchaInput}
                                className={cn("button-primary w-full", status.type === "loading" && "loading")}
                                style={{ marginTop: "1rem" }}
                            >
                                {status.type === "loading" ? (
                                    <RefreshCw className="animate-spin" size={20} />
                                ) : (
                                    "Verify & Send"
                                )}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
                    border-radius: 12px;
                    color: var(--color-text-primary);
                    transition: all 0.2s ease;
                }
                .input:focus {
                    outline: none;
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 2px var(--color-accent-dim);
                }
                .captcha-box {
                    padding: 0.75rem 1.25rem;
                    background: var(--color-accent-dim);
                    border-radius: 12px;
                    font-weight: 600;
                    color: var(--color-accent);
                    border: 1px dashed var(--color-accent);
                    font-size: 1.25rem;
                    white-space: nowrap;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 100px;
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
                    border-radius: 12px;
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
                    padding: 0.875rem 1.5rem;
                    background: var(--color-accent);
                    color: black;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .button-primary:hover:not(:disabled) {
                    background: var(--color-accent-hover);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px var(--color-accent-dim);
                }
                .button-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(18, 18, 18, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1.5rem;
                }
                .modal-content {
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: 24px;
                    padding: 2rem;
                    width: 100%;
                    max-width: 450px;
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }
                .modal-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                }
                .close-button {
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }
                .close-button:hover {
                    background: var(--color-bg-tertiary);
                    color: var(--color-text-primary);
                }
                .modal-description {
                    color: var(--color-text-secondary);
                    font-size: 0.9375rem;
                    margin-bottom: 2rem;
                    line-height: 1.5;
                }
                .captcha-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .captcha-input {
                    font-size: 1.25rem;
                    font-weight: 600;
                    text-align: center;
                }
                .modal-error {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #ef2c2c;
                    font-size: 0.875rem;
                    margin-bottom: 1rem;
                    background: rgba(239, 44, 44, 0.1);
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .gap-2 { gap: 0.5rem; }
                .text-accent { color: var(--color-accent); }
            `}</style>
        </motion.div>
    );
}
