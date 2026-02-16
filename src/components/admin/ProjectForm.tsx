"use client";

import { useState } from "react";
import { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { X, Plus, Trash2, Upload, Image as ImageIcon, Loader2, Save } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    link: initialData?.link || "",
    image: initialData?.image || "",
    tags: initialData?.tags || [],
    features: initialData?.features || [],
  });

  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index),
    });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="w-full max-w-4xl mx-auto border-zinc-800 bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b border-zinc-800 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {initialData ? "Edit Project" : "Create New Project"}
                </CardTitle>
                <CardDescription className="text-zinc-400 mt-2">
                  Fill in the details below to showcase your work.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCancel}
                className="hover:bg-red-500/10 hover:text-red-500 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 pt-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column: Basic Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. E-Commerce Platform"
                    className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    Project Link <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      placeholder="https://..."
                      className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-emerald-500 pl-4"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    Description
                  </label>
                  <textarea
                    className="flex min-h-[160px] w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe the project's goals, challenges, and solutions..."
                  />
                </div>
              </div>

              {/* Right Column: Media & Meta */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    Project Image <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-zinc-800 rounded-lg p-4 transition-colors hover:border-emerald-500/50 bg-zinc-900/20">
                    {formData.image ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-md group">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              setFormData({ ...formData, image: "" })
                            }
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                        <div className="p-4 rounded-full bg-zinc-900 text-zinc-500">
                          <Upload className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-zinc-300">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-zinc-500">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById("image-upload")?.click()
                          }
                          className="border-zinc-700 hover:bg-zinc-800"
                        >
                          Select File
                        </Button>
                      </div>
                    )}
                  </div>
                  {!formData.image && (
                    <div className="flex gap-2">
                      <Input
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="Or paste image URL..."
                        className="bg-zinc-900/50 border-zinc-800 text-xs h-8"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      Technologies & Tags
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag (Press Enter)"
                        className="bg-zinc-900/50 border-zinc-800"
                        onKeyDown={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        size="icon"
                        className="bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-md bg-zinc-900/30 border border-zinc-800/50">
                      <AnimatePresence>
                        {formData.tags?.map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-zinc-700/50"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(i)}
                              className="text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      {(!formData.tags || formData.tags.length === 0) && (
                        <span className="text-xs text-zinc-600 self-center pl-1">
                          No tags added
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width: Key Features */}
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <label className="text-sm font-medium text-zinc-300">
                Key Features
              </label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a key feature..."
                  className="bg-zinc-900/50 border-zinc-800"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeature())
                  }
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  className="bg-zinc-800 hover:bg-zinc-700"
                >
                  Add Feature
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                <AnimatePresence>
                  {formData.features?.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="group bg-zinc-900/50 border border-zinc-800/50 px-4 py-3 rounded-md text-sm flex items-center justify-between hover:border-emerald-500/30 transition-colors"
                    >
                      <span className="text-zinc-400">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4 border-t border-zinc-800 pt-6 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialData ? "Update Project" : "Create Project"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
