"use client";

import { useTheme } from "next-themes";

export default function ThemeProvider(){
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1>Theme</h1>
            <input type="radio" name="Light" id="theme" >
            <input type="radio" name="dark" id="theme" />
        </div>
    )
}