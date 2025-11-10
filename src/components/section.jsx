
import { ChevronDown, CirclePlus, Notebook, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Section() {

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="lg">
            <h1>Boards</h1>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[14rem] mt-2" align="end">
          <DropdownMenuItem className="p-4 flex flex-row items-center justify-start gap-2">
            <ArrowRightLeft />
            <h1 className="font-semibold">Notes</h1> 
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-4">
              <h1 className="font-semibold text-lg">ALL</h1>  
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4">
              <Notebook />
              <h1 className="font-semibold">Board name 2</h1>  
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4">
              <Notebook />
              <h1 className="font-semibold">Board name 4</h1>  
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4">
              <Notebook />
              <h1 className="font-semibold">Board name 3</h1>  
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem className="p-4 flex flex-row items-center justify-start gap-2">
            <CirclePlus />
            <h1 className="font-semibold">Board</h1> 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
