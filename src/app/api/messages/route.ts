import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Admin only: fetch all messages
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("portfolio");
        const messages = await db
            .collection("messages")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(messages);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}

// POST - Public: submit a contact message
export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const body = await request.json();

        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Missing required fields: name, email, message" },
                { status: 400 }
            );
        }

        const newMessage = {
            name: body.name,
            email: body.email,
            message: body.message,
            read: false,
            createdAt: new Date(),
        };

        const result = await db.collection("messages").insertOne(newMessage);
        return NextResponse.json(
            { ...newMessage, _id: result.insertedId },
            { status: 201 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
