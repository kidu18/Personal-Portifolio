
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { getSettings } from "@/lib/getSettings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.seo.title || "Kidist Gashaw | Full Stack Developer",
    description:
      settings?.seo.description || "Highly skilled and detail-oriented Full Stack Developer specializing in scalable, secure, and high-performance web applications.",
    openGraph: {
      images: settings?.seo.ogImage ? [settings.seo.ogImage] : [],
    },
    keywords: settings?.seo.keywords || [],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers settings={settings}>{children}</Providers>
        {settings?.integrations.googleAnalyticsId && (
          <>
            {/* Google Analytics Script could go here if using next/script */}
          </>
        )}
      </body>
    </html>
  );
}
