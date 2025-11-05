"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1>Select theme</h1>

            <button onClick={()=> setTheme("light")} type="radio" name="theme" id="light" ></button>
            <button onClick={()=> setTheme("dark")} type="radio" name="theme" id="dark" ></button>
        </div>
    )
}