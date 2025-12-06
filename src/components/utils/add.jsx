import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button"

export function Add({ showList, setAddNewTitle, setAddNewBoard, user, activeBoardId }) {
  return (
    <Button onClick={() => !showList ? setAddNewTitle(true) : activeBoardId === null || user.boards.length === 0 ? setAddNewBoard(true) : setAddNewTitle(true)} variant="outline" className="fixed bg-black hover:bg-black hover:text-white text-white bottom-0 right-0 m-8 shadow-sm hover:scale-105 transition-transform duration-200">
      <CirclePlus />
    </Button>
  )
}