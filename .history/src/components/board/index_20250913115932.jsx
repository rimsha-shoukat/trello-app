import Link from 'next/link';
export default function Board({ boardList }) {
    return (
        <div style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}
            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
            {
                boardList.map((list) => {
                    return (
                        <Link key={list.id} href={`/${bo.id}`}>
                            <div style={{ backgroundColor: list.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                <h1 style={{ color: list.text }} className="text-[2rem] leading-7">{list.title}</h1>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    )
}