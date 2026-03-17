"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import {
  GraduationCap,
  Code2,
  Database,
  Wrench,
  ShieldCheck,
  Cpu,
  Sparkles,
  ChevronLeft,
  UserCircle2,
  Laptop,
} from "lucide-react";
import Image from "next/image";
import { useSettings } from "@/components/SettingsProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  const settings = useSettings();

  const skills = [
    {
      category: "Full-Stack Development",
      icon: Code2,
      tech: ["MERN Stack", "Next.js (App Router)", "TypeScript", "Node.js", "Express.js"],
    },
    {
      category: "Frontend Engineering",
      icon: Sparkles,
      tech: ["React", "Tailwind CSS", "Framer Motion", "SEO Optimization", "Performance/Accessibility"],
    },
    {
      category: "Backend & Infrastructure",
      icon: Database,
      tech: ["MongoDB Atlas", "REST APIs", "Secure Authentication", "Vercel Deployment", "CI/CD"],
    },
    {
      category: "Entrepreneurial Engineering",
      icon: Wrench,
      tech: [
        "MVP Strategy",
        "Business Strategy",
        "Growth-Driven Design",
        "Digital Transformation",
        "System Scalability",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-32 space-y-32">
        {/* Professional Story */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-32 w-32 rounded-full border-2 border-primary/20 p-1 glass shrink-0 shadow-2xl"
            >
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src={settings?.profile.avatarUrl || "/uploads/1772008039691_my_img.jpg"}
                  alt={settings?.profile.name || "Kidist Gashaw"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-background border border-border rounded-full flex items-center justify-center shadow-lg">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </motion.div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 backdrop-blur-sm">
                <UserCircle2 className="h-3.5 w-3.5" />
                <span>Founder of Rokina Startup</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                {settings?.profile.name.split(" ")[0] || "Kidist"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">{settings?.profile.name.split(" ")[1] || "Gashaw"}</span>
              </h1>
            </div>
          </div>
          <p className="text-2xl text-muted-foreground font-medium">
            Software Engineering Graduate & Entrepreneur
          </p>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              I am a Software Engineering graduate from Arba Minch University and Full-Stack Developer with over two years of hands-on experience building scalable, production-ready web applications. As the{" "}
              <span className="text-foreground underline decoration-primary/50 font-semibold">
                Founder of Rokina Startup
              </span>{" "}
              , I combine technical expertise with entrepreneurial execution — delivering digital products that are not only functional, but strategically aligned with business growth.
            </p>
            <p>
              I specialize in modern JavaScript ecosystems, crafting high-performance applications using MERN and Next.js architectures. My focus goes beyond writing code — I solve business problems, optimize performance, and design systems that scale.
            </p>
            <p>
              I work with startups, entrepreneurs, and business owners globally who need reliable, scalable, and conversion-driven web solutions.
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <div className="h-8 w-1 bg-primary rounded-full" />
              The Value I Bring
            </h2>
            <p className="text-muted-foreground">
              I don&apos;t just build websites — I build digital assets that generate revenue and scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary">Strategic Implementation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I translate complex business requirements into scalable technical solutions, ensuring your product is built for growth from day one.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary">Performance & Retention</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimizing for speed, SEO, and accessibility isn&apos;t an afterthought — it&apos;s a core part of my engineering process to maximize user retention.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Arsenal */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <div className="h-8 w-1 bg-primary rounded-full" />
              Technical Arsenal
            </h2>
            <p className="text-muted-foreground">
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
                <Card className="bg-card/50 border-border h-full hover:border-primary/30 transition-all group">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{skill.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {skill.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors"
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

        {/* Why Work With Me */}
        <section className="py-16 border-t border-border grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <UserCircle2 className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Why Partner With Me?</h2>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="h-2.5 w-2.5 mt-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_var(--primary)]" />
                <span>Founder-level product thinking and MVP strategy.</span>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="h-2.5 w-2.5 mt-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_var(--primary)]" />
                <span>Long-term scalability mindset — not short-term fixes.</span>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="h-2.5 w-2.5 mt-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_var(--primary)]" />
                <span>Strong communication and structured project execution.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Academic Foundation</h2>
            <div className="space-y-4">
              <div className="font-bold text-xl text-primary">
                B.Sc. in Software Engineering
              </div>
              <div className="font-semibold text-lg text-foreground">
                Arba Minch University
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                A solid foundation in system architecture, algorithmic complexity, and collaborative software development lifecycles. I build with theoretical depth and practical agility.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="text-center py-24 space-y-8">
          <blockquote className="text-3xl lg:text-4xl font-serif italic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            &quot;I approach every project as a partnership — focused on delivering measurable impact, not just completed tasks.&quot;
          </blockquote>
          <Link href="/#contact">
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12"
            >
              Let&apos;s Build Something Scalable
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div >
  );
}
