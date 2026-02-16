"use client";

import { useState } from "react";
import { BlogPost } from "@/types";
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
import { X, Trash2, Upload, Loader2, Save } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogFormProps {
    initialData?: BlogPost;
    onSubmit: (data: Partial<BlogPost>) => Promise<void>;
    onCancel: () => void;
}

export function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: initialData?.title || "",
        content: initialData?.content || "",
        image: initialData?.image || "",
    });

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
                                    {initialData ? "Edit Blog Post" : "Create New Blog Post"}
                                </CardTitle>
                                <CardDescription className="text-zinc-400 mt-2">
                                    Write your blog post content below.
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
                            {/* Left Column: Text Content */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">
                                        Post Title <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        placeholder="e.g. Getting Started with Next.js"
                                        className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-emerald-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">
                                        Content <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className="flex min-h-[320px] w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all resize-none"
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({ ...formData, content: e.target.value })
                                        }
                                        placeholder="Write your blog post content here..."
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">
                                        Cover Image{" "}
                                        <span className="text-zinc-500">(optional)</span>
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
                                                    id="blog-image-upload"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        document
                                                            .getElementById("blog-image-upload")
                                                            ?.click()
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

                                {/* Preview excerpt */}
                                {formData.content && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">
                                            Preview Excerpt
                                        </label>
                                        <div className="p-3 rounded-md bg-zinc-900/50 border border-zinc-800/50">
                                            <p className="text-xs text-zinc-400 leading-relaxed">
                                                {formData.content!.length > 160
                                                    ? formData.content!.substring(0, 160) + "..."
                                                    : formData.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
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
                                    {initialData ? "Update Post" : "Publish Post"}
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
}
