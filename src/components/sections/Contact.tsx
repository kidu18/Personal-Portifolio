"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/layout/Section";
import { useState } from "react";
import { useSettings } from "@/components/SettingsProvider";

export function Contact() {
    const settings = useSettings();
    const [formStatus, setFormStatus] = useState("");
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("Sending...");
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm),
            });
            if (res.ok) {
                setFormStatus("Message sent successfully!");
                setContactForm({ name: "", email: "", message: "" });
            } else {
                setFormStatus("Failed to send. Please try again.");
            }
        } catch {
            setFormStatus("Failed to send. Please try again.");
        }
        setTimeout(() => setFormStatus(""), 3000);
    };

    return (
        <Section id="contact">
            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <h2 className="text-5xl font-bold tracking-tighter">
                        Let&apos;s build <br /> something{" "}
                        <span className="text-primary">great</span> together.
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Have a project in mind or just want to chat? I&apos;m always
                        open to new opportunities and technical discussions.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Mail className="h-5 w-5 text-primary" />
                            <span>{settings?.profile.email || "kidkidist87@gmail.com"}</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-4"
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-background border-border hover:text-primary hover:border-primary transition-all duration-300"
                            >
                                <Github className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-background border-border hover:text-primary hover:border-primary transition-all duration-300"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="bg-card/50 border-border border-2 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                        <form onSubmit={handleContactSubmit} className="p-8 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    className="bg-background border-border focus-visible:ring-primary"
                                    required
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="bg-background border-border focus-visible:ring-primary"
                                    required
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Your Message</label>
                                <textarea
                                    className="w-full min-h-[120px] rounded-md bg-background border border-border p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    placeholder="Tell me about your project..."
                                    required
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6"
                                disabled={formStatus === "Sending..."}
                            >
                                {formStatus || "Send Message"}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </Section>
    );
}
