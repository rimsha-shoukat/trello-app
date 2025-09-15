
export default function cardArea({ cards }) {
    return (
        <>
        <section>
            {cards && Array.isArray(cards) && cards.map((card) => {
                    <section style={{backgroundColor: card.bg}} className="w-[100%] h-auto p-2 ">
                        <input type="checkbox" value={card.description} style={{color: card.text}} className="text-[1rem] text-justify leading-6"/>
                    </section>
                })
            }
        </>
    )
}