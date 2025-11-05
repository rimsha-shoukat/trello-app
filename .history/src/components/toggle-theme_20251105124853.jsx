"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1>Select theme</h1>
            <button c onClick={()=> setTheme("light")} >Light</button>
            <button c onClick={()=> setTheme("dark")} >Dark</button>
        </div>
    )
}