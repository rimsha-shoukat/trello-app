import { Search } from "lucide-react";

export function SearchBar(){
    return (
        <div className="w-[70%] bg-[#162238] hover:bg-[#1b2a45] text-white dark:bg-gray-800 flex flex-row gap-2 shadow-sm h-auto px-4 py-2 rounded-full border border-gray-500 hover:scale-[1.02] hover:transition-all duration-500 ease-in-out">
            <Search className="text-md font-semibold" />
            <input className="w-full outline-none ring-none" type="text" placeholder="Search"/>
        </div>
    );
}