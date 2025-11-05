"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { setTheme } = useTheme();

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <h1 className="text-md text-blue-600">Select theme</h1>
            <button className="px-4 py-1 border-2 border-gray-400 rounded-md font-semibold text-sm hover:shadow-lg" onClick={()=> setTheme("light")} >Light</button>
            <button className="px-4 py-1 border-2 border-gray-400 rounded-md font-semibold text-sm hover:shadow-lg" onClick={()=> setTheme("dark")} >Dark</button>
        </div>
    )
}