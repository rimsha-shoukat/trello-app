"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1 className="text-md text-blue-600">Select theme</h1>
            <button className="px-4 py-1 border-gray-500 bg-gray-300 rounded-md text-sm hover:shadow-md" onClick={()=> setTheme("light")} >Light</button>
            <button className="px-4 py-1 border-gray-500 bg-gray-300 rounded-md text-sm hover:shadow-md" onClick={()=> setTheme("dark")} >Dark</button>
        </div>
    )
}