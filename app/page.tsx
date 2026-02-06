"use client"

import NavbarLayout from "@/components/navbar/NavbarLayout";
import Note from "@/components/note/Note";
import NotesList from "@/components/notes-list/NotesList";
import { useNavContext } from "@/lib/context/NavContext";

export default function Home() {
  const { open, currentNote } = useNavContext();

  return (
    <div className={`h-screen ${open ? `w-[calc(100vw-16rem)]` : `w-[calc(100vw-3rem)]`}`}>
      <NavbarLayout />
      <div className="flex flex-row">
        <NotesList />
        <Note note={currentNote} />
      </div>
    </div>
  );
}
