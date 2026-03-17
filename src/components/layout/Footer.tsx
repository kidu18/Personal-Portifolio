"use client";

import Link from "next/link";
import { useSettings } from "@/components/SettingsProvider";

export function Footer() {
    const settings = useSettings();

    return (
        <footer className="border-t border-border py-12 bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                    <div className="font-bold text-lg tracking-tighter text-primary">
                        {settings?.profile.name.toUpperCase() || "PORTFOLIO"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {settings?.profile.title || "Full Stack Engineering Excellence."}
                    </p>
                </div>
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {settings?.profile.name || "Kidist Gashaw"}. Handcrafted in 2026.
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary">
                        Twitter
                    </Link>
                    <Link href="#" className="hover:text-primary">
                        LinkedIn
                    </Link>
                    <Link href="#" className="hover:text-primary">
                        GitHub
                    </Link>
                </div>
            </div>
        </footer>
    );
}
