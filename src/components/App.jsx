/*
The goal of the game is to click all cards one after the other.
You lose if you click the same card twice.
Upon clicking a card, all cards reshuffle.

APP
  States: score (number)
          bestScore (number)
          gameState (playing, hasWon, hasLost)
      useEffect: use localStorage to save bestScore
      (dependency: bestScore)
      if loading: return loading screen
      if hasWon: display win screen, then on clicking play again, display Card Section
      if hasLost: display Card Section

  > Score Section
      props: score, bestScore
  > Card Section
      props: score, gameState, preloadedDeck, onLoaded
      States: cards (array of objects with pokemon data)
              SelectedIds (array of ids)
      useEffect:
              async function to call preload deck and assign to cards
              call onLoaded()
              (no dependency: runs once)
      fetchPokemonDeck: return an object with data (id, name, sprite) to assign to cards
      shuffle(cards):
        takes an array of cards and return them reshuffled
      deal(cards): deal cards on the screen in the order they appear in the array
      handleWin():
        update bestScore if needed
        show win screen
        on clicking play again,
        reset selectedIds 
        setCards(shuffle(cards))
      handleLose():
        update bestScore  if needed
        reset selectedIds 
        setCards(shuffle(cards))
      handleClick:
              props: newId 
                Update SelectedIds with newId
                if nb of Ids match number of cards > handleWin()
                if newId exists in SelectedIds > handleLose()
      return: map all cards
  > Card
      Props: pokemon, delay
      Components:
              Card Container
              Pokemon Name
              Pokemon Sprite 
              Card Frame
      style: handle animation using delay
      return: one card
  > 




*/

import { useEffect, useState } from 'react';
import { fetchPokemonDeck } from '../utils/fetchPokemonDeck';
import { preloadImages } from '../utils/preloadImages';
import CardSection from './CardSection.jsx';
import '../styles/app.css';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem('bestScore')) || 0,
  );
  const [deck, setDeck] = useState([]);
  const [gameState, setGameState] = useState('isLoading');

  useEffect(() => {
    localStorage.setItem('bestScore', bestScore);
  }, [bestScore]);

  useEffect(() => {
    async function loadGame() {
      const deckData = await fetchPokemonDeck();
      await preloadImages(deckData);
      setDeck(deckData);
      setGameState('isPlaying');
    }
    loadGame();
  }, []);

  return (
    <div className="app">
      <header>Pokemon Memory Game</header>

      {gameState === 'isLoading' && (
        <div className="loading-container">
          <div className="loading-animation" />
          <div className="loading-text">Loading...</div>
        </div>
      )}

      {gameState === 'isPlaying' && (
        <main>
          <div className="score-section">
            <div>{score}</div>
            <div>{bestScore}</div>
          </div>
          <CardSection deck={deck} />
        </main>
      )}
    </div>
  );
}

export default App;
