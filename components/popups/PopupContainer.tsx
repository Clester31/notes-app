import { useNavContext } from "@/lib/context/NavContext";
import { ReactNode } from "react";
import SquareXIcon from "../ui/SquareXIcon";

export default function PopupContainer({ children }: { children: ReactNode }) {
  const { closePopup } = useNavContext();

  return (
    <div className="bg-black/50 w-screen h-screen absolute items-center justify-center flex">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-4 w-1/3 flex flex-row items-center gap-4">
        <div>
          <button onClick={() => closePopup()}>
            <SquareXIcon />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
