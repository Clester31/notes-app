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
    const { tagName, tagColor } = body;

    if (!tagName) {
      return NextResponse.json({ error: "Missing Tag Name" }, { status: 400 });
    }

    if (!tagColor) {
      return NextResponse.json({ error: "Missing Tag Color" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTag = await prisma.tag.create({
      data: {
        name: tagName,
        color: tagColor,
        userId: user.id,
      },
    });

    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create tag" },
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

    const allUserTags = await prisma.tag.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(allUserTags, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tagId, updatedField, updatedValue } = body;

    let updatedTag;

    if (updatedField === "name") {
      updatedTag = await prisma.tag.update({
        where: { id: tagId },
        data: { name: updatedValue },
      });
      return NextResponse.json(updatedTag, { status: 200 });
    }

    if (updatedField === "color") {
      updatedTag = await prisma.tag.update({
        where: { id: tagId },
        data: { color: updatedValue }
      })
    }

    return NextResponse.json(updatedTag, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update tag" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tagId } = body;

    const deletedTag = await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });

    return NextResponse.json(deletedTag, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete tag" },
      { status: 500 },
    );
  }
}
