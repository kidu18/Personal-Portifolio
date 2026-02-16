"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Search,
  LayoutGrid,
  List,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = () => {
    setCurrentProject(undefined);
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      if (currentProject?._id) {
        await fetch(`/api/projects/${currentProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setIsEditing(false);
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project", error);
      throw error;
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/admin/projects" onClick={() => setIsEditing(false)} className="hover:text-primary transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{currentProject ? "Edit Project" : "New Project"}</span>
        </div>
        <ProjectForm
          initialData={currentProject}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your portfolio projects and case studies.
          </p>
        </div>
        <Button onClick={handleCreate} className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/50 p-4 rounded-lg border border-border/50">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-md bg-background border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex items-center gap-2 bg-background/50 p-1 rounded-md border border-border/50">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-card/30"
        >
          <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
            <LayoutGrid className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchQuery
              ? "Try adjusting your search query."
              : "Get started by creating your first project showcase."}
          </p>
          <Button onClick={handleCreate} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Create Project
          </Button>
        </motion.div>
      ) : (
        <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {viewMode === "grid" ? (
                  // Grid View
                  <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/50">
                          <ImageIcon className="h-8 w-8 opacity-50" />
                        </div>
                      )}

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(project)}
                          className="h-8 px-3 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(project._id!, project.title)}
                          className="h-8 px-3 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold truncate" title={project.title}>
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex flex-wrap gap-1 max-w-[70%]">
                          {project.tags?.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // List View
                  <div className="group flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
                    <div className="relative h-16 w-28 rounded-md overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground bg-secondary">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <h3 className="font-semibold truncate">{project.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                      </div>

                      <div className="hidden md:flex md:col-span-4 gap-1 flex-wrap">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-secondary rounded-full text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="hidden md:flex md:col-span-2 items-center text-xs text-muted-foreground">
                        {project.link ? (
                          <Link href={project.link} target="_blank" className="flex items-center hover:text-primary hover:underline">
                            <ExternalLink className="h-3 w-3 mr-1" /> Link
                          </Link>
                        ) : "-"}
                      </div>

                      <div className="md:col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(project)}
                          className="h-8 w-8 hover:text-blue-400"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(project._id!, project.title)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
