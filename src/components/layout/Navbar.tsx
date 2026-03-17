"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/components/SettingsProvider";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
    const settings = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Me" },
        { href: "/#services", label: "Services" },
        ...(settings?.features.showProjects ? [{ href: "/projects", label: "My Work" }] : []),
        ...(settings?.features.showBlog ? [{ href: "/blog", label: "Blog" }] : []),
    ];

    const isActive = (path: string) => {
        if (path === "/" && pathname !== "/") return false;
        if (path.startsWith("/#")) return false; // Basic hash handling
        return pathname === path || (path !== "/" && pathname?.startsWith(path));
    };

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
            <nav className="rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="px-3 py-3 md:px-4 md:py-2 flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-primary-foreground group transition-transform hover:scale-105"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-90 transition-transform duration-500">
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
                            </svg>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium transition-all rounded-full flex items-center gap-2 group",
                                        active ? "text-white bg-white/5" : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {active && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Contact CTA */}
                    <div className="hidden md:flex items-center">
                        <Link href="/#contact">
                            <Button
                                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 group"
                            >
                                Contact Me
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative h-10 w-10 rounded-full hover:bg-white/10 text-white">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isOpen ? "close" : "open"}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </motion.div>
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden rounded-b-3xl"
                        >
                            <div className="flex flex-col p-4 space-y-2 bg-black/60 backdrop-blur-3xl border-t border-white/5 mt-2 rounded-3xl mx-2 mb-2">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-3",
                                                isActive(link.href)
                                                    ? "text-primary bg-primary/10"
                                                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {isActive(link.href) && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    className="pt-4 mt-2 border-t border-white/10"
                                >
                                    <Link href="/#contact" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20">
                                            Contact Me
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
