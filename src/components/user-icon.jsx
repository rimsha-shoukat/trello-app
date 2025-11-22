"use client";
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserIcon({loginUser, setShowProfile, setShowLogin}) {
  return (
    <Button className="bg-[#162238] hover:bg-[#1b2a45] text-white border-1 border-gray-500 dark:bg-gray-800" onClick={()=>{loginUser? setShowProfile(true) : setShowLogin(true)}} ><User/></Button>
  )
}
