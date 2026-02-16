"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, FileText, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  totalMessages: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Projects",
      value: stats?.totalProjects ?? 0,
      icon: Briefcase,
      description: "Projects in portfolio",
      href: "/admin/projects",
    },
    {
      label: "Blog Posts",
      value: stats?.totalBlogs ?? 0,
      icon: FileText,
      description: "Published articles",
      href: "/admin/blog",
    },
    {
      label: "Messages",
      value: stats?.totalMessages ?? 0,
      icon: MessageSquare,
      description: `${stats?.unreadMessages ?? 0} unread`,
      href: "/admin/messages",
    },
    {
      label: "Visitors",
      value: "—",
      icon: Users,
      description: "Coming soon",
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-primary/50 transition-all cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/admin/projects">
              <Button variant="outline" size="sm" className="gap-2">
                <Briefcase className="h-4 w-4" /> Manage Projects
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" /> Manage Blog
              </Button>
            </Link>
            <Link href="/admin/messages">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" /> View Messages
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Activity feed coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
