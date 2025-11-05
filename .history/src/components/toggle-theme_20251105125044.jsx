"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1 className="text-md text-blue-400">Select theme</h1>
            <button className="px-2" onClick={()=> setTheme("light")} >Light</button>
            <button className="px-2" onClick={()=> setTheme("dark")} >Dark</button>
        </div>
    )
}