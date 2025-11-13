import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button"

export function Add(){
    return(
        <Button variant="outline" className="fixed bg-gray-200/50 dark:bg-gray-800 bottom-0 right-0 m-8 z-10 shadow-sm">
          <CirclePlus />
        </Button>
    )
}