import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("portfolio");

        const [totalProjects, totalBlogs, totalMessages, unreadMessages] =
            await Promise.all([
                db.collection("projects").countDocuments(),
                db.collection("blog").countDocuments(),
                db.collection("messages").countDocuments(),
                db.collection("messages").countDocuments({ read: false }),
            ]);

        return NextResponse.json({
            totalProjects,
            totalBlogs,
            totalMessages,
            unreadMessages,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
