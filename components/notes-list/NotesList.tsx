"use client";

import {
  addNewNote,
  getAllNotes,
  getAllUserNoteTags,
} from "@/lib/actions/actions";
import { NewNoteSchemaType, NoteType } from "@/lib/types";
import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { useNavContext } from "@/lib/context/NavContext";

export default function NotesList() {
  const { view, setNoteTags } = useNavContext();
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    getAllNotes().then((data) => setNotes(Array.isArray(data) ? data : [data]));
  }, []);

  useEffect(() => {
    getAllUserNoteTags().then((data) => {
      setNoteTags(Array.isArray(data) ? data : []);
      console.log(data);
    });
  }, [setNoteTags]);

  const createNote = async () => {
    const newNote: NewNoteSchemaType = {
      title: "New Note",
      content: "Text Goes Here",
      isPinned: false,
      isArchived: false,
    };
    const result = await addNewNote(newNote);
    setNotes((prev) => [...prev, result]);
  };

  return (
    <div className="flex flex-col gap-2 w-64 px-2 py-4 bg-zinc-900 border-r-2 border-r-zinc-800 h-[calc(100vh-3rem)]">
      <button className="button-lg button-accept" onClick={() => createNote()}>
        + Create New Note
      </button>
      <div className="notes-list-content">
        {notes &&
          view === "all" &&
          notes
            .filter((n) => n.isArchived === false)
            .map((note: NoteType, i: number) => (
              <NoteItem note={note} key={i} />
            ))}
        {notes &&
          view === "archived" &&
          notes
            .filter((n) => n.isArchived === true)
            .map((note: NoteType, i: number) => (
              <NoteItem note={note} key={i} />
            ))}
      </div>
    </div>
  );
}
