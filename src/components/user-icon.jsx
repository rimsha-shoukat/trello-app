"use client";
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserIcon({loginUser, setShowProfile, setShowSignin}) {
  return (
    <Button className="bg-gray-200/50 dark:bg-gray-800" onClick={()=>{loginUser? setShowProfile(true) : setShowSignin(true)}} variant="outline"><User/></Button>
  )
}
