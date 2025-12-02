"use client";
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserIcon({setShowLogin, setShowProfile, user}) {
  return (
    <Button className="bg-[#162238] hover:bg-[#1b2a45] text-white border border-gray-500 dark:bg-gray-800" onClick={ () => user? setShowProfile(true) : setShowLogin(true)} ><User/></Button>
  )
}
