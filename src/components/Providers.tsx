"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SettingsProvider } from "./SettingsProvider";
import { Settings } from "@/types";

export function Providers({ children, settings }: { children: React.ReactNode; settings: Settings | null }) {
  return (
    <SessionProvider>
      <SettingsProvider settings={settings}>
        <ThemeProvider attribute="class" defaultTheme={settings?.theme.mode || "dark"} enableSystem={false}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </SessionProvider>
  );
}
