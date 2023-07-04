// Data from API
async function getPokemonData() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
  const data = await response.json();
  return data.results;
}

// Specific Pokemon details
async function getPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// HTML elements for each Pokemon
async function displayPokemon() {
  const pokemonList = document.querySelector('#pokemon-list');
  const pokemonData = await getPokemonData();

  pokemonData.forEach(async (pokemon) => {
    const details = await getPokemonDetails(pokemon.url);

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon-item');

    const pokemonTitleContainer = document.createElement('div');
    pokemonTitleContainer.classList.add('title-container');

    const pokemonTitle = document.createElement('h2');
    pokemonTitle.textContent = pokemon.name;

    const pokemonImage = document.createElement('img');
    pokemonImage.src = details.sprites.front_default;

    // Like Button
    const likeIcon = document.createElement('span');
    likeIcon.textContent = '❤️';
    likeIcon.classList.add('like-icon');

    pokemonTitleContainer.append(pokemonTitle, likeIcon);

    // Buttons and Reservation Buttons
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comments';
    const reservationButton = document.createElement('button');
    reservationButton.textContent = 'Reservations';

    pokemonElement.append(pokemonImage, pokemonTitleContainer, commentButton, reservationButton);
    pokemonList.append(pokemonElement);
  });
}

// Export fuctions
export { getPokemonData, getPokemonDetails, displayPokemon };
