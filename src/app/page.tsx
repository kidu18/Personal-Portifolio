"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  ArrowRight,
  Layout,
  Server,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Quote,
  FileText,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Project, BlogPost } from "@/types";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO, TechFlow",
    content:
      "Kidist's attention to detail and technical expertise transformed our vision into a high-performance reality.",
  },
  {
    name: "Sarah Miller",
    role: "Proprietor, Heritage Hub",
    content:
      "The E-commerce platform Kidist built for us saw a 40% increase in conversion within the first month!",
  },
];

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchProjects();
    fetchBlogPosts();
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setFormStatus("Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send. Please try again.");
      }
    } catch {
      setFormStatus("Failed to send. Please try again.");
    }
    setTimeout(() => setFormStatus(""), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 glass">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            KIDIST GASHAW
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/about"
              className="hover:text-emerald-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="hover:text-emerald-400 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="hover:text-emerald-400 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#services"
              className="hover:text-emerald-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="hover:text-emerald-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#10b98110_0,transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl space-y-8"
            >
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
                Architecting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  future-proof
                </span>{" "}
                digital systems.
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                I&apos;m{" "}
                <span className="text-emerald-400 font-medium">
                  Kidist Gashaw
                </span>
                , a Software Engineer and Full Stack Developer. I specialize in
                building scalable, secure, and high-performance applications
                that drive real business value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#contact">
                  <Button
                    size="lg"
                    className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-8 w-full sm:w-auto"
                  >
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-zinc-800 hover:bg-zinc-900 text-zinc-50 px-8 w-full sm:w-auto"
                  >
                    Check Portfolio
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-16 px-2">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight underline decoration-emerald-500/50 underline-offset-8">
                  Featured Case Studies
                </h2>
                <p className="text-zinc-400 text-lg">
                  A selection of industrial-grade applications.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loadingProjects ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <p>No projects to display yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <motion.div
                    key={project._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="bg-zinc-900/50 border-zinc-800 group hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden">
                      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-zinc-600">
                            No Preview
                          </div>
                        )}
                      </div>
                      <CardHeader className="space-y-4">
                        <CardTitle className="text-xl font-bold">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-zinc-400 leading-relaxed min-h-[60px]">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex flex-wrap gap-2 pt-0 mt-auto">
                        {project.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags && project.tags.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs font-medium">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                My Expertise
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Providing high-impact technical solutions for modern businesses.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Website Development",
                  desc: "Building high-speed, SEO-optimized, and premium responsive websites using Next.js 16 and Tailwind CSS.",
                  icon: Layout,
                },
                {
                  title: "Application Development",
                  desc: "Developing robust cloud-native applications with seamless user experiences and real-time features.",
                  icon: Sparkles,
                },
                {
                  title: "System Development",
                  desc: "Architecting scalable backend systems, database designs, and secure authentication flows.",
                  icon: Server,
                },
              ].map((service) => (
                <Card
                  key={service.title}
                  className="bg-zinc-950/50 border-zinc-800 hover:border-emerald-500/30 transition-all"
                >
                  <CardContent className="pt-8 space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-100">
                      {service.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed text-lg">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-16 px-2">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight underline decoration-emerald-500/50 underline-offset-8">
                  Latest from the Blog
                </h2>
                <p className="text-zinc-400 text-lg">
                  Thoughts, tutorials, and insights from my journey.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loadingBlog ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <p>No blog posts yet. Stay tuned!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, i) => (
                  <motion.div
                    key={post._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/blog/${post._id}`}>
                      <Card className="bg-zinc-900/50 border-zinc-800 group hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/5">
                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                          {post.image ? (
                            <>
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full text-zinc-700">
                              <FileText className="h-12 w-12 opacity-20" />
                            </div>
                          )}
                        </div>
                        <CardHeader className="space-y-3">
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          <CardTitle className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-zinc-400 leading-relaxed line-clamp-2 min-h-[48px]">
                            {post.excerpt || post.content?.substring(0, 120)}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto pt-0">
                          <span className="text-sm text-emerald-400 group-hover:underline flex items-center gap-2">
                            Read Article <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                          </span>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight">
                  Voices of Success
                </h2>
                <p className="text-zinc-400 text-lg">
                  Feedback from clients and teammates I&apos;ve collaborated
                  with.
                </p>
              </div>
              <div className="grid gap-6">
                {testimonials.map((t) => (
                  <Card
                    key={t.name}
                    className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm"
                  >
                    <CardContent className="p-8 space-y-4">
                      <Quote className="h-10 w-10 text-emerald-400/20" />
                      <p className="text-zinc-200 text-lg italic leading-relaxed">
                        &quot;{t.content}&quot;
                      </p>
                      <div className="pt-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-zinc-800" />
                        <div>
                          <div className="font-bold">{t.name}</div>
                          <div className="text-sm text-zinc-400">{t.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tighter">
                  Let&apos;s build <br /> something{" "}
                  <span className="text-emerald-400">great</span> together.
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Have a project in mind or just want to chat? I&apos;m always
                  open to new opportunities and technical discussions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <Mail className="h-5 w-5 text-emerald-400" />
                    <span>kidist@example.com</span>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-zinc-900 border-zinc-800 hover:text-emerald-400"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-zinc-900 border-zinc-800 hover:text-emerald-400"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <Card className="bg-zinc-950 border-zinc-800 border-2">
                <form onSubmit={handleContactSubmit} className="p-8 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      className="bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-500"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-500"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Message</label>
                    <textarea
                      className="w-full min-h-[120px] rounded-md bg-zinc-900 border border-zinc-800 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all"
                      placeholder="Tell me about your project..."
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-6"
                    disabled={formStatus === "Sending..."}
                  >
                    {formStatus || "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="font-bold text-lg tracking-tighter text-emerald-400">
              KIDIST GASHAW
            </div>
            <p className="text-xs text-zinc-500">
              Full Stack Engineering Excellence.
            </p>
          </div>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Kidist Gashaw. Handcrafted in 2026.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="#" className="hover:text-emerald-400">
              Twitter
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
