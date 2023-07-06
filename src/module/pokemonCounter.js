import { getPokemonData } from './pokemon.js';

const updatePokemonCounter = async () => {
  const pokemonCounter = document.getElementById('pokemon-counter');
  const data = await getPokemonData();
  pokemonCounter.textContent = data.length;
};

export default updatePokemonCounter;
