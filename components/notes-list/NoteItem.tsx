"use client";

import { NoteType, NoteTagType, TagType } from "@/lib/types";
import { convertFromUTC } from "@/lib/utils";
import EllipsisIcon from "../ui/EllipsisIcon";
import { useNavContext } from "@/lib/context/NavContext";

export default function NoteItem({ note }: { note: NoteType }) {
  const { noteTags, setCurrentNote, tags } = useNavContext();

  const filteredNoteTags = noteTags?.filter((nt) => nt.noteId === note.id);

  return (
    <div className="gap-2" onClick={() => setCurrentNote(note)}>
      <div className="flex flex-col gap-2 hover:bg-zinc-800 p-1 cursor-pointer">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl mt-2">{note.title}</h1>
          <div className="hover:text-gossamer-400 transition 150 ease-in-out">
            <EllipsisIcon />
          </div>
        </div>
        <h1 className="text-sm text-zinc-400 mb-2">
          {convertFromUTC(note.updatedAt)}
        </h1>
        <div className="flex flex-wrap gap-2">
          {filteredNoteTags?.map((nt: NoteTagType, i: number) => {
            const tag: TagType | undefined = tags?.find(t => t.id === nt.tagId);
            return (
              <div
                key={i}
                className="flex flex-row items-center gap-1 px-2 py-1 bg-zinc-700 rounded-md"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag?.color}}
                />
                <span className="text-xs">{tag?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border border-zinc-700" />
    </div>
  );
}
