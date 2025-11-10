import { Search } from "lucide-react";

export function SearchBar(){
    return (
        <div className="w-[70%] flex flex-row gap-2 shadow-sm h-auto px-4 py-2 rounded-full border-1 border-gray-400 hover:border-gray-500 hover:scale-[1.02] hover:transition-all duration-500 ease-in-out">
            <Search className="text-md text-gray-500 font-semibold" />
            <input className="w-[100%] outline-none ring-none" type="text" placeholder="Search"/>
        </div>
    );
}