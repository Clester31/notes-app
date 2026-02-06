"use client";

import { updateNoteTags } from "@/lib/actions/actions";
import { useNavContext } from "@/lib/context/NavContext";
import { NoteType, TagType } from "@/lib/types";
import { useState } from "react";

export default function TagSelector({
  note,
  setShowTagSelector,
}: {
  note: NoteType;
  setShowTagSelector: (showTagSelector: boolean) => void;
}) {
  const { tags, noteTags, setNoteTags } = useNavContext();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const handleToggleTag = (tagId: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
    console.log(selectedTags);
  };

  const updateTags = async () => {
    const newNoteTag = await updateNoteTags(selectedTags, note.id);
    setShowTagSelector(false);
    setNoteTags(noteTags ? [...noteTags, newNoteTag] : [newNoteTag])
    console.log(noteTags)
  };

  if (!tags) {
    return <div></div>;
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 p-2 rounded-xl flex flex-col absolute h-64 gap-4 mt-9 -ml-2.5">
      <div className="flex flex-col overflow-y-scroll">
        {tags.map((tag: TagType, i: number) => {
          return (
            <div
              key={i}
              className="flex flex-row items-center gap-1 py-2 justify-between px-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex flex-row items-center gap-2 w-32">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <h1 className="truncate">{tag.name}</h1>
              </div>
              <input
                type="checkbox"
                checked={selectedTags.has(tag.id)}
                onChange={() => handleToggleTag(tag.id)}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="button-accept button-sm"
          onClick={(e) => {
            e.stopPropagation();
            updateTags();
          }}
        >
          Update Tags
        </button>
      </div>
    </div>
  );
}
