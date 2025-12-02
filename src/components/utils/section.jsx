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

export function Section({ showList, setShowList, setAddNewTitle }) {

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
          <DropdownMenuItem onClick={() => { setShowList(!showList) }} className="p-4 flex flex-row items-center justify-start gap-2">
            <ArrowRightLeft />
            <h1 className="font-semibold">{showList ? "Notes" : "Boards"}</h1>
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-4">
              <h1 className="font-semibold text-lg">ALL</h1>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4">
              <Notebook />
              <h1 className="font-semibold">{!showList ? "Note" : "Board"} name 2</h1>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4">
              <Notebook />
              <h1 className="font-semibold">{!showList ? "Note" : "Board"} name 4</h1>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4">
              <Notebook />
              <h1 className="font-semibold">{!showList ? "Note" : "Board"} name 3</h1>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={() => { setAddNewTitle(true) }} className="p-4 flex flex-row items-center justify-start gap-2">
            <CirclePlus />
            <h1 className="font-semibold">{!showList ? "Note" : "Board"}</h1>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
