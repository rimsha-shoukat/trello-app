export default function Board({ board }) {
    return (
       
            {
                    return (
                        <Link key={list.id} href={`/${list.id}`}>
                            <div style={{ backgroundColor: list.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                <h1 style={{ color: list.text }} className="text-[2rem] leading-7">{list.title}</h1>
                            </div>
                        </Link>
                    );
                })        
    );
}