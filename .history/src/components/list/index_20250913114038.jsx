import Card from "../card";

export default function List({ listBox }) {
    return (
        <>
            <section style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
                className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows- gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
                {
                    listBox.map((list) => {
                        return (
                            <div key={list.id} style={{ backgroundColor: list.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                <h1 style={{ color: list.text }} className="text-[2rem] leading-7">{list.title}</h1>
                                </div>
                        );
                    })
                }
            </section>
        </>
    )
}