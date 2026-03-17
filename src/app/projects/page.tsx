"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types";
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
import { ExternalLink, ArrowRight, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 relative">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 pt-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-6 mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Code2 className="h-3 w-3" />
              <span>Portfolio & Case Studies</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Curated{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Digital Experiences
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A collection of technical projects, full-stack applications, and
              experimental interfaces I&apos;ve built to solve real-world problems.
            </p>
          </motion.div>

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              </div>
              <p className="text-muted-foreground animate-pulse">Loading Projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border rounded-2xl bg-muted/30"
            >
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Work in Progress</h3>
              <p className="text-muted-foreground max-w-md">
                I&apos;m currently updating my portfolio with my latest work. Check back soon for new case studies.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {projects.map((project, i) => (
                  <motion.div
                    key={project._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Card className="bg-card/40 border-border/50 backdrop-blur-sm group hover:border-primary/30 transition-all duration-500 h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-primary/10">
                      <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border/50">
                        {project.image ? (
                          <>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <Code2 className="h-12 w-12 opacity-20" />
                          </div>
                        )}

                        {/* Floating Link Button */}
                        <Link
                          href={project.link}
                          target="_blank"
                          className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>

                      <CardHeader className="space-y-3 pb-2">
                        <div className="flex justify-between items-start gap-4">
                          <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md bg-primary/5 text-primary/80 border border-primary/10 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 space-y-4">
                        <CardDescription className="text-muted-foreground leading-relaxed text-base line-clamp-3">
                          {project.description}
                        </CardDescription>

                        {project.features && project.features.length > 0 && (
                          <div className="pt-2 border-t border-border/50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Features</p>
                            <ul className="grid gap-1">
                              {project.features.slice(0, 2).map((feature, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="h-1 w-1 rounded-full bg-primary" />
                                  <span className="truncate">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="pt-2 mt-auto">
                        <Link
                          href={project.link}
                          target="_blank"
                          className="w-full"
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-between hover:bg-accent group/btn"
                          >
                            <span className="text-muted-foreground group-hover/btn:text-primary transition-colors">View Live Project</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
