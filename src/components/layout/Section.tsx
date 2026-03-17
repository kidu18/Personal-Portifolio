"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    animate?: boolean;
}

export function Section({
    id,
    children,
    className,
    containerClassName,
    animate = true,
}: SectionProps) {
    const content = (
        <div className={cn("max-w-7xl mx-auto px-4", containerClassName)}>
            {children}
        </div>
    );

    return (
        <section id={id} className={cn("py-24 relative overflow-hidden", className)}>
            {animate ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                >
                    {content}
                </motion.div>
            ) : (
                content
            )}
        </section>
    );
}
