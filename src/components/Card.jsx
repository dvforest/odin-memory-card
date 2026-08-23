function PokemonCard({ card, flipped, delay, onCardClick }) {
  return (
    <div
      className={`
        card-item
        ${card.type}
        ${flipped === true ? 'flipped' : ''}
        `}
      style={{ '--delay': `${delay}ms` }}
      onClick={() => onCardClick(card.id)}
    >
      <img
        src={card.sprite}
        alt={card.name}
        className="pokemon-sprite"
      />
    </div>
  );
}

export default PokemonCard;
