"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1>Theme</h1>
            <input onClick={()=> setTheme("light")} type="radio" name="theme" id="light" />
            <input onClick={()=> setTheme("dark")} type="radio" name="theme" id="dark" />
        </div>
    )
}