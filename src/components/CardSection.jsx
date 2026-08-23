import { useEffect } from 'react';
import '../styles/card.css';
import PokemonCard from './Card';
import { useState } from 'react';

function CardSection({ deck }) {
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const items = document.querySelectorAll('.card-item');

    items.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 60);
    });
  }, [deck]);

  function handleClick(id) {
    flipCard(id);
    deck.forEach((card, index) => {
      if (card.id !== id) {
        setTimeout(() => {
          flipCard(card.id);
        }, index * 30);
      }
    });
  }

  function flipCard(id) {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="card-section">
      {deck.map((card) => {
        return (
          <PokemonCard
            key={card.id}
            card={card}
            flipped={flipped[card.id]}
            onCardClick={() => handleClick(card.id)}
          />
        );
      })}
    </div>
  );
}

export default CardSection;
