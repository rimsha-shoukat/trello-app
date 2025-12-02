import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button"

export function Add({setAddNewTitle}){
    return(
        <Button onClick={() => setAddNewTitle(true)} variant="outline" className="fixed bg-[#152238] hover:bg-[#1e2e4c] text-white dark:bg-gray-800 bottom-0 right-0 m-8 shadow-sm">
          <CirclePlus />
        </Button>
    )
}