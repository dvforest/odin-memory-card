import { useEffect } from 'react';
import '../styles/card.css';
import PokemonCard from './Card';
import { useState } from 'react';

function CardSection({ deck, onShuffle }) {
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const items = document.querySelectorAll('.card-item');

    items.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 60);
    });
  }, [deck]);

  function handleClick(key) {
    flipCard(key);

    setTimeout(() => {
      onShuffle();
    }, 250);
  }

  function flipCard(key) {
    setFlipped((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="card-section">
      {deck.map((card) => {
        return (
          <PokemonCard
            key={card.instanceKey}
            card={card}
            flipped={flipped[card.instanceKey]}
            onCardClick={() => handleClick(card.instanceKey)}
          />
        );
      })}
    </div>
  );
}

export default CardSection;
