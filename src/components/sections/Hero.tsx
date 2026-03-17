"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "@/components/SettingsProvider";

export function Hero() {
    const settings = useSettings();

    return (
        <section className="relative min-h-screen pt-32 pb-24 flex flex-col items-center justify-center container mx-auto px-4 overflow-hidden">
            {/* Top row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center text-sm md:text-base tracking-wide"
            >
                <span className="text-white text-lg md:text-xl font-medium">Hi! I&apos;m {settings?.profile.name || "Kidist Gashaw"}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center mt-6 text-5xl md:text-7xl lg:text-[85px] font-extrabold tracking-[-0.04em] leading-[1.1] z-10 flex flex-col items-center"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-primary to-green-300 drop-shadow-[0_0_15px_rgba(92,235,110,0.5)]">Full-Stack</span>
                <span className="text-white my-1 md:my-2">Developer & Founder of</span>
                <span className="flex items-center justify-center gap-2 md:gap-4 text-primary">
                    ROKINA Tech Team <ArrowUpRight className="h-10 w-10 md:h-16 md:w-16 text-white stroke-[3px]" />
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 md:mt-8 text-neutral-400 text-center max-w-lg z-10 text-sm md:text-base leading-relaxed px-4"
            >
                {settings?.profile.bio || "A dedicated MERN & Next.js Specialist. I combine technical expertise with entrepreneurial execution to deliver digital products strategically aligned with business growth."}
            </motion.p>

            {/* Center Image Section */}
            <div className="relative mt-20 md:mt-32 mb-20 md:mb-32 w-full max-w-2xl flex justify-center items-center z-0">
                {/* Wavy text using SVG */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center -z-10 w-[200%] md:w-auto scale-110 md:scale-150 pointer-events-none"
                >
                    <svg viewBox="0 0 800 300" className="w-[800px] text-primary fill-current opacity-70 overflow-visible">
                        <path id="curve" d="M -100,150 C 150,-50 650,350 900,150" fill="transparent" />
                        <text fontSize="22" letterSpacing="4" className="uppercase font-bold">
                            <textPath href="#curve" startOffset="0%">
                                <animate attributeName="startOffset" from="-100%" to="0%" dur="20s" repeatCount="indefinite" />
                                I deliver digital products strategically aligned with business growth. • I deliver digital products strategically aligned with business growth. • I deliver digital products strategically aligned with business growth. • I deliver digital products strategically aligned with business growth.
                            </textPath>
                        </text>
                    </svg>
                </motion.div>

                {/* Rotated background card */}
                <motion.div
                    initial={{ rotate: -15, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: -8, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="absolute w-56 h-72 md:w-80 md:h-[400px] bg-white rounded-3xl"
                />

                {/* Main image card with Modern Glassmorphism */}
                <motion.div
                    initial={{ rotate: 15, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 8, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                    className="relative w-56 h-72 md:w-80 md:h-[400px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_32px_0_rgba(92,235,110,0.2)] bg-white/5 backdrop-blur-lg cursor-pointer group"
                >
                    {/* Modern gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                    {/* Glass shine effect pointer */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 z-20 pointer-events-none rounded-3xl" />
                    <Image
                        src={settings?.profile.avatarUrl || "/uploads/1772008039691_my_img.jpg"}
                        alt={settings?.profile.name || "Kidist Gashaw"}
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </motion.div>

                {/* Floating Tech Badges showing 2026 UI Trends */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 1.2 },
                        x: { duration: 0.8, delay: 1.2, type: "spring" },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
                    }}
                    className="absolute -left-8 top-12 md:-left-16 md:top-20 z-30 px-4 md:px-5 py-2 md:py-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(92,235,110,0.15)] flex items-center gap-3 pointer-events-none"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                    <span className="text-white text-xs md:text-sm font-bold tracking-wider">React</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 1.4 },
                        x: { duration: 0.8, delay: 1.4, type: "spring" },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }
                    }}
                    className="absolute -right-6 top-40 md:-right-20 md:top-48 z-30 px-4 md:px-5 py-2 md:py-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] flex items-center gap-3 pointer-events-none"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                    <span className="text-white text-xs md:text-sm font-bold tracking-wider">Next.js</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 1.6 },
                        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }
                    }}
                    className="absolute left-10 -bottom-6 md:left-12 md:-bottom-10 z-30 px-4 md:px-5 py-2 md:py-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(92,235,110,0.15)] flex items-center gap-3 pointer-events-none"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(92,235,110,0.8)] animate-pulse" />
                    <span className="text-white text-xs md:text-sm font-bold tracking-wider">Node.js</span>
                </motion.div>

            </div>

            {/* Bottom info section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 text-left z-10 lg:pb-12 mt-10 md:mt-20 max-w-6xl"
            >
                <div className="max-w-md xl:max-w-lg">
                    {/* Removed text */}
                </div>
                <div className="max-w-xs flex flex-col items-start gap-6 lg:ml-auto">
                    <Link href="/#contact" className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                        <Button className="relative rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black hover:border-white text-white font-bold h-12 md:h-14 px-8 text-base transition-all shadow-[0_0_20px_rgba(92,235,110,0.1)] group-hover:shadow-[0_0_30px_rgba(92,235,110,0.4)]">
                            Contact Me <ArrowUpRight className="ml-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
