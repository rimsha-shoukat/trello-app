import Card from "../card";

export default function List({ listArray }) {
    return (
        <>
            <section >
                {
                    listBox.map((list) => {
                        return (
                            <div key={list.id} style={{ backgroundColor: list.bg }} className={`w-[24rem] h-auto p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                <h1 style={{ color: list.text }} className="text-[1.2rem] leading-7">{list.title}</h1>
                                <Card />
                            </div>
                        );
                    })
                }
            </section>
        </>
    )
}