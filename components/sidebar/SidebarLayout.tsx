"use client";

import { ReactNode, useState } from "react";
import PanelLeftCloseIcon from "../ui/PanelLeftCloseIcon";
import PanelLeftOpenIcon from "../ui/PanelLeftOpenIcon";
import NotebookTextIcon from "../ui/NotebookTextIcon";
import { useNavContext } from "@/lib/context/NavContext";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const { open, setOpen } = useNavContext();

  return (
    <div
      className={`h-screen flex flex-col justify-between bg-zinc-900 text-white items-start border-r-2 border-r-zinc-800 ${open ? "w-64" : "w-12"}`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center gap-2 border-b-2 border-y-zinc-800 w-64 h-12 p-2">
          <NotebookTextIcon />
          {open && <h1 className="text-xl">Notes</h1>}
        </div>
        {open && <div className="flex flex-col gap-8 px-2">{children}</div>}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:text-mindaro-200 transition 150 ease-in-out p-2"
      >
        {open ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      </button>
    </div>
  );
}
