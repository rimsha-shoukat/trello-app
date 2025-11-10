import { Button } from "@/components/ui/button"
import { ChevronDown, CirclePlus } from "lucide-react"
import { Card } from "@/components/card"

export function List(){
    return (
        <div className="w-[18rem] h-auto p-4 rounded-md border-1 border-gray-400">
            <span className="w-[100%] flex flex-row items-center justify-between mb-4">
                <span>
                    <h1>List Name</h1>
                    <p>5</p>
                </span>
                <Button variant="ghost"><ChevronDown /></Button>
            </span>
            <section className="w-[100%] h-auto flex flex-col items-center justify-center gap-2">
                <Card />
                <Card />
                <Card />
                <Card />
            </section>
            <span className="w-[100%] flex flex-row items-center justify-between p-2 mt-4">
                <p className="text-xs">Created at: 01/04</p>
                <Button variant="outline">
                    <CirclePlus/>
                </Button>
            </span>
        </div>
    )
}