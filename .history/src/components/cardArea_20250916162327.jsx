
export default function cardArea ({ cards }) {
    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => (
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row items-center justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md">
                        <input type="checkbox"/>
                        <h1 style={{color: card.text}} className="text-[1rem] text-justify leading-6">{card.description}</h1>
                    </section>
                ))
            }
        </>
    )
}
import { useState } from 'react';

export default function CardItem({ card }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <section
      style={{ backgroundColor: card.bg }}
      className="w-[100%] flex flex-row items-center justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <h1
        style={{
          color: card.text,
          textDecoration: checked ? 'line-through' : 'none',
        }}
        className="text-[1rem] text-justify leading-6"
      >
        {card.description}
      </h1>
    </section>
  );
}
