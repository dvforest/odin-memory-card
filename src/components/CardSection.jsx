import '../styles/card.css';

function CardSection({ deck, onCardClick }) {
  console.log('Type of deck:', typeof deck, deck);
  return (
    <div className="card-section">
      {deck.map((card) => {
        return (
          <div
            className={`card-item ${card.type}`}
            onClick={() => onCardClick(card.id)}
            key={card.id}
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
