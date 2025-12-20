"use client";
import { Search } from "lucide-react";

export function SearchBar({ user, showList, notes, boards, activeBoard, setNotes, setBoards, fetchNotes, fetchBoards, setLists }) {
    const handleSearch = (query) => {
        query = query.toLowerCase();
        if (!query) {
            fetchNotes();
            fetchBoards();
            setLists(activeBoard?.lists || []);
            return;
        }

        if (!user) {
            return;
        }

        if (showList && !activeBoard) {
            let filteredBoards = boards.filter(board => board.title.toLowerCase().includes(query));
            setBoards(filteredBoards);
        }

        if(showList && activeBoard){
            let filteredLists = activeBoard?.lists.filter(list => list.title.toLowerCase().includes(query));
            setLists(filteredLists);
        }

        if(!showList && user) {
            let filteredNotes = notes.filter(note => note.title.toLowerCase().includes(query) || note.text.toLowerCase().includes(query));
            setNotes(filteredNotes);
        }
    }

    return (
        <div className="w-[70%] max-[750px]:w-full text-gray-800 dark:text-gray-300 flex flex-row gap-2 shadow-sm h-auto px-4 py-2 rounded-full border border-gray-500 hover:scale-[1.02] hover:transition-all duration-500 ease-in-out">
            <Search className="text-md font-semibold" />
            <input onChange={(e) => handleSearch(e.target.value)} className="w-full outline-none ring-none" type="text" placeholder="Search" />
        </div>
    );
}