"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { setTheme } = useTheme();

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <h1 className="text-md text-blue-600">Select theme</h1>
            <button className="px-6 py-2 border-1 border-gray-400 rounded-md text-sm hover:shadow-md" onClick={()=> setTheme("light")} >Light</button>
            <button className="px-6 py-2 border-1 border-gray-400 rounded-md text-sm hover:shadow-md" onClick={()=> setTheme("dark")} >Dark</button>
        </div>
    )
}