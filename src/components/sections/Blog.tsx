"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogProps {
    posts: BlogPost[];
    loading: boolean;
    showAllLink?: boolean;
}

export function Blog({ posts, loading, showAllLink = true }: BlogProps) {
    return (
        <Section id="blog" className="border-t border-border">
            <div className="flex justify-between items-end mb-16 px-2">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight underline decoration-primary/50 underline-offset-8">
                        Latest from the Blog
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Thoughts, tutorials, and insights from my journey.
                    </p>
                </div>
                {showAllLink && (
                    <Link
                        href="/blog"
                        className="text-primary hover:text-primary/80 flex items-center gap-2"
                    >
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No blog posts yet. Stay tuned!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post._id || i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: i * 0.1 }}
                        >
                            <Link href={`/blog/${post._id}`}>
                                <Card className="bg-card/30 border-border group hover:border-primary/50 transition-all duration-500 h-full flex flex-col overflow-hidden cursor-pointer relative isolate">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                        {post.image ? (
                                            <>
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-foreground/50">
                                                <FileText className="h-12 w-12 opacity-20" />
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader className="space-y-3">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-2 min-h-[48px]">
                                            {post.excerpt || post.content?.substring(0, 120)}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="mt-auto pt-0">
                                        <span className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                            Read Article <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    );
}
