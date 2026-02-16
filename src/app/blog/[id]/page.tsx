"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();
                setPost(data);
            } catch (err) {
                console.error("Failed to fetch blog post", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    const formatDate = (date?: Date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full border-4 border-zinc-800 border-t-emerald-500 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                    <p className="text-zinc-500 animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center mx-auto">
                        <FileText className="h-10 w-10 text-zinc-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Post Not Found</h2>
                    <p className="text-zinc-400 max-w-md">
                        The blog post you&apos;re looking for doesn&apos;t exist or has been
                        removed.
                    </p>
                    <Link href="/blog">
                        <Button
                            variant="outline"
                            className="border-zinc-700 hover:bg-zinc-800"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10">
                {/* Hero Image */}
                {post.image && (
                    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950" />
                    </div>
                )}

                <div
                    className={`max-w-4xl mx-auto px-6 ${post.image ? "-mt-32 relative z-10" : "pt-24"}`}
                >
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                        <Link href="/blog">
                            <Button
                                variant="ghost"
                                className="text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 -ml-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Post Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6 mb-12"
                    >
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                            {post.title}
                        </h1>
                        <div className="h-px bg-gradient-to-r from-emerald-500/50 via-cyan-500/30 to-transparent" />
                    </motion.div>

                    {/* Post Content */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="pb-24"
                    >
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-code:text-emerald-400 prose-code:bg-zinc-800/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                            {post.content.split("\n").map((paragraph, i) =>
                                paragraph.trim() ? (
                                    <p key={i}>{paragraph}</p>
                                ) : (
                                    <br key={i} />
                                ),
                            )}
                        </div>
                    </motion.article>
                </div>
            </div>
        </div>
    );
}
