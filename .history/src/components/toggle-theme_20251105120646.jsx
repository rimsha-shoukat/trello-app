"use client";
import { useTheme } from "next-themes";

export function ToggleTheme(){
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1>Theme</h1>
            <input onClick={()=> setTheme(} type="radio" name="Light" id="theme" ></input>
            <input onClick={()=> setTheme(} type="radio" name="dark" id="theme"></input>
        </div>
    )
}