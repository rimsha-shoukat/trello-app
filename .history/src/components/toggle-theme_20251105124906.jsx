"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1 className="te">Select theme</h1>
            <button className="" onClick={()=> setTheme("light")} >Light</button>
            <button className="" onClick={()=> setTheme("dark")} >Dark</button>
        </div>
    )
}