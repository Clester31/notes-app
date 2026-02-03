"use client";

import { useEffect, useState } from "react";
import { addNewTag, getAllTags } from "@/lib/actions/actions";
import { TagType } from "@/lib/types";
import Tag from "../tags/Tag";
import { selectRandomTagColor } from "@/lib/utils";

export default function SidebarTags() {
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    getAllTags().then((data) => setTags(Array.isArray(data) ? data : [data]));
  }, []);

  const createTag = async () => {
    const newTag = await addNewTag({
      name: `tag ${tags.length + 1}`,
      color: selectRandomTagColor(),
    });
    setTags((prev) => [...prev, newTag]);
  };

  return (
    <div className="flex flex-col gap-4 -mt-2">
      <button className="button-sm button-accept" onClick={createTag}>
        + New Tag
      </button>
      <div className="flex flex-col gap-4">
        {tags &&
          tags.map((tag: TagType, i: number) => (
            <Tag
              tag={tag}
              selected={false}
              tags={tags}
              setTags={setTags}
              key={i}
            />
          ))}
      </div>
    </div>
  );
}
