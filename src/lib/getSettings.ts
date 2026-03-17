import clientPromise from "@/lib/mongodb";
import { Settings } from "@/types";
import { cache } from "react";

export const getSettings = cache(async (): Promise<Settings | null> => {
    // Add dynamic to force dynamic if needed, but revalidatePath is better
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const settings = await db.collection("settings").findOne({ _id: "global-settings" as any });

        // If no settings found, return default (or null and handle default elsewhere)
        if (!settings) return null;

        return settings as unknown as Settings;
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return null;
    }
});
