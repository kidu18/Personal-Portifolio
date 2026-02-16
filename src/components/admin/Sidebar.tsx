"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  FileText,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Projects",
    icon: Briefcase,
    href: "/admin/projects",
  },
  {
    label: "Blog",
    icon: FileText,
    href: "/admin/blog",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r w-64 p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="h-8 w-8 rounded-lg bg-primary" />
        <span className="font-bold text-xl">Admin Panel</span>
      </div>
      <div className="flex-1 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === route.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => signOut()}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
}
