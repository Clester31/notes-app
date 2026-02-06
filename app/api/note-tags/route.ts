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
    const { noteTags, noteId } = body;

    console.log(noteTags, noteId);

    if (!noteTags) {
      return NextResponse.json({ error: "Missing Tags" }, { status: 400 });
    }

    if (!noteId) {
      return NextResponse.json({ error: "Missing Note id" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: user.id,
      },
    });

    if (!note) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.noteTag.deleteMany({
        where: { noteId },
      });

      if (noteTags.length > 0) {
        await tx.noteTag.createMany({
          data: noteTags.map((tagId: string) => ({
            noteId,
            tagId,
          })),
          skipDuplicates: true,
        });
      }

      return await tx.note.findUnique({
        where: { id: noteId },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    console.log(result);

    return NextResponse.json(
      { message: "Note tags updated successfully", note: result },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create note tag" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
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

    const allUserNoteTags = await prisma.noteTag.findMany({
      where: {
        note: {
          userId: user.id,
        },
      },
      include: {
        tag: true,
        note: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(allUserNoteTags, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get all user note tags" },
      { status: 500 },
    );
  }
}
