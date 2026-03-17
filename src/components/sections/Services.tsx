"use client";

import { motion } from "framer-motion";
import { UserCircle2, Laptop } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";

const services = [
    {
        title: "MERN Stack Development",
        desc: "Building scalable, high-speed applications using MongoDB, Express, React, and Node.js with production-ready architectures.",
        icon: UserCircle2,
    },
    {
        title: "Next.js Specialist",
        desc: "Expertise in App Router, Server Components, and SEO optimization for conversion-driven user experiences.",
        icon: UserCircle2,
    },
    {
        title: "Scalable Architecture",
        desc: "Designing secure, future-proof cloud-based systems and database architectures built for startup growth.",
        icon: Laptop,
    },
];

export function Services() {
    return (
        <Section id="services" className="bg-muted/30">
            <div className="text-center mb-20 space-y-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-green-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(92,235,110,0.3)] pb-2"
                >
                    My Expertise
                </motion.h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Providing high-impact technical solutions for modern businesses.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, i) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -12, transition: { duration: 0.3 } }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.15, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <Card
                            className="group bg-[#060907]/60 border border-white/5 hover:border-primary/50 transition-all duration-500 backdrop-blur-2xl h-full shadow-2xl hover:shadow-[0_0_30px_rgba(92,235,110,0.15)] relative isolate overflow-hidden rounded-3xl"
                        >
                            {/* Animated background gradient line */}
                            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-primary transition-all duration-500" />
                            
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-black/60 opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                            <CardContent className="pt-10 pb-8 px-8 space-y-6">
                                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(92,235,110,0.4)] group-hover:scale-110">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-base opacity-80 group-hover:opacity-100 transition-opacity">
                                        {service.desc}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
