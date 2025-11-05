import { IoMdArrowDropup } from "react-icons/io";

export function SectionTitle(){
    return (
        <div className="flex flex-row items-center justify-center gap-2 font-bold text-xl dark:text-black px-4 py-2 bg-gray-400 border-1 border-gray-500 rounded-md">
        <h1>Boards</h1>
        <IoMdArrowDropup/>
        </div>
    );
}