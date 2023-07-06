// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import updatePokemonCounter from '../module/pokemonCounter.js';

// Set up the fetch mock
global.fetch = fetchMock;

describe('updatePokemonCounter', () => {
  it('correctly counts pokemon items', async () => {
    document.body.innerHTML = `
      <div id="pokemon-counter"></div>
      <div class="pokemon-item"></div>
      <div class="pokemon-item"></div>
      <div class="pokemon-item"></div>
    `;

    // Mock a response from the API with three items
    fetchMock.mockResponseOnce(JSON.stringify({ results: Array(3) }));

    await updatePokemonCounter();
    const pokemonCounterElement = document.querySelector('#pokemon-counter');

    expect(pokemonCounterElement.textContent).toBe('3');
  });

  it('correctly handles no pokemon items', async () => {
    document.body.innerHTML = `
      <div id="pokemon-counter"></div>
    `;

    // Mock a response from the API with no items
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));

    await updatePokemonCounter();
    const pokemonCounterElement = document.querySelector('#pokemon-counter');

    expect(pokemonCounterElement.textContent).toBe('0');
  });

  it('does not throw error if no counter element present', async () => {
    document.body.innerHTML = `
      <div class="pokemon-item"></div>
      <div class="pokemon-item"></div>
    `;

    // Mock a response from the API with two items
    fetchMock.mockResponseOnce(JSON.stringify({ results: Array(2) }));

    expect(() => updatePokemonCounter()).not.toThrow();
  });
});
