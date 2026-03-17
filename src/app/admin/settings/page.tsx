"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Settings } from "@/types";
import { Save, User, Globe, Layout, Palette, Code, Upload, Lock } from "lucide-react";
import Image from "next/image";

// Mock Switch component if not available, or we will create it next
const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`
      relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
      ${checked ? "bg-primary" : "bg-input"}
    `}
    >
        <span
            className={`
        pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform
        ${checked ? "translate-x-5" : "translate-x-0"}
      `}
        />
    </button>
);

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [uploading, setUploading] = useState(false);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                alert("Settings saved successfully!");
            } else {
                alert("Failed to save settings.");
            }
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                if (settings) {
                    setSettings({
                        ...settings,
                        profile: { ...settings.profile, avatarUrl: data.url }
                    });
                }
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
            alert("Upload error");
        } finally {
            setUploading(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match");
            return;
        }
        setChangingPassword(true);
        try {
            const res = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (res.ok) {
                alert("Password changed successfully");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to change password");
            }
        } catch (error) {
            console.error("Password change error", error);
            alert("An error occurred");
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;
    if (!settings) return <div>Failed to load settings.</div>;

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "seo", label: "SEO", icon: Globe },
        { id: "features", label: "Features", icon: Layout },
        { id: "theme", label: "Theme", icon: Palette },
        { id: "integrations", label: "Integrations", icon: Code },
        { id: "security", label: "Security", icon: Lock },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio configuration and preferences.
                    </p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Tabs */}
                <aside className="w-full md:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === tab.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted"
                                }
              `}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {activeTab === "profile" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details displayed on the portfolio.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border">
                                        {settings.profile.avatarUrl ? (
                                            <Image
                                                src={settings.profile.avatarUrl}
                                                alt="Avatar"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                                <User className="h-10 w-10 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" size="sm" className="relative" disabled={uploading}>
                                            <Input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleFileUpload}
                                                accept="image/*"
                                            />
                                            <Upload className="mr-2 h-4 w-4" />
                                            {uploading ? "Uploading..." : "Change Avatar"}
                                        </Button>
                                        <p className="text-xs text-muted-foreground">Recommended: Square JPG, PNG. Max 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input
                                        value={settings.profile.name}
                                        onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, name: e.target.value } })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <Input
                                        value={settings.profile.title}
                                        onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, title: e.target.value } })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Bio</label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={settings.profile.bio}
                                        onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, bio: e.target.value } })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Resume URL</label>
                                    <Input
                                        value={settings.profile.resumeUrl}
                                        onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, resumeUrl: e.target.value } })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "seo" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Configuration</CardTitle>
                                <CardDescription>Manage default meta tags for search engine optimization.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Default Title</label>
                                    <Input
                                        value={settings.seo.title}
                                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Default Description</label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={settings.seo.description}
                                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">OG Image URL</label>
                                    <Input
                                        value={settings.seo.ogImage}
                                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, ogImage: e.target.value } })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "features" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Feature Flags</CardTitle>
                                <CardDescription>Enable or disable specific sections of your portfolio.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-medium">Show Blog</label>
                                        <p className="text-xs text-muted-foreground">Enable the blog section on the public site.</p>
                                    </div>
                                    <Switch
                                        checked={settings.features.showBlog}
                                        onCheckedChange={(c) => setSettings({ ...settings, features: { ...settings.features, showBlog: c } })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-medium">Show Projects</label>
                                        <p className="text-xs text-muted-foreground">Enable the projects section.</p>
                                    </div>
                                    <Switch
                                        checked={settings.features.showProjects}
                                        onCheckedChange={(c) => setSettings({ ...settings, features: { ...settings.features, showProjects: c } })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-medium">Show Testimonials</label>
                                        <p className="text-xs text-muted-foreground">Enable the testimonials section.</p>
                                    </div>
                                    <Switch
                                        checked={settings.features.showTestimonials}
                                        onCheckedChange={(c) => setSettings({ ...settings, features: { ...settings.features, showTestimonials: c } })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-medium">Open to Work</label>
                                        <p className="text-xs text-muted-foreground">Display an "Open to Work" badge on your profile.</p>
                                    </div>
                                    <Switch
                                        checked={settings.features.openToWork}
                                        onCheckedChange={(c) => setSettings({ ...settings, features: { ...settings.features, openToWork: c } })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "theme" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme Settings</CardTitle>
                                <CardDescription>Customize the look and feel of your portfolio.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Default Mode</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={settings.theme.mode}
                                        onChange={(e) => setSettings({ ...settings, theme: { ...settings.theme, mode: e.target.value as any } })}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "integrations" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Integrations</CardTitle>
                                <CardDescription>Connect external services and APIs.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Google Analytics ID</label>
                                    <Input
                                        value={settings.integrations.googleAnalyticsId}
                                        onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, googleAnalyticsId: e.target.value } })}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Security</CardTitle>
                                <CardDescription>Manage your account security.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Current Password</label>
                                    <Input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">New Password</label>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <Button onClick={handleChangePassword} disabled={changingPassword}>
                                    {changingPassword ? "Changing..." : "Change Password"}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
