import { UserStar } from "lucide-react";
import { Button } from "@/components/ui/button"

export function UserIcon(){
    return (
    <Button variant="outline" size="icon">         
      <UserStar />
    </Button>   
    )
}