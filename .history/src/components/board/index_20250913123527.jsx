export default function Board({ board }) {
    return (
                    return (
                            <div style={{ backgroundColor: board.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                <h1 style={{ color: board.text }} className="text-[2rem] leading-7">{board.title}</h1>
                            </div>
                    );     
    );
}