import { NoteType } from "@/lib/types";
import { convertFromUTC } from "@/lib/utils";
import EllipsisIcon from "../ui/EllipsisIcon";

export default function NoteItem({ note }: { note: NoteType }) {
  return (
    <div className="gap-2">
      <div className="flex flex-col gap-2 hover:bg-zinc-800 p-1 cursor-pointer">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl mt-2">{note.title}</h1>
          <div className="hover:text-gossamer-400 transition 150 ease-in-out">
            <EllipsisIcon />
          </div>
        </div>
        <h1 className="text-sm text-zinc-400 mb-2">
          {convertFromUTC(note.createdAt)}
        </h1>
      </div>
      <div className="border border-zinc-700" />
    </div>
  );
}
