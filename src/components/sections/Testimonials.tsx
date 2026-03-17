"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";

const testimonials = [
    {
        name: "Alex Johnson",
        role: "CEO, TechFlow",
        content:
            "Kidist's attention to detail and technical expertise transformed our vision into a high-performance reality.",
    },
    {
        name: "Sarah Miller",
        role: "Proprietor, Heritage Hub",
        content:
            "The E-commerce platform Kidist built for us saw a 40% increase in conversion within the first month!",
    },
];

export function Testimonials() {
    return (
        <Section id="testimonials" className="border-y border-border">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Voices of Success
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Feedback from clients and teammates I&apos;ve collaborated
                        with.
                    </p>
                </div>
                <div className="grid gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Card className="bg-card/30 border-border backdrop-blur-sm hover:border-primary/30 transition-colors duration-500">
                                <CardContent className="p-8 space-y-4">
                                    <Quote className="h-10 w-10 text-primary/20" />
                                    <p className="text-foreground/90 text-lg italic leading-relaxed">
                                        &quot;{t.content}&quot;
                                    </p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold">{t.name}</div>
                                            <div className="text-sm text-muted-foreground">{t.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
