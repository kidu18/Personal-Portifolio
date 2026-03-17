"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Project, BlogPost } from "@/types";
import { useSettings } from "@/components/SettingsProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Section Components
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const settings = useSettings();
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

    if (settings?.features.showProjects) fetchProjects();
    if (settings?.features.showBlog) fetchBlogPosts();
  }, [settings]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <main className="flex-1">
        {/* Liquid Diamond Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center">
            {/* Dark base to ensure text readability */}
            <div className="absolute inset-0 bg-[#060907]" />
            
            {/* The bright liquid diamond */}
            <motion.div
                animate={{
                    rotate: [45, 135, 225, 315, 405],
                    borderRadius: ["10%", "30%", "20%", "40%", "10%"],
                    scale: [1, 1.1, 0.9, 1.05, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] blur-[100px] md:blur-[140px] opacity-40 mix-blend-screen"
                style={{
                    background: "radial-gradient(circle at center, rgba(92,235,110,0.8) 0%, rgba(92,235,110,0.4) 30%, rgba(0,255,150,0.2) 60%, transparent 80%)",
                }}
            />

            {/* A secondary floating, liquid orb to add depth */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                    rotate: [0, 90, 180, 0],
                    borderRadius: ["40%", "20%", "50%", "40%"]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] blur-[90px] opacity-30 mix-blend-screen"
                style={{
                    background: "radial-gradient(circle at center, rgba(20,200,100,0.5) 0%, transparent 70%)",
                }}
            />

            {/* A third floating orb for extra ambient glow */}
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] blur-[120px] opacity-20 mix-blend-screen"
                style={{
                    background: "radial-gradient(circle at center, rgba(0,250,150,0.6) 0%, transparent 60%)",
                }}
            />
            
            {/* Grid overlay for texture */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
        </div>

        <Hero />

        {settings?.features.showProjects && (
          <Projects projects={projects} loading={loadingProjects} />
        )}

        <Services />

        {settings?.features.showBlog && (
          <Blog posts={blogPosts} loading={loadingBlog} />
        )}


        <Contact />
      </main>

      <Footer />
    </div>
  );
}
