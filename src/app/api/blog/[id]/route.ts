import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function isValidObjectId(id: string) {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid blog post ID" },
                { status: 400 },
            );
        }

        const client = await clientPromise;
        const db = client.db("portfolio");
        const post = await db
            .collection("blog")
            .findOne({ _id: new ObjectId(id) });

        if (!post) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(post);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid blog post ID" },
                { status: 400 },
            );
        }

        const client = await clientPromise;
        const db = client.db("portfolio");
        const body = await request.json();

        // Auto-regenerate excerpt if content changed
        if (body.content) {
            body.excerpt =
                body.content.length > 160
                    ? body.content.substring(0, 160) + "..."
                    : body.content;
        }

        const updateDoc = {
            $set: {
                ...body,
                updatedAt: new Date(),
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (updateDoc.$set as any)._id;

        const result = await db
            .collection("blog")
            .updateOne({ _id: new ObjectId(id) }, updateDoc);

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ message: "Blog post updated successfully" });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid blog post ID" },
                { status: 400 },
            );
        }

        const client = await clientPromise;
        const db = client.db("portfolio");

        const result = await db
            .collection("blog")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ message: "Blog post deleted successfully" });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 },
        );
    }
}
