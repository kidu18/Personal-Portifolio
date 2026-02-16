import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function isValidObjectId(id: string): boolean {
    try {
        new ObjectId(id);
        return true;
    } catch {
        return false;
    }
}

// PUT - Admin only: mark message as read/unread
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid message ID" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("portfolio");
        const body = await request.json();

        const result = await db
            .collection("messages")
            .updateOne({ _id: new ObjectId(id) }, { $set: { read: body.read } });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Message updated successfully" });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to update message" },
            { status: 500 }
        );
    }
}

// DELETE - Admin only: delete a message
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid message ID" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("portfolio");

        const result = await db
            .collection("messages")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Message deleted successfully" });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to delete message" },
            { status: 500 }
        );
    }
}
