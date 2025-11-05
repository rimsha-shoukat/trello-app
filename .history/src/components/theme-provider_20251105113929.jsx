"use client";

import { useTheme } from "next-themes";

export default function ThemeProvider(){
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex flex-row items-start justify-start gap-4">
            <h1></h1>
        </div>
    )
}