"use client";

import { type TagType } from "@/lib/types";
import EllipsisIcon from "../ui/EllipsisIcon";
import { useState } from "react";
import TagOptionsPopover from "./TagOptionsPopover";
import { updateTag } from "@/lib/actions/actions";
import TagColorPopover from "./TagColorPopover";

export default function Tag({
  tag,
  tags,
  setTags,
  selected,
}: {
  tag: TagType;
  tags: TagType[];
  setTags: (tags: TagType[]) => void;
  selected: boolean;
}) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [editNameField, setEditNameField] = useState<string>("");
  const [editColor, setEditColor] = useState<boolean>(false);

  const updateTagName = () => {
    updateTag(tag, "name", editNameField);
    console.log("updating tag name");
    setTags(
      tags.map((t) => (t.id === tag.id ? { ...t, name: editNameField } : t)),
    );
    setEditName(false);
  };

  const updateTagColor = (newColor: string) => {
    updateTag(tag, "color", newColor);
    setEditColor(false);
    setTags(
      tags.map((t) => (t.id === tag.id ? { ...t, color: newColor } : t)),
    );
  };

  return (
    <div className="flex flex-row items-center space-x-4 ml-2 bg-zinc-800 px-2 py-0.5 rounded-xl hover:bg-zinc-700 transition 100 ease-in-out cursor-pointer justify-between">
      <div className="flex flex-row space-x-4 items-center">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: tag.color }}
        />
        {!editName ? (
          <h1 className="text-zinc-300">{tag.name}</h1>
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTagName();
              }}
            >
              <input
                type="text"
                className="w-36 bg-zinc-600 overflow-scroll px-2 rounded-xl"
                placeholder="new tag name"
                onChange={(e) => setEditNameField(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
          setEditName(false);
          setEditColor(false);
        }}
      >
        {showOptions && (
          <TagOptionsPopover
            tag={tag}
            tags={tags}
            setTags={setTags}
            setShowOptions={setShowOptions}
            setEditName={setEditName}
            setEditColor={setEditColor}
          />
        )}
        {editColor && <TagColorPopover updateTagColor={updateTagColor} />}
        <div className="hover:text-gossamer-400 transition 150 ease-in-out">
          <EllipsisIcon />
        </div>
      </div>
    </div>
  );
}
