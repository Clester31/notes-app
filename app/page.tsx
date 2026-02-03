"use client"

import NavbarLayout from "@/components/navbar/NavbarLayout";
import NotesList from "@/components/notes-list/NotesList";
import { useNavContext } from "@/lib/context/NavContext";

export default function Home() {

  const { open } = useNavContext();

  return (
    <div className={`h-screen ${open ? `w-[calc(100vw-16rem)]` : `w-[calc(100vw-3rem)]`}`}>
      <NavbarLayout />
      <div className="flex flex-row">
        <NotesList />
      </div>
    </div>
  );
}
