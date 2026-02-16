"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import {
  ChevronLeft,
  GraduationCap,
  Briefcase,
  Code2,
  Database,
  Wrench,
  ShieldCheck,
  Cpu,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const skills = [
    {
      category: "Frontend Development",
      icon: Code2,
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend Development",
      icon: Cpu,
      tech: [
        "Node.js",
        "Express",
        "REST APIs",
        "Authentication (JWT/NextAuth)",
      ],
    },
    {
      category: "Database & ORM",
      icon: Database,
      tech: ["MongoDB", "PostgreSQL", "Database Design"],
    },
    {
      category: "Tools & DevOps",
      icon: Wrench,
      tech: [
        "Docker",
        "AWS",
        "Git/GitHub",
        "SEO Optimization",
        "System Architecture",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 glass">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium hover:text-emerald-400 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            PORTFOLIO
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-32 space-y-32">
        {/* Professional Story */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <ShieldCheck className="h-3 w-3" />
              <span>Verified Full Stack Excellence</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              Kidist <span className="text-emerald-400">Gashaw</span>
            </h1>
            <p className="text-2xl text-zinc-400 font-medium">
              Software Engineering Graduate & Full Stack Developer
            </p>

            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
              <p>
                I am a highly skilled and detail-oriented Full Stack Developer
                with strong experience in designing, developing, and deploying
                modern web applications. I specialize in building{" "}
                <span className="text-zinc-200 underline decoration-emerald-500/50">
                  scalable, secure, and high-performance systems
                </span>{" "}
                using 2026-standard technologies.
              </p>
              <p>
                My approach combines technical precision with a product-focused
                mindset, ensuring that every line of code contributes to a
                seamless and impactful user experience. Whether it's complex
                database architecture or pixel-perfect frontend interfaces, I
                strive for engineering excellence.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <div className="h-8 w-1 bg-emerald-500 rounded-full" />
              Technical Arsenal
            </h2>
            <p className="text-zinc-500">
              Mastering the stack to deliver production-ready solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 h-full hover:border-emerald-500/30 transition-all group">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{skill.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {skill.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Values */}
        <section className="py-16 border-t border-zinc-900 grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Academic Foundation</h2>
            <div className="space-y-2">
              <div className="font-bold text-lg text-emerald-400">
                B.Sc. in Software Engineering
              </div>
              <p className="text-zinc-500 leading-relaxed italic">
                Graduated with a focus on system architecture, algorithms, and
                collaborative software development cycles.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Core Strengths</h2>
            <ul className="space-y-3 text-zinc-400 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Detail-oriented system design
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Performance-first development
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Scalable database architecture
              </li>
            </ul>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="text-center py-24 space-y-8">
          <blockquote className="text-3xl lg:text-4xl font-serif italic text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            "I believe in building software that doesn't just work, but thrives
            under pressure."
          </blockquote>
          <Link href="/#contact">
            <Button
              size="lg"
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-12"
            >
              Start a Conversation
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs text-zinc-600">
            Kidist Gashaw | Portfolio 2026
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="#" className="hover:text-emerald-400">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              GitHub
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              CV / Resume
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
