import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button"

export function Add(){
    return(
        <Button variant="outline" className="fixed bottom-0 right-0 m-8 z-10 shadow-sm">
          <CirclePlus />
        </Button>
    )
}