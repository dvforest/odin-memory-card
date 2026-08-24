import { useEffect } from 'react';
import '../styles/card.css';
import PokemonCard from './Card';
import { useState } from 'react';

function CardSection({ deck, onShuffle, onHandleScore }) {
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const items = document.querySelectorAll('.card-item');

    items.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 60);
    });
  }, [deck]);

  function handleClick(card) {
    const key = card.instanceKey;
    const id = card.id;

    flipCard(key);

    setTimeout(() => {
      onShuffle();
    }, 250);

    onHandleScore(id);
  }

  function flipCard(instanceKey) {
    setFlipped((prev) => ({
      ...prev,
      [instanceKey]: !prev[instanceKey],
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
            onCardClick={() => handleClick(card)}
          />
        );
      })}
    </div>
  );
}

export default CardSection;
