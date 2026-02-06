import { NoteType } from "@/lib/types";
import NoteSideOptions from "./NoteSideOptions";
import NoteContent from "./NoteContent";

export default function Note({ note }: { note: NoteType | null }) {
  if (!note) {
    return (
      <div>
        <h1>Click a note to open it</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <NoteContent note={note} />
      <NoteSideOptions />
    </div>
  );
}
