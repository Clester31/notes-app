import { NoteType } from "@/lib/types";
import PencilIcon from "../ui/PencilIcon";
import { useState } from "react";
import TagSelector from "./TagSelector";

export default function NoteContent({ note }: { note: NoteType }) {
  const [showTagSelector, setShowTagSelector] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="note-header flex flex-col gap-2">
        <div className="note-title flex flex-row items-center gap-2">
          <h1 className="text-3xl font-semibold">{note.title}</h1>
          <button className="button-sm button-accept">
            <PencilIcon />
          </button>
        </div>
        <div className="note-tags">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-lg">Tags: </h1>
            {}
            <button
              className="button-accept button-sm"
              onClick={() => setShowTagSelector(!showTagSelector)}
            >
              +
            </button>
            {showTagSelector && (
              <TagSelector
                note={note}
                setShowTagSelector={setShowTagSelector}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
