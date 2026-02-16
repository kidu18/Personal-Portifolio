import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const posts = await db
            .collection("blog")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        return NextResponse.json(posts);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("portfolio");
        const body = await request.json();

        if (!body.title || !body.content) {
            return NextResponse.json(
                { error: "Missing required fields: title, content" },
                { status: 400 },
            );
        }

        const excerpt =
            body.content.length > 160
                ? body.content.substring(0, 160) + "..."
                : body.content;

        const { _id, ...postData } = body;

        const newPost = {
            ...postData,
            excerpt,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("blog").insertOne(newPost);
        return NextResponse.json(
            { ...newPost, _id: result.insertedId },
            { status: 201 },
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 },
        );
    }
}
