"use client";
import { ChevronDown, CirclePlus, Notebook, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Section({ showList, setShowList, setAddNewTitle, user, setAddNewBoard, setActiveBoardId, setActiveNoteId }) {
  let boards = user.boards || [];
  let notes = user.notes || [];

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gray-100 text-black dark:bg-black dark:text-white" aria-label="Open menu" variant="outline" size="lg">
            {showList ? <h1>Boards</h1> : <h1>Notes</h1>}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2" align="end">
          <DropdownMenuItem onClick={() => { setShowList(!showList); setActiveBoardId(null); }} className="p-4 flex flex-row items-center justify-start gap-2">
            <ArrowRightLeft />
            <h1 className="font-semibold">{showList ? "Notes" : "Boards"}</h1>
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-4">
              <h1 onClick={() => {setActiveBoardId(null); setActiveNoteId(null)}} className="font-semibold text-lg">ALL</h1>
            </DropdownMenuItem>
            {showList ? (boards.map((board) => (
              <DropdownMenuItem key={board._id} onClick={() => setActiveBoardId(board._id)} className="p-4 flex flex-row items-center justify-start gap-2">
                <Notebook />
                <h1 className="font-semibold">{board.title}</h1>
              </DropdownMenuItem>
            ))
            ) : (notes.map((note) => (
              <DropdownMenuItem key={note.id} className="p-4 flex flex-row items-center justify-start gap-2">
                <Notebook />
                <h1 className="font-semibold">{note.title}</h1>
              </DropdownMenuItem>
            ))
            )}
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={() => !showList ? setAddNewTitle(true) : setAddNewBoard(true)} className="p-4 flex flex-row items-center justify-start gap-2">
            <CirclePlus />
            <h1 className="font-semibold">{!showList ? "Note" : "Board"}</h1>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
