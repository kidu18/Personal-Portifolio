"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
            <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                        </div>
                        <p className="text-muted-foreground animate-pulse">Loading...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto">
                            <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold">Post Not Found</h2>
                        <p className="text-muted-foreground max-w-md">
                            The blog post you&apos;re looking for doesn&apos;t exist or has been
                            removed.
                        </p>
                        <Link href="/blog">
                            <Button
                                variant="outline"
                                className="border-border hover:bg-accent"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 relative">
                {/* Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
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
                            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
                        </div>
                    )}

                    <div
                        className={`max-w-4xl mx-auto px-6 ${post.image ? "-mt-32 relative z-10" : "pt-32"}`}
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
                                    className="text-muted-foreground hover:text-primary hover:bg-accent/50 -ml-4"
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
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                {post.title}
                            </h1>
                            <div className="h-px bg-gradient-to-r from-primary/50 via-cyan-500/30 to-transparent" />
                        </motion.div>

                        {/* Post Content */}
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="pb-24"
                        >
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground/90 prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
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
            </main>

            <Footer />
        </div>
    );
}
