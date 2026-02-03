import PaintbrushIcon from "../ui/PaintbrushIcon";
import PencilIcon from "../ui/PencilIcon";
import { type TagType } from "@/lib/types";
import Trash2Icon from "../ui/Trash2Icon";
import { deleteTag } from "@/lib/actions/actions";

export default function TagOptionsPopover({
  tag,
  tags,
  setTags,
  setShowOptions,
  setEditName,
  setEditColor,
}: {
  tag: TagType;
  tags: TagType[];
  setTags: (tags: TagType[]) => void;
  setShowOptions: (showOptions: boolean) => void;
  setEditName: (editName: boolean) => void;
  setEditColor: (editColor: boolean) => void;
}) {
    const removeTag = () => {
        deleteTag(tag);
        setTags(tags.filter((t) => t.id !== tag.id));
        setShowOptions(false);
    }

  return (
    <div className="bg-zinc-800 border border-zinc-700 flex flex-col absolute p-2 mt-8 rounded-xl gap-2 text-sm text-zinc-300">
      <div
        className="flex flex-row gap-2 items-center hover:text-gossamer-400 transition 150 ease-in-out"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          setEditName(true);
          setShowOptions(false);
        }}
      >
        <PencilIcon />
        <h1>Edit Tag Name</h1>
      </div>
      <div
        className="flex flex-row gap-2 items-center hover:text-gossamer-400 transition 150 ease-in-out"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          setEditColor(true);
          setShowOptions(false);
        }}
      >
        <PaintbrushIcon />
        <h1>Edit Tag Color</h1>
      </div>
      <div
        className="flex flex-row gap-2 items-center hover:text-gossamer-400 transition 150 ease-in-out"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          removeTag();
        }}
      >
        <Trash2Icon />
        <h1>Delete Tag</h1>
      </div>
    </div>
  );
}
