"use client"

import { useState } from "react";
import ArchiveIcon from "../ui/ArchiveIcon";
import PencilIcon from "../ui/PencilIcon";
import { useNavContext } from "@/lib/context/NavContext";

export default function SidebarNotes() {
    const { view, setView } = useNavContext();

    return (
        <div className={`flex flex-col gap-2 text-zinc-300 -mt-4`}>
            <div className={`flex flex-row gap-2 items-center py-1 px-4 rounded-xl cursor-pointer hover:bg-zinc-700 transition 150 ease-in-out ${view === 'all' && 'bg-zinc-800'}`} onClick={() => setView('all')}>
                <PencilIcon />
                <h1>All Notes</h1>
            </div> 
            <div className={`flex flex-row gap-2 items-center py-1 px-4 rounded-xl cursor-pointer hover:bg-zinc-700 transition 150 ease-in-out ${view === 'archived' && 'bg-zinc-800'}`} onClick={() => setView('archived')}>
                <ArchiveIcon />
                <h1>Archived Notes</h1>
            </div>
            <div className="border" />
        </div>
    )
}