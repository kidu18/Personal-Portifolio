import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper function to validate ObjectId
function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15+ (and likely 16 based on package.json)
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");
    const body = await request.json();

    const updateDoc = {
      $set: {
        ...body,
        updatedAt: new Date(),
      },
    };
    // Remove _id from update body if present to avoid immutable field error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (updateDoc.$set as any)._id;

    const result = await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(id) }, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

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
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
