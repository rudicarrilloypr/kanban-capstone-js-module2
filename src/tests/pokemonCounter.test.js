// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';
import updatePokemonCounter from '../module/pokemonCounter.js';

global.fetch = fetch;

describe('updatePokemonCounter', () => {
  it('correctly counts pokemon items', async () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <div id="pokemon-counter"></div>
          <div class="pokemon-item"></div>
          <div class="pokemon-item"></div>
          <div class="pokemon-item"></div>
        </body>
      </html>
    `);

    global.document.body.innerHTML = dom.window.document.body.innerHTML;
    await updatePokemonCounter();
    const pokemonCounterElement = document.querySelector('#pokemon-counter');

    expect(pokemonCounterElement.textContent).toBe('6');
  });

  it('correctly handles no pokemon items', async () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <div id="pokemon-counter"></div>
        </body>
      </html>
    `);

    global.document.body.innerHTML = dom.window.document.body.innerHTML;
    await updatePokemonCounter();
    const pokemonCounterElement = document.querySelector('#pokemon-counter');

    expect(pokemonCounterElement.textContent).toBe('6');
  });

  it('does not throw error if no counter element present', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <div class="pokemon-item"></div>
          <div class="pokemon-item"></div>
        </body>
      </html>
    `);

    global.document.body.innerHTML = dom.window.document.body.innerHTML;

    expect(() => updatePokemonCounter()).not.toThrow();
  });
});
