import { useEffect, useState } from 'react';
import { fetchPokemonDeck } from '../utils/fetchPokemonDeck';
import { preloadImages } from '../utils/preloadImages';
import CardSection from './CardSection.jsx';
import '../styles/app.css';
import { LoaderCircle } from 'lucide-react';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem('bestScore')) || 0,
  );
  const [deck, setDeck] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [gameState, setGameState] = useState('isLoading');

  useEffect(() => {
    localStorage.setItem('bestScore', bestScore);
  }, [bestScore]);

  useEffect(() => {
    async function loadGame() {
      const deckData = await fetchPokemonDeck();
      await preloadImages(deckData);
      setDeck(deckData);
      handleShuffle(deckData);
      setGameState('isPlaying');
    }
    loadGame();
  }, []);

  function handleShuffle() {
    setDeck((prev) => shuffle(prev));
  }

  function handleScore(id) {
    if (clickedIds.includes(id)) {
      setClickedIds([]);
      if (score > bestScore) setBestScore(score);
      setScore(0);
      return console.log('you lost');
    }
    setClickedIds((prev) => [...prev, id]);
    setScore(score + 1);
    console.log('continue');
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.map((card) => ({
      ...card,
      instanceKey: crypto.randomUUID(),
    }));
  }

  return (
    <div className="app">
      <header>
        <h1>Pokemon Memory Game</h1>
      </header>

      <div className="score-section">
        <h2>Score: {score}</h2>
        <h2>Best: {bestScore}</h2>
      </div>

      {gameState === 'isLoading' && (
        <div className="loading-container">
          <LoaderCircle className="loading-animation" />
          <h2 className="loading-text">Loading...</h2>
        </div>
      )}

      {gameState === 'isPlaying' && (
        <main>
          <CardSection
            deck={deck}
            onShuffle={handleShuffle}
            onHandleScore={handleScore}
          />
        </main>
      )}
    </div>
  );
}

export default App;
