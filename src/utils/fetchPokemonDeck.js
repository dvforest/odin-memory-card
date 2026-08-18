import { POKEMONS } from '../data/POKEMONS.js';

export async function fetchPokemonDeck() {
  return Promise.all(
    POKEMONS.map(async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.other['official-artwork'].front_default,
      };
    }),
  );
}
