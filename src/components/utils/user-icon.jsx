"use client";
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserIcon({ setShowLogin, setShowProfile, user }) {
  return (
    <Button className="bg-gray-100 text-black dark:bg-black dark:text-white" variant="outline" onClick={() => user ? setShowProfile(true) : setShowLogin(true)} ><User /></Button>
  )
}
