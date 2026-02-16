import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Project } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const projects = await db.collection("projects").find({}).toArray();
    return NextResponse.json(projects);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
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
    const body: Project = await request.json();

    if (!body.title || !body.link || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields: title, link, image" },
        { status: 400 }
      );
    }

    const { _id, ...projectData } = body;

    const newProject = {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(newProject);
    return NextResponse.json(
      { ...newProject, _id: result.insertedId },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
