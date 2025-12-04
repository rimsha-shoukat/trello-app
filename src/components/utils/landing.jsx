"use client";
import { Button } from "../ui/button";

export function Landing({ setShowLogin }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to Trello App</h1>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">Organize your tasks and projects efficiently.</p>
            <Button variant="outline" size="lg"
                onClick={() => setShowLogin(true)}
                className="bg-black text-white hover:text-white hover:scale-105 transition-transform duration-200 hover:bg-black"
            >
                Login
            </Button>
        </div>
    );
}