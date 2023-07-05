const hideOrDisplayHeaderAndFooter = () => {
  const footer = document.querySelector('.footer');
  const pokemonList = document.querySelector('.pokemon-list');
  const header = document.querySelector('.navbar');
  footer.classList.toggle('hidden');
  pokemonList.classList.toggle('hidden');
  header.classList.toggle('hidden');
};

export default hideOrDisplayHeaderAndFooter;