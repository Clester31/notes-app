import { tagColors } from "@/lib/utils";

export default function TagColorPopover({
  updateTagColor
}: {
  updateTagColor: (color: string) => void;
}) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 flex flex-col absolute p-2 mt-8 rounded-xl gap-2 text-sm text-zinc-300">
      <div className="grid grid-cols-5">
        {tagColors.map((color: string, i: number) => {
          return (
            <div
              className={`w-5 h-5 rounded-full mx-1 my-1 hover:opacity-75`}
              style={{ backgroundColor: color }}
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                updateTagColor(color);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
