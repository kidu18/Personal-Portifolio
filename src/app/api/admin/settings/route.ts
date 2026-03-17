import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Settings } from "@/types";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");

        // Find the global settings document
        const settings = await db.collection("settings").findOne({ _id: "global-settings" as any });

        if (!settings) {
            // Return default settings if none exist
            const defaultSettings: Settings = {
                profile: {
                    name: "",
                    title: "",
                    bio: "",
                    avatarUrl: "",
                    resumeUrl: "",
                },
                seo: {
                    title: "My Portfolio",
                    description: "Welcome to my personal portfolio.",
                    keywords: [],
                    ogImage: "",
                },
                features: {
                    showBlog: true,
                    showProjects: true,
                    showTestimonials: true,
                    openToWork: true,
                },
                theme: {
                    mode: "dark",
                },
                integrations: {
                    googleAnalyticsId: "",
                },
            };
            return NextResponse.json(defaultSettings);
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const data = await request.json();

        // Validate data structure here if needed (using Zod or manual checks)
        // For now, we'll assume the client sends correct data matching the interface

        // Upsert settings (update if exists, insert if not)
        // using a fixed ID or finding the first document
        // simpler to just delete all and insert one, or updateOne with upsert: true on a known field?
        // standard pattern for single-document settings: findOneAndUpdate with upsert

        // We can use a constant ID or just rely on there being only one document.
        // Let's use a constant ID for singleton pattern: "global-settings"

        const settingsId = "global-settings";

        const updateResult = await db.collection("settings").updateOne(
            { _id: settingsId as any }, // Cast to any to avoid ObjectID issues with string ID
            {
                $set: {
                    ...data,
                    updatedAt: new Date(),
                    _id: settingsId
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        // Revalidate the pages that use settings
        revalidatePath("/", "layout");
        revalidatePath("/about");

        return NextResponse.json({ success: true, result: updateResult });
    } catch (error) {
        console.error("Failed to update settings:", error);
        return NextResponse.json(
            { error: "Failed to update settings" },
            { status: 500 }
        );
    }
}
