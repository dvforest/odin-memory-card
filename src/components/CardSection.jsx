import { useEffect } from 'react';
import '../styles/card.css';

function CardSection({ deck, onCardClick }) {
  useEffect(() => {
    document.querySelectorAll('.card-item').forEach((el) => {
      el.classList.add('revealed');
    });
  }, []);

  return (
    <div className="card-section">
      {deck.map((card, index) => {
        return (
          <div
            key={card.id}
            className={`card-item ${card.type}`}
            style={{ '--delay': `${index * 60}ms` }}
            onClick={() => onCardClick(card.id)}
          >
            <img
              src={card.sprite}
              alt={card.name}
              className="pokemon-sprite"
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardSection;
