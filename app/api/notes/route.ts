import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { noteTitle, noteContent, noteIsPinned, noteIsArchived } = body;

    if (!noteTitle) {
      return NextResponse.json(
        { error: "Missing Title Name" },
        { status: 400 },
      );
    }

    if (!noteContent) {
      return NextResponse.json({ error: "Missing Content" }, { status: 400 });
    }

    if (noteIsPinned === undefined) {
      return NextResponse.json({ error: "Missing IsPinned" }, { status: 400 });
    }

    if (noteIsArchived === undefined) {
      return NextResponse.json(
        { error: "Missing IsArchived" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newNote = await prisma.note.create({
      data: {
        title: noteTitle,
        content: noteContent,
        isPinned: noteIsPinned,
        isArchived: noteIsArchived,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const allUserNotes = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        isPinned: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(allUserNotes, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}
