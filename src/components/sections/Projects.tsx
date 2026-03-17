"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";
import { Project } from "@/types";

interface ProjectsProps {
    projects: Project[];
    loading: boolean;
    showAllLink?: boolean;
}

export function Projects({ projects, loading, showAllLink = true }: ProjectsProps) {
    return (
        <Section id="projects" className="border-t border-border">
            <div className="flex justify-between items-end mb-16 px-2">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight underline decoration-primary/50 underline-offset-8">
                        Featured Case Studies
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        A selection of industrial-grade applications.
                    </p>
                </div>
                {showAllLink && (
                    <Link
                        href="/projects"
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
            ) : projects.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No projects to display yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project._id || i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: i * 0.1 }}
                        >
                            <Card className="bg-card/30 border-border group hover:border-primary/50 transition-all duration-500 h-full flex flex-col overflow-hidden relative isolate">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            No Preview
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>
                                <CardHeader className="space-y-4">
                                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground leading-relaxed min-h-[60px] line-clamp-2">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex flex-wrap gap-2 pt-0 mt-auto">
                                    {project.tags?.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    );
}
