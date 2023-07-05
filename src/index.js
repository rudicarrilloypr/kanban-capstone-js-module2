import './index.css';
import { displayPokemon } from './module/pokemon.js';
import updatePokemonCounter from './module/pokemonCounter.js';

displayPokemon().then(() => updatePokemonCounter());
