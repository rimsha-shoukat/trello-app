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

export function Section({showList, setShowList}) {

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gray-200/50 dark:bg-gray-800" variant="outline" aria-label="Open menu" size="lg">
            {showList? <h1>Boards</h1> : <h1>Notes</h1>}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[14rem] mt-2" align="end">
          <DropdownMenuItem className="p-4 flex flex-row items-center justify-start gap-2">
            <ArrowRightLeft />
            <h1 onClick={() => {setShowList(!showList)}} className="font-semibold">{showList ? "Notes" : "Boards"}</h1>
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
          <DropdownMenuItem className="p-4 flex flex-row items-center justify-start gap-2">
            <CirclePlus />
            <h1 className="font-semibold">{!showList ? "Note" : "Board"}</h1> 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
