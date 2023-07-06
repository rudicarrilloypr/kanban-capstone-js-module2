import { getPokemonData } from './pokemon.js';

const updatePokemonCounter = async () => {
  const pokemonCounter = document.getElementById('pokemon-counter');
  if (pokemonCounter) {
    const data = await getPokemonData();
    pokemonCounter.textContent = data.length;
  }
};

export default updatePokemonCounter;
