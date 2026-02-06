import { NewNoteSchemaType, NewTagSchemaType, NoteTagType, NoteType, TagType } from "../types";

// tags

export async function addNewTag(tag: NewTagSchemaType) {
  const response = await fetch("/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagName: tag.name,
      tagColor: tag.color,
    }),
  });

  if (!response.ok) {
    throw new Error("failed to add tag");
  }

  const data = await response.json();
  return data as TagType;
}

export async function getAllTags() {
  const response = await fetch("/api/tags", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("failed to retrieve tags");
  }

  const data = await response.json();
  return data as TagType;
}

export async function updateTag(tag: TagType, field: string, value: string) {
  const response = await fetch("/api/tags", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagId: tag.id,
      updatedField: field,
      updatedValue: value,
    }),
  });

  if (!response.ok) {
    throw new Error("failed to update tag");
  }

  const data = await response.json();
  return data as TagType;
}

export async function deleteTag(tag: TagType) {
  const response = await fetch("/api/tags", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagId: tag.id,
    }),
  });

  if (!response.ok) {
    throw new Error("failed to dele tag");
  }
}

// notes

export async function addNewNote(note: NewNoteSchemaType) {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      noteTitle: note.title,
      noteContent: note.content,
      noteIsPinned: note.isPinned,
      noteIsArchived: note.isArchived,
    }),
  });

  if (!response.ok) {
    throw new Error("failed to add note");
  }

  const data = await response.json();
  return data as NoteType;
}

export async function getAllNotes() {
  const response = await fetch("/api/notes", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("failed to retrieve notes");
  }

  const data = await response.json();
  return data as NoteType;
}

// notes

export async function updateNoteTags(selectedTags: Set<string>, noteId: string) {
  const response = await fetch("/api/note-tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      noteTags: Array.from(selectedTags),
      noteId: noteId,
    })
  });

  if(!response.ok) {
    throw new Error("failed to update note tags");
  }

  const data = await response.json();
  return data as NoteTagType;
}

export async function getAllUserNoteTags() {
  const response = await fetch("/api/note-tags", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("failed to retrieve user note tags");
  }

  const data = await response.json();
  return data as NoteTagType;
}