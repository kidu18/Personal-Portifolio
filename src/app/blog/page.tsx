"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (date?: Date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl space-y-6 mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                        <FileText className="h-3 w-3" />
                        <span>Thoughts &amp; Insights</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        From the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Developer&apos;s Desk
                        </span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                        Articles about web development, software engineering, and the
                        technologies I work with. Sharing lessons learned and ideas worth
                        exploring.
                    </p>
                </motion.div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full border-4 border-zinc-800 border-t-emerald-500 animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            </div>
                        </div>
                        <p className="text-zinc-500 animate-pulse">
                            Loading Blog Posts...
                        </p>
                    </div>
                ) : posts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30"
                    >
                        <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                            <Sparkles className="h-10 w-10 text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                        <p className="text-zinc-400 max-w-md">
                            I&apos;m currently writing my first articles. Check back soon for
                            fresh content!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {posts.map((post, i) => (
                                <motion.div
                                    key={post._id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <Link href={`/blog/${post._id}`}>
                                        <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-500 h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer">
                                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-zinc-800/50">
                                                {post.image ? (
                                                    <>
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                                                    </>
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-zinc-700">
                                                        <FileText className="h-12 w-12 opacity-20" />
                                                    </div>
                                                )}
                                            </div>

                                            <CardHeader className="space-y-3 pb-2">
                                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDate(post.createdAt)}</span>
                                                </div>
                                                <CardTitle className="text-2xl font-bold group-hover:text-emerald-400 transition-colors">
                                                    {post.title}
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent className="flex-1">
                                                <CardDescription className="text-zinc-400 leading-relaxed text-base line-clamp-3">
                                                    {post.excerpt || post.content?.substring(0, 160)}
                                                </CardDescription>
                                            </CardContent>

                                            <CardFooter className="pt-2 mt-auto">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-between hover:bg-zinc-800 group/btn"
                                                >
                                                    <span className="text-zinc-400 group-hover/btn:text-emerald-400 transition-colors">
                                                        Read Article
                                                    </span>
                                                    <ArrowRight className="h-4 w-4 text-zinc-600 group-hover/btn:text-emerald-400 transition-colors group-hover/btn:translate-x-1" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
