/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/module/buildCommentPopUp.js":
/*!*****************************************!*\
  !*** ./src/module/buildCommentPopUp.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BuildCommentPopUp)
/* harmony export */ });
/* harmony import */ var _comment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment.js */ "./src/module/comment.js");
/* harmony import */ var _involvementApi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./involvementApi.js */ "./src/module/involvementApi.js");
/* harmony import */ var _viewFunctions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viewFunctions.js */ "./src/module/viewFunctions.js");



class BuildCommentPopUp {
  constructor(pokemon, details, features) {
    (0,_viewFunctions_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.element = {};
    this.element.root = BuildCommentPopUp.createRoot();
    this.element.image = this.element.root.querySelector('#image-pokemon');
    this.element.image.src = details.sprites.front_default;
    this.element.pokemonName = this.element.root.querySelector('#pokemon-name');
    this.element.pokemonName.innerText = pokemon.name;
    const pokemonAbilities = details.abilities;
    // because we don't know the exact number of abilities of each pokemon
    this.element.abilitiesList = this.element.root.querySelector('#abilities-list');
    pokemonAbilities.forEach(ability => {
      const itemAbility = document.createElement('li');
      itemAbility.innerText = ability.ability.name;
      this.element.abilitiesList.appendChild(itemAbility);
    });
    // forms
    this.element.formList = this.element.root.querySelector('#forms-list');
    const pokemonForm = details.forms;
    pokemonForm.forEach(form => {
      const itemForm = document.createElement('li');
      itemForm.innerText = form.name;
      this.element.formList.appendChild(itemForm);
    });
    // stats
    this.element.statsList = this.element.root.querySelector('#stats-list');
    const pokemonStats = details.stats;
    pokemonStats.forEach(stat => {
      const itemStat = document.createElement('li');
      itemStat.innerText = `${stat.stat.name} : ${stat.base_stat}`;
      this.element.statsList.appendChild(itemStat);
    });

    // weight
    this.element.weightList = this.element.root.querySelector('#weight-list');
    const itemWeight = document.createElement('li');
    itemWeight.innerText = details.weight;
    this.element.weightList.appendChild(itemWeight);
    this.element.commentList = this.element.root.querySelector('#comment-list');
    this.element.numberOfComments = this.element.root.querySelector('#commentCount');
    BuildCommentPopUp.getComments(features.itemId, this.element.commentList, this.element.numberOfComments);
    this.element.form = this.element.root.querySelector('form');
    this.element.userName = this.element.root.querySelector('#comment-pop-up_input_name');
    this.element.comment = this.element.root.querySelector('#comment-pop-up_textarea_content');
    this.element.submitButton = this.element.root.querySelector('#comment-pop-up_submit');
    this.element.submitButton.addEventListener('click', e => {
      e.preventDefault();
      const userName = this.element.userName.value.trim();
      const commentContent = this.element.comment.value.trim();
      const comment = new _comment_js__WEBPACK_IMPORTED_MODULE_0__["default"](features.itemId, userName, commentContent);
      BuildCommentPopUp.saveComment(comment);
      this.element.commentList.innerText = '';
      this.element.form.reset();
      setTimeout(() => {
        BuildCommentPopUp.getComments(features.itemId, this.element.commentList, this.element.numberOfComments);
      }, 1000);
    });
    this.element.xButton = this.element.root.querySelector('.x-button');
    this.element.xButton.addEventListener('click', () => {
      this.element.root.parentElement.removeChild(this.element.root);
      (0,_viewFunctions_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    });
  }
  static createRoot = () => {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
        <div class="comment-pop-up">
        <button class="x-button pop-up-buttons"><i class="bi bi-x-lg"></i></button>
        <div class="comment-pop-up-image-container">
            <img src="" alt="pokemon image" id = 'image-pokemon'>
        </div>
        <h2 id='pokemon-name'></h2>
        <div class="comment-pop-up-details">
            <ul>
                <li class = 'item-detail'><span>Abilities</span> :
                    <ul id= 'abilities-list'>
                    </ul>
                </li>
                <li class = 'item-detail'><span>Forms</span> :
                    <ul id= 'forms-list'>
                    </ul>
                </li>
                <li class = 'item-detail'><span>Stats</span> :
                    <ul id='stats-list'>
                    </ul>
                </li>
                <li class = 'item-detail'><span>weight</span> :
                    <ul id= 'weight-list'>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="comment-pop-up-comments-number-container">
            <h3 >
                Comments (<span id='commentCount'></span>)
            </h3>
            <ul id = 'comment-list'>
            </ul>
        </div>
        <div class="comment-pop-up_form_container">
            <h3>Add comment</h3>
            <form action="" class='form'>
                <input type="text" name="comment-pop-up_input_name" id="comment-pop-up_input_name" class="comment-pop-up_input_name" placeholder="Your name">
                <textarea name="comment-pop-up_textarea_content" id="comment-pop-up_textarea_content" cols="30" rows="10" placeholder="Your insights"></textarea>
                <button type="submit" id="comment-pop-up_submit" class="pop-up-buttons">
                    Comment
                </button>
            </form>
        </div>
        
    </div>
            `).children[0];
  };
  static saveComment = async comment => {
    const message = await (0,_involvementApi_js__WEBPACK_IMPORTED_MODULE_1__.postComment)(comment);
    return message;
  };
  static getComments = async (idPokemon, parent, count) => {
    try {
      const comments = await (0,_involvementApi_js__WEBPACK_IMPORTED_MODULE_1__.getComment)(idPokemon);
      count.innerText = comments.length;
      comments.forEach(comment => {
        const itemComment = document.createElement('li');
        itemComment.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
        parent.appendChild(itemComment);
      });
    } catch (error) {
      count.innerHTML = 0;
      parent.innerHTML = '<p>No comment yet</p>';
    }
  };
}

/***/ }),

/***/ "./src/module/comment.js":
/*!*******************************!*\
  !*** ./src/module/comment.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Comment)
/* harmony export */ });
class Comment {
  constructor(itemId, userName, comment) {
    this.itemId = itemId;
    this.userName = userName;
    this.comment = comment;
  }
}

/***/ }),

/***/ "./src/module/involvementApi.js":
/*!**************************************!*\
  !*** ./src/module/involvementApi.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComment: () => (/* binding */ getComment),
/* harmony export */   getLikes: () => (/* binding */ getLikes),
/* harmony export */   postComment: () => (/* binding */ postComment),
/* harmony export */   postLike: () => (/* binding */ postLike)
/* harmony export */ });
const getComment = async idPokemon => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/comments?item_id=${idPokemon}`).catch(error => new Error(error));
  const comments = await response.json();
  return comments;
};
const postComment = async comment => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: comment.itemId,
      username: comment.userName,
      comment: comment.comment
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).catch(error => new Error(error));
  const msg = await response;
  return msg;
};
const postLike = async pokemonId => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: pokemonId
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).catch(error => new Error(error));
  const result = await response;
  return result;
};
const getLikes = async () => {
  let likes;
  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/likes');

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is not empty
    if (response.headers.get('content-length') === '0' || response.status === 204) {
      likes = [];
    } else {
      likes = await response.json();
    }
  } catch (error) {
    likes = [];
  }
  return likes;
};


/***/ }),

/***/ "./src/module/pokemon.js":
/*!*******************************!*\
  !*** ./src/module/pokemon.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayPokemon: () => (/* binding */ displayPokemon),
/* harmony export */   getPokemonData: () => (/* binding */ getPokemonData),
/* harmony export */   getPokemonDetails: () => (/* binding */ getPokemonDetails)
/* harmony export */ });
/* harmony import */ var _buildCommentPopUp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildCommentPopUp.js */ "./src/module/buildCommentPopUp.js");
/* harmony import */ var _involvementApi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./involvementApi.js */ "./src/module/involvementApi.js");


const container = document.querySelector('.main');

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

  // Get the list of likes from the API
  const likesData = await (0,_involvementApi_js__WEBPACK_IMPORTED_MODULE_1__.getLikes)();

  // Convert the forEach loop to a map loop that returns promises
  const pokemonPromises = pokemonData.map(async (pokemon, index) => {
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
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('like-icon', 'far', 'fa-heart');

    // Create a span to hold the likes count
    const likesCount = document.createElement('span');
    likesCount.classList.add('likes-count');

    // Check if this pokemon is in the list of likes
    const likeObj = likesData.find(obj => obj.item_id === pokemon.name);
    if (likeObj) {
      likeIcon.classList.remove('far');
      likeIcon.classList.add('fas'); // filled heart
      likesCount.textContent = likeObj.likes; // update likes count
    }

    // eslint-disable-next-line max-len
    pokemonTitleContainer.append(pokemonTitle, likeIcon, likesCount); // append likes count to container

    // Buttons and Reservation Buttons
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comments';
    commentButton.id = `idPokemon-${index}`;
    pokemonElement.append(pokemonImage, pokemonTitleContainer, commentButton);
    commentButton.addEventListener('click', e => {
      const itemId = e.target.id;
      const popUp = new _buildCommentPopUp_js__WEBPACK_IMPORTED_MODULE_0__["default"](pokemon, details, {
        itemId
      });
      container.appendChild(popUp.element.root);
      pokemonList.classList.add('hidden');
    });

    // Event listener for the like button
    likeIcon.addEventListener('click', async () => {
      if (likeIcon.classList.contains('far')) {
        // Post the like to the API
        await (0,_involvementApi_js__WEBPACK_IMPORTED_MODULE_1__.postLike)(pokemon.name);
        // Change the icon to filled
        likeIcon.classList.remove('far');
        likeIcon.classList.add('fas');
        // Increment the likes count
        likesCount.textContent = Number(likesCount.textContent) + 1;
      } else {
        // Change the icon to empty
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
      }
    });

    // Return a promise that resolves when the Pokemon has been added to the DOM
    return new Promise(resolve => {
      pokemonList.append(pokemonElement);
      resolve();
    });
  });

  // Wait for all the Pokemon to be added to the DOM
  await Promise.all(pokemonPromises);
}

// Export functions


/***/ }),

/***/ "./src/module/pokemonCounter.js":
/*!**************************************!*\
  !*** ./src/module/pokemonCounter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pokemon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pokemon.js */ "./src/module/pokemon.js");

const updatePokemonCounter = async () => {
  const pokemonCounter = document.getElementById('pokemon-counter');
  if (pokemonCounter) {
    const data = await (0,_pokemon_js__WEBPACK_IMPORTED_MODULE_0__.getPokemonData)();
    pokemonCounter.textContent = data.length;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updatePokemonCounter);

/***/ }),

/***/ "./src/module/viewFunctions.js":
/*!*************************************!*\
  !*** ./src/module/viewFunctions.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const hideOrDisplayHeaderAndFooter = () => {
  const footer = document.querySelector('.footer');
  const pokemonList = document.querySelector('.pokemon-list');
  const header = document.querySelector('.navbar');
  footer.classList.toggle('hidden');
  pokemonList.classList.toggle('hidden');
  header.classList.toggle('hidden');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hideOrDisplayHeaderAndFooter);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/logo/pokemon-logo.png */ "./src/assets/logo/pokemon-logo.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 2vw;
  font-weight: 600;
}

body {
  box-sizing: border-box;
  padding: 0 4vw;
  margin: 0;
  background-color: #fff;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  padding: 0 1vw;
  position: sticky;
  background-color: #f2d18d;
  height: 7.5vw;
  top: 0;
  z-index: 1000;
  border: 2px solid #000;
  box-shadow:
    3px 3px 0 2px #000,
    -3px -3px 0 2px #c0c0c0,
    3px 3px 5px 4px #a9a9a9 inset,
    -3px -3px 5px 4px #fff inset;
}

.main {
  padding-top: 10px;  /* Ajusta este valor según sea necesario */
}

.pokemon-item img {
  max-width: 100%;
}

#pokemon-counter {
  margin-bottom: 50px;
}

.comment-pop-up div img {
  width: 35vw;
}

.navbar .logo img {
  height: 6vw;
}

.navbar nav ul {
  display: flex;
  list-style: none;
}

.comment-pop-up li {
  list-style: none;
}

.comment-pop-up-details ul li {
  width: 40%;
}

.navbar nav ul li {
  margin: 0 1vw;
}

#comment-list li {
  font-size: 0.8rem;
  font-family: cursive;
}

.navbar nav ul li a {
  text-decoration: none;
  color: inherit;
}

.lists a:hover {
  color: rgb(36, 94, 180);
}

.lists a.active {
  color: rgb(36, 94, 180);
}

.navbar nav ul li a:hover {
  color: rgb(36, 94, 180);
}

.navbar nav ul li a.active {
  color: rgb(36, 94, 180);
}

.logo {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: no-repeat;
  background-size: contain;
  width: 6vw;
  height: 6vw;
  background-position: center;
}

.header {
  height: 6vw;
  display: flex;
  align-items: center;
}

footer {
  height: 5vw;
  display: flex;
  align-items: center;
  border: 2px solid #000;
  box-shadow:
    3px 3px 0 2px #000,
    -3px -3px 0 2px #c0c0c0,
    3px 3px 5px 4px #a9a9a9 inset,
    -3px -3px 5px 4px #fff inset;
  padding: 0 1vw;
  position: sticky;
  background-color: #fff;
  bottom: 0;
  z-index: 1000;
}

.footer {
  font-size: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  padding: 0 1vw;
  position: relative;
  background-color: #fff;
  height: 5vw;
  bottom: 0;
  z-index: 1000;
}

/* ---------- POKEMON LIST ---------- */

.pokemon-list {
  flex-shrink: 0;
  display: flex;
  margin-top: 0.1vw;
  margin-bottom: 5vw;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  height: 100vh;
  padding-top: 7.5vw; /* Added to account for the navbar */
}

.pokemon-item {
  flex-basis: calc(30% - 2em);
  margin: 1em;
  padding: 2em;
  text-align: center;
  box-sizing: border-box;
  height: 50vh;
  width: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-between; /* Added to space out the elements */
  background-color: #fff;
  border: 2px solid #000;
  box-shadow:
    3px 3px 0 2px #000,
    -3px -3px 0 2px #c0c0c0,
    3px 3px 5px 4px #a9a9a9 inset,
    -3px -3px 5px 4px #fff inset;
}

.comment-button {
  padding: 1em;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow:
    3px 3px 0 2px #000,
    -3px -3px 0 2px #c0c0c0,
    3px 3px 5px 4px #a9a9a9 inset,
    -3px -3px 5px 4px #fff inset;
  transition: 0.3s;
  text-decoration: none;
  text-align: center;
}

.comment-button:hover {
  background-color: #c0c0c0;
}

.comment-button:active {
  box-shadow:
    -3px -3px 0 2px #000,
    3px 3px 0 2px #c0c0c0,
    -3px -3px 5px 4px #a9a9a9 inset,
    3px 3px 5px 4px #fff inset;
}

.comment-button:active,
.reservation-button:active {
  border-style: inset;
}

.like-icon {
  font-size: 1em;
  position: absolute;
  top: 14px;
  right: 50px;
}

.likes-count {
  font-size: 0.5em;
  position: absolute;
  top: 10px; /* Ajusta este valor según sea necesario */
  right: 10px; /* Ajusta este valor según sea necesario */
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* ---------- COMMENTS POP UP ---------- */

span {
  font-weight: 900;
}

.comment-pop-up {
  width: 80%;
  margin: 1vh auto;
  display: flex;
  flex-direction: column;
  padding: 1vh 3vw;
  align-items: center;
  border: 0.3rem solid #000;
  border-radius: 0.9rem;
}

.comment-pop-up > * {
  box-sizing: border-box;
}

.x-button {
  align-self: flex-end;
  font-weight: 900;
  background: none;
  border-radius: 0.4rem;
  cursor: pointer;
}

.pop-up-buttons:hover {
  background-color: #000;
  color: #fff;
  padding-right: 1rem;
  padding-left: 0.5rem;
}

.pop-up-buttons::after {
  position: absolute;
  opacity: 0;
  transition: 0.5s;
}

.pop-up-buttons:hover::after {
  opacity: 1;
  right: 0.5rem;
}

.pop-up-buttons:focus {
  color: #f00;
}

.comment-pop-up h2 {
  font-size: 5vw;
  margin: 0.5rem;
}

.comment-pop-up h3 {
  font-size: 4vh;
  margin: 0 auto;
}

.comment-pop-up-details ul:nth-child(1) {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

#abilities-list li,
#stats-list li,
#forms-list li,
#weight-list li {
  font-size: 0.78rem;
  width: fit-content;
  font-family: cursive;
}

.comment-pop-up-comments-number-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#commentCount {
  font-size: inherit;
}

.comment-pop-up_form_container h3 {
  text-align: center;
}

.comment-pop-up_form_container form {
  display: flex;
  flex-direction: column;
  row-gap: 1.3vh;
}

.comment-pop-up_form_container form input,
.comment-pop-up_form_container form textarea {
  border: 0.2rem solid #000;
  border-radius: 0.3rem;
}

.comment-pop-up_form_container form input:hover,
.comment-pop-up_form_container form textarea:hover {
  border: 0.2rem solid #2b2828;
  border-radius: 0.3rem;
  background: #f9f7f7;
}

.comment-pop-up_form_container form button {
  width: fit-content;
  padding: 0.2rem 0.5rem;
}

.hidden {
  display: none;
}
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\n\n* {\n  font-family: 'Press Start 2P', sans-serif;\n  font-size: 2vw;\n  font-weight: 600;\n}\n\nbody {\n  box-sizing: border-box;\n  padding: 0 4vw;\n  margin: 0;\n  background-color: #fff;\n}\n\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 90vw;\n  padding: 0 1vw;\n  position: sticky;\n  background-color: #f2d18d;\n  height: 7.5vw;\n  top: 0;\n  z-index: 1000;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n}\n\n.main {\n  padding-top: 10px;  /* Ajusta este valor según sea necesario */\n}\n\n.pokemon-item img {\n  max-width: 100%;\n}\n\n#pokemon-counter {\n  margin-bottom: 50px;\n}\n\n.comment-pop-up div img {\n  width: 35vw;\n}\n\n.navbar .logo img {\n  height: 6vw;\n}\n\n.navbar nav ul {\n  display: flex;\n  list-style: none;\n}\n\n.comment-pop-up li {\n  list-style: none;\n}\n\n.comment-pop-up-details ul li {\n  width: 40%;\n}\n\n.navbar nav ul li {\n  margin: 0 1vw;\n}\n\n#comment-list li {\n  font-size: 0.8rem;\n  font-family: cursive;\n}\n\n.navbar nav ul li a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.lists a:hover {\n  color: rgb(36, 94, 180);\n}\n\n.lists a.active {\n  color: rgb(36, 94, 180);\n}\n\n.navbar nav ul li a:hover {\n  color: rgb(36, 94, 180);\n}\n\n.navbar nav ul li a.active {\n  color: rgb(36, 94, 180);\n}\n\n.logo {\n  background-image: url('./assets/logo/pokemon-logo.png');\n  background-repeat: no-repeat;\n  background-size: contain;\n  width: 6vw;\n  height: 6vw;\n  background-position: center;\n}\n\n.header {\n  height: 6vw;\n  display: flex;\n  align-items: center;\n}\n\nfooter {\n  height: 5vw;\n  display: flex;\n  align-items: center;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n  padding: 0 1vw;\n  position: sticky;\n  background-color: #fff;\n  bottom: 0;\n  z-index: 1000;\n}\n\n.footer {\n  font-size: 1vw;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 90vw;\n  padding: 0 1vw;\n  position: relative;\n  background-color: #fff;\n  height: 5vw;\n  bottom: 0;\n  z-index: 1000;\n}\n\n/* ---------- POKEMON LIST ---------- */\n\n.pokemon-list {\n  flex-shrink: 0;\n  display: flex;\n  margin-top: 0.1vw;\n  margin-bottom: 5vw;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-content: center;\n  height: 100vh;\n  padding-top: 7.5vw; /* Added to account for the navbar */\n}\n\n.pokemon-item {\n  flex-basis: calc(30% - 2em);\n  margin: 1em;\n  padding: 2em;\n  text-align: center;\n  box-sizing: border-box;\n  height: 50vh;\n  width: 20vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  justify-content: space-between; /* Added to space out the elements */\n  background-color: #fff;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n}\n\n.comment-button {\n  padding: 1em;\n  background-color: #fff;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n  transition: 0.3s;\n  text-decoration: none;\n  text-align: center;\n}\n\n.comment-button:hover {\n  background-color: #c0c0c0;\n}\n\n.comment-button:active {\n  box-shadow:\n    -3px -3px 0 2px #000,\n    3px 3px 0 2px #c0c0c0,\n    -3px -3px 5px 4px #a9a9a9 inset,\n    3px 3px 5px 4px #fff inset;\n}\n\n.comment-button:active,\n.reservation-button:active {\n  border-style: inset;\n}\n\n.like-icon {\n  font-size: 1em;\n  position: absolute;\n  top: 14px;\n  right: 50px;\n}\n\n.likes-count {\n  font-size: 0.5em;\n  position: absolute;\n  top: 10px; /* Ajusta este valor según sea necesario */\n  right: 10px; /* Ajusta este valor según sea necesario */\n}\n\n.title-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n\n/* ---------- COMMENTS POP UP ---------- */\n\nspan {\n  font-weight: 900;\n}\n\n.comment-pop-up {\n  width: 80%;\n  margin: 1vh auto;\n  display: flex;\n  flex-direction: column;\n  padding: 1vh 3vw;\n  align-items: center;\n  border: 0.3rem solid #000;\n  border-radius: 0.9rem;\n}\n\n.comment-pop-up > * {\n  box-sizing: border-box;\n}\n\n.x-button {\n  align-self: flex-end;\n  font-weight: 900;\n  background: none;\n  border-radius: 0.4rem;\n  cursor: pointer;\n}\n\n.pop-up-buttons:hover {\n  background-color: #000;\n  color: #fff;\n  padding-right: 1rem;\n  padding-left: 0.5rem;\n}\n\n.pop-up-buttons::after {\n  position: absolute;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.pop-up-buttons:hover::after {\n  opacity: 1;\n  right: 0.5rem;\n}\n\n.pop-up-buttons:focus {\n  color: #f00;\n}\n\n.comment-pop-up h2 {\n  font-size: 5vw;\n  margin: 0.5rem;\n}\n\n.comment-pop-up h3 {\n  font-size: 4vh;\n  margin: 0 auto;\n}\n\n.comment-pop-up-details ul:nth-child(1) {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n}\n\n#abilities-list li,\n#stats-list li,\n#forms-list li,\n#weight-list li {\n  font-size: 0.78rem;\n  width: fit-content;\n  font-family: cursive;\n}\n\n.comment-pop-up-comments-number-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#commentCount {\n  font-size: inherit;\n}\n\n.comment-pop-up_form_container h3 {\n  text-align: center;\n}\n\n.comment-pop-up_form_container form {\n  display: flex;\n  flex-direction: column;\n  row-gap: 1.3vh;\n}\n\n.comment-pop-up_form_container form input,\n.comment-pop-up_form_container form textarea {\n  border: 0.2rem solid #000;\n  border-radius: 0.3rem;\n}\n\n.comment-pop-up_form_container form input:hover,\n.comment-pop-up_form_container form textarea:hover {\n  border: 0.2rem solid #2b2828;\n  border-radius: 0.3rem;\n  background: #f9f7f7;\n}\n\n.comment-pop-up_form_container form button {\n  width: fit-content;\n  padding: 0.2rem 0.5rem;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/logo/pokemon-logo.png":
/*!******************************************!*\
  !*** ./src/assets/logo/pokemon-logo.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bebb70366dd13b4990f7.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _module_pokemon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/pokemon.js */ "./src/module/pokemon.js");
/* harmony import */ var _module_pokemonCounter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/pokemonCounter.js */ "./src/module/pokemonCounter.js");



(0,_module_pokemon_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemon)().then(() => (0,_module_pokemonCounter_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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Ozs7Ozs7O0FDQXFCO0FBQ2dDO0FBQ1M7QUFFOURxRyxrRUFBYyxDQUFDLENBQUMsQ0FBQ29DLElBQUksQ0FBQyxNQUFNTixxRUFBb0IsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9idWlsZENvbW1lbnRQb3BVcC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvY29tbWVudC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvaW52b2x2ZW1lbnRBcGkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3Bva2Vtb25Db3VudGVyLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS92aWV3RnVuY3Rpb25zLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWVudCBmcm9tICcuL2NvbW1lbnQuanMnO1xuaW1wb3J0IHsgZ2V0Q29tbWVudCwgcG9zdENvbW1lbnQgfSBmcm9tICcuL2ludm9sdmVtZW50QXBpLmpzJztcbmltcG9ydCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIGZyb20gJy4vdmlld0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1aWxkQ29tbWVudFBvcFVwIHtcbiAgY29uc3RydWN0b3IocG9rZW1vbiwgZGV0YWlscywgZmVhdHVyZXMpIHtcbiAgICBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyKCk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSB7fTtcbiAgICB0aGlzLmVsZW1lbnQucm9vdCA9IEJ1aWxkQ29tbWVudFBvcFVwLmNyZWF0ZVJvb3QoKTtcblxuICAgIHRoaXMuZWxlbWVudC5pbWFnZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZS1wb2tlbW9uJyk7XG4gICAgdGhpcy5lbGVtZW50LmltYWdlLnNyYyA9IGRldGFpbHMuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuXG4gICAgdGhpcy5lbGVtZW50LnBva2Vtb25OYW1lID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3Bva2Vtb24tbmFtZScpO1xuICAgIHRoaXMuZWxlbWVudC5wb2tlbW9uTmFtZS5pbm5lclRleHQgPSBwb2tlbW9uLm5hbWU7XG5cbiAgICBjb25zdCBwb2tlbW9uQWJpbGl0aWVzID0gZGV0YWlscy5hYmlsaXRpZXM7XG4gICAgLy8gYmVjYXVzZSB3ZSBkb24ndCBrbm93IHRoZSBleGFjdCBudW1iZXIgb2YgYWJpbGl0aWVzIG9mIGVhY2ggcG9rZW1vblxuICAgIHRoaXMuZWxlbWVudC5hYmlsaXRpZXNMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2FiaWxpdGllcy1saXN0Jyk7XG4gICAgcG9rZW1vbkFiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5KSA9PiB7XG4gICAgICBjb25zdCBpdGVtQWJpbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtQWJpbGl0eS5pbm5lclRleHQgPSBhYmlsaXR5LmFiaWxpdHkubmFtZTtcbiAgICAgIHRoaXMuZWxlbWVudC5hYmlsaXRpZXNMaXN0LmFwcGVuZENoaWxkKGl0ZW1BYmlsaXR5KTtcbiAgICB9KTtcbiAgICAvLyBmb3Jtc1xuICAgIHRoaXMuZWxlbWVudC5mb3JtTGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNmb3Jtcy1saXN0Jyk7XG4gICAgY29uc3QgcG9rZW1vbkZvcm0gPSBkZXRhaWxzLmZvcm1zO1xuICAgIHBva2Vtb25Gb3JtLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1Gb3JtLmlubmVyVGV4dCA9IGZvcm0ubmFtZTtcbiAgICAgIHRoaXMuZWxlbWVudC5mb3JtTGlzdC5hcHBlbmRDaGlsZChpdGVtRm9ybSk7XG4gICAgfSk7XG4gICAgLy8gc3RhdHNcbiAgICB0aGlzLmVsZW1lbnQuc3RhdHNMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3N0YXRzLWxpc3QnKTtcbiAgICBjb25zdCBwb2tlbW9uU3RhdHMgPSBkZXRhaWxzLnN0YXRzO1xuICAgIHBva2Vtb25TdGF0cy5mb3JFYWNoKChzdGF0KSA9PiB7XG4gICAgICBjb25zdCBpdGVtU3RhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtU3RhdC5pbm5lclRleHQgPSBgJHtzdGF0LnN0YXQubmFtZX0gOiAke3N0YXQuYmFzZV9zdGF0fWA7XG4gICAgICB0aGlzLmVsZW1lbnQuc3RhdHNMaXN0LmFwcGVuZENoaWxkKGl0ZW1TdGF0KTtcbiAgICB9KTtcblxuICAgIC8vIHdlaWdodFxuICAgIHRoaXMuZWxlbWVudC53ZWlnaHRMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3dlaWdodC1saXN0Jyk7XG4gICAgY29uc3QgaXRlbVdlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaXRlbVdlaWdodC5pbm5lclRleHQgPSBkZXRhaWxzLndlaWdodDtcbiAgICB0aGlzLmVsZW1lbnQud2VpZ2h0TGlzdC5hcHBlbmRDaGlsZChpdGVtV2VpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LWxpc3QnKTtcbiAgICB0aGlzLmVsZW1lbnQubnVtYmVyT2ZDb21tZW50cyA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50Q291bnQnKTtcbiAgICBCdWlsZENvbW1lbnRQb3BVcC5nZXRDb21tZW50cyhcbiAgICAgIGZlYXR1cmVzLml0ZW1JZCxcbiAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCxcbiAgICAgIHRoaXMuZWxlbWVudC5udW1iZXJPZkNvbW1lbnRzLFxuICAgICk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZm9ybSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgICB0aGlzLmVsZW1lbnQudXNlck5hbWUgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZScpO1xuICAgIHRoaXMuZWxlbWVudC5jb21tZW50ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnQnKTtcbiAgICB0aGlzLmVsZW1lbnQuc3VibWl0QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3N1Ym1pdCcpO1xuICAgIHRoaXMuZWxlbWVudC5zdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgdXNlck5hbWUgPSB0aGlzLmVsZW1lbnQudXNlck5hbWUudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgY29tbWVudENvbnRlbnQgPSB0aGlzLmVsZW1lbnQuY29tbWVudC52YWx1ZS50cmltKCk7XG4gICAgICBjb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnQoZmVhdHVyZXMuaXRlbUlkLCB1c2VyTmFtZSwgY29tbWVudENvbnRlbnQpO1xuICAgICAgQnVpbGRDb21tZW50UG9wVXAuc2F2ZUNvbW1lbnQoY29tbWVudCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QuaW5uZXJUZXh0ID0gJyc7XG4gICAgICB0aGlzLmVsZW1lbnQuZm9ybS5yZXNldCgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEJ1aWxkQ29tbWVudFBvcFVwLmdldENvbW1lbnRzKFxuICAgICAgICAgIGZlYXR1cmVzLml0ZW1JZCxcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QsXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm51bWJlck9mQ29tbWVudHMsXG4gICAgICAgICk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC54QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLngtYnV0dG9uJyk7XG4gICAgdGhpcy5lbGVtZW50LnhCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQucm9vdC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5yb290KTtcbiAgICAgIGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVJvb3QgPSAoKSA9PiB7XG4gICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICByYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgcmV0dXJuIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwieC1idXR0b24gcG9wLXVwLWJ1dHRvbnNcIj48aSBjbGFzcz1cImJpIGJpLXgtbGdcIj48L2k+PC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwicG9rZW1vbiBpbWFnZVwiIGlkID0gJ2ltYWdlLXBva2Vtb24nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGgyIGlkPSdwb2tlbW9uLW5hbWUnPjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1kZXRhaWxzXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5BYmlsaXRpZXM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSAnYWJpbGl0aWVzLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5Gb3Jtczwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9ICdmb3Jtcy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+U3RhdHM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSdzdGF0cy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+d2VpZ2h0PC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0gJ3dlaWdodC1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDMgPlxuICAgICAgICAgICAgICAgIENvbW1lbnRzICg8c3BhbiBpZD0nY29tbWVudENvdW50Jz48L3NwYW4+KVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDx1bCBpZCA9ICdjb21tZW50LWxpc3QnPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGgzPkFkZCBjb21tZW50PC9oMz5cbiAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIGNsYXNzPSdmb3JtJz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGlkPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGNsYXNzPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50XCIgaWQ9XCJjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50XCIgY29scz1cIjMwXCIgcm93cz1cIjEwXCIgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImNvbW1lbnQtcG9wLXVwX3N1Ym1pdFwiIGNsYXNzPVwicG9wLXVwLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgQ29tbWVudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgPC9kaXY+XG4gICAgICAgICAgICBgKS5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2F2ZUNvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHBvc3RDb21tZW50KGNvbW1lbnQpO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbW1lbnRzID0gYXN5bmMgKGlkUG9rZW1vbiwgcGFyZW50LCBjb3VudCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50KGlkUG9rZW1vbik7XG4gICAgICAgIGNvdW50LmlubmVyVGV4dCA9IGNvbW1lbnRzLmxlbmd0aDtcbiAgICAgICAgY29tbWVudHMuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1Db21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICBpdGVtQ29tbWVudC5pbm5lckhUTUwgPSBgJHtjb21tZW50LmNyZWF0aW9uX2RhdGV9ICR7Y29tbWVudC51c2VybmFtZX0gOiAke2NvbW1lbnQuY29tbWVudH1gO1xuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtQ29tbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY291bnQuaW5uZXJIVE1MID0gMDtcbiAgICAgICAgcGFyZW50LmlubmVySFRNTCA9ICc8cD5ObyBjb21tZW50IHlldDwvcD4nO1xuICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IHtcbiAgY29uc3RydWN0b3IoaXRlbUlkLCB1c2VyTmFtZSwgY29tbWVudCkge1xuICAgIHRoaXMuaXRlbUlkID0gaXRlbUlkO1xuICAgIHRoaXMudXNlck5hbWUgPSB1c2VyTmFtZTtcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50O1xuICB9XG59IiwiY29uc3QgZ2V0Q29tbWVudCA9IGFzeW5jIChpZFBva2Vtb24pID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvY29tbWVudHM/aXRlbV9pZD0ke2lkUG9rZW1vbn1gKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGNvbW1lbnRzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9jb21tZW50cycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBjb21tZW50Lml0ZW1JZCxcbiAgICAgIHVzZXJuYW1lOiBjb21tZW50LnVzZXJOYW1lLFxuICAgICAgY29tbWVudDogY29tbWVudC5jb21tZW50LFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBuZXcgRXJyb3IoZXJyb3IpKTtcbiAgY29uc3QgbXNnID0gYXdhaXQgcmVzcG9uc2U7XG4gIHJldHVybiBtc2c7XG59O1xuXG5jb25zdCBwb3N0TGlrZSA9IGFzeW5jIChwb2tlbW9uSWQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvbGlrZXMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogcG9rZW1vbklkLFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBuZXcgRXJyb3IoZXJyb3IpKTtcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgbGlrZXM7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvbGlrZXMnKTtcblxuICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGlzIG9rXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGlzIG5vdCBlbXB0eVxuICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSA9PT0gJzAnIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XG4gICAgICBsaWtlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWtlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGlrZXMgPSBbXTtcbiAgfVxuICByZXR1cm4gbGlrZXM7XG59O1xuXG5leHBvcnQge1xuICBnZXRDb21tZW50LCBwb3N0Q29tbWVudCwgcG9zdExpa2UsIGdldExpa2VzLFxufTtcbiIsImltcG9ydCBCdWlsZENvbW1lbnRQb3BVcCBmcm9tICcuL2J1aWxkQ29tbWVudFBvcFVwLmpzJztcbmltcG9ydCB7IHBvc3RMaWtlLCBnZXRMaWtlcyB9IGZyb20gJy4vaW52b2x2ZW1lbnRBcGkuanMnO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuXG4vLyBEYXRhIGZyb20gQVBJXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uRGF0YSgpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uP2xpbWl0PTYnKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGEucmVzdWx0cztcbn1cblxuLy8gU3BlY2lmaWMgUG9rZW1vbiBkZXRhaWxzXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uRGV0YWlscyh1cmwpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLy8gSFRNTCBlbGVtZW50cyBmb3IgZWFjaCBQb2tlbW9uXG5hc3luYyBmdW5jdGlvbiBkaXNwbGF5UG9rZW1vbigpIHtcbiAgY29uc3QgcG9rZW1vbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbi1saXN0Jyk7XG4gIGNvbnN0IHBva2Vtb25EYXRhID0gYXdhaXQgZ2V0UG9rZW1vbkRhdGEoKTtcblxuICAvLyBHZXQgdGhlIGxpc3Qgb2YgbGlrZXMgZnJvbSB0aGUgQVBJXG4gIGNvbnN0IGxpa2VzRGF0YSA9IGF3YWl0IGdldExpa2VzKCk7XG5cbiAgLy8gQ29udmVydCB0aGUgZm9yRWFjaCBsb29wIHRvIGEgbWFwIGxvb3AgdGhhdCByZXR1cm5zIHByb21pc2VzXG4gIGNvbnN0IHBva2Vtb25Qcm9taXNlcyA9IHBva2Vtb25EYXRhLm1hcChhc3luYyAocG9rZW1vbiwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBkZXRhaWxzID0gYXdhaXQgZ2V0UG9rZW1vbkRldGFpbHMocG9rZW1vbi51cmwpO1xuXG4gICAgY29uc3QgcG9rZW1vbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwb2tlbW9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwb2tlbW9uLWl0ZW0nKTtcblxuICAgIGNvbnN0IHBva2Vtb25UaXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBva2Vtb25UaXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aXRsZS1jb250YWluZXInKTtcblxuICAgIGNvbnN0IHBva2Vtb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgcG9rZW1vblRpdGxlLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xuXG4gICAgY29uc3QgcG9rZW1vbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgcG9rZW1vbkltYWdlLnNyYyA9IGRldGFpbHMuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuXG4gICAgLy8gTGlrZSBCdXR0b25cbiAgICBjb25zdCBsaWtlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdsaWtlLWljb24nLCAnZmFyJywgJ2ZhLWhlYXJ0Jyk7XG5cbiAgICAvLyBDcmVhdGUgYSBzcGFuIHRvIGhvbGQgdGhlIGxpa2VzIGNvdW50XG4gICAgY29uc3QgbGlrZXNDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsaWtlc0NvdW50LmNsYXNzTGlzdC5hZGQoJ2xpa2VzLWNvdW50Jyk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGlzIHBva2Vtb24gaXMgaW4gdGhlIGxpc3Qgb2YgbGlrZXNcbiAgICBjb25zdCBsaWtlT2JqID0gbGlrZXNEYXRhLmZpbmQoKG9iaikgPT4gb2JqLml0ZW1faWQgPT09IHBva2Vtb24ubmFtZSk7XG4gICAgaWYgKGxpa2VPYmopIHtcbiAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgbGlrZUljb24uY2xhc3NMaXN0LmFkZCgnZmFzJyk7IC8vIGZpbGxlZCBoZWFydFxuICAgICAgbGlrZXNDb3VudC50ZXh0Q29udGVudCA9IGxpa2VPYmoubGlrZXM7IC8vIHVwZGF0ZSBsaWtlcyBjb3VudFxuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9rZW1vblRpdGxlQ29udGFpbmVyLmFwcGVuZChwb2tlbW9uVGl0bGUsIGxpa2VJY29uLCBsaWtlc0NvdW50KTsgLy8gYXBwZW5kIGxpa2VzIGNvdW50IHRvIGNvbnRhaW5lclxuXG4gICAgLy8gQnV0dG9ucyBhbmQgUmVzZXJ2YXRpb24gQnV0dG9uc1xuICAgIGNvbnN0IGNvbW1lbnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb21tZW50QnV0dG9uLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICBjb21tZW50QnV0dG9uLmlkID0gYGlkUG9rZW1vbi0ke2luZGV4fWA7XG5cbiAgICBwb2tlbW9uRWxlbWVudC5hcHBlbmQocG9rZW1vbkltYWdlLCBwb2tlbW9uVGl0bGVDb250YWluZXIsIGNvbW1lbnRCdXR0b24pO1xuXG4gICAgY29tbWVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBpdGVtSWQgPSBlLnRhcmdldC5pZDtcbiAgICAgIGNvbnN0IHBvcFVwID0gbmV3IEJ1aWxkQ29tbWVudFBvcFVwKHBva2Vtb24sIGRldGFpbHMsIHsgaXRlbUlkIH0pO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcFVwLmVsZW1lbnQucm9vdCk7XG4gICAgICBwb2tlbW9uTGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50IGxpc3RlbmVyIGZvciB0aGUgbGlrZSBidXR0b25cbiAgICBsaWtlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChsaWtlSWNvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhcicpKSB7XG4gICAgICAgIC8vIFBvc3QgdGhlIGxpa2UgdG8gdGhlIEFQSVxuICAgICAgICBhd2FpdCBwb3N0TGlrZShwb2tlbW9uLm5hbWUpO1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGljb24gdG8gZmlsbGVkXG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgLy8gSW5jcmVtZW50IHRoZSBsaWtlcyBjb3VudFxuICAgICAgICBsaWtlc0NvdW50LnRleHRDb250ZW50ID0gTnVtYmVyKGxpa2VzQ291bnQudGV4dENvbnRlbnQpICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgaWNvbiB0byBlbXB0eVxuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXMnKTtcbiAgICAgICAgbGlrZUljb24uY2xhc3NMaXN0LmFkZCgnZmFyJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgUG9rZW1vbiBoYXMgYmVlbiBhZGRlZCB0byB0aGUgRE9NXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBwb2tlbW9uTGlzdC5hcHBlbmQocG9rZW1vbkVsZW1lbnQpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBXYWl0IGZvciBhbGwgdGhlIFBva2Vtb24gdG8gYmUgYWRkZWQgdG8gdGhlIERPTVxuICBhd2FpdCBQcm9taXNlLmFsbChwb2tlbW9uUHJvbWlzZXMpO1xufVxuXG4vLyBFeHBvcnQgZnVuY3Rpb25zXG5leHBvcnQgeyBnZXRQb2tlbW9uRGF0YSwgZ2V0UG9rZW1vbkRldGFpbHMsIGRpc3BsYXlQb2tlbW9uIH07XG4iLCJpbXBvcnQgeyBnZXRQb2tlbW9uRGF0YSB9IGZyb20gJy4vcG9rZW1vbi5qcyc7XG5cbmNvbnN0IHVwZGF0ZVBva2Vtb25Db3VudGVyID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwb2tlbW9uQ291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb2tlbW9uLWNvdW50ZXInKTtcbiAgaWYgKHBva2Vtb25Db3VudGVyKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFBva2Vtb25EYXRhKCk7XG4gICAgcG9rZW1vbkNvdW50ZXIudGV4dENvbnRlbnQgPSBkYXRhLmxlbmd0aDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlUG9rZW1vbkNvdW50ZXI7XG4iLCJjb25zdCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyID0gKCkgPT4ge1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyJyk7XG4gIGNvbnN0IHBva2Vtb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBva2Vtb24tbGlzdCcpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyJyk7XG4gIGZvb3Rlci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgcG9rZW1vbkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXI7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2xvZ28vcG9rZW1vbi1sb2dvLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIGZvbnQtZmFtaWx5OiAnUHJlc3MgU3RhcnQgMlAnLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDJ2dztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuYm9keSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDAgNHZ3O1xuICBtYXJnaW46IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi5uYXZiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDkwdnc7XG4gIHBhZGRpbmc6IDAgMXZ3O1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkMThkO1xuICBoZWlnaHQ6IDcuNXZ3O1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDEwMDA7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XG4gIGJveC1zaGFkb3c6XG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XG59XG5cbi5tYWluIHtcbiAgcGFkZGluZy10b3A6IDEwcHg7ICAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xufVxuXG4ucG9rZW1vbi1pdGVtIGltZyB7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuI3Bva2Vtb24tY291bnRlciB7XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG59XG5cbi5jb21tZW50LXBvcC11cCBkaXYgaW1nIHtcbiAgd2lkdGg6IDM1dnc7XG59XG5cbi5uYXZiYXIgLmxvZ28gaW1nIHtcbiAgaGVpZ2h0OiA2dnc7XG59XG5cbi5uYXZiYXIgbmF2IHVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWwgbGkge1xuICB3aWR0aDogNDAlO1xufVxuXG4ubmF2YmFyIG5hdiB1bCBsaSB7XG4gIG1hcmdpbjogMCAxdnc7XG59XG5cbiNjb21tZW50LWxpc3QgbGkge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgZm9udC1mYW1pbHk6IGN1cnNpdmU7XG59XG5cbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG4ubGlzdHMgYTpob3ZlciB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubGlzdHMgYS5hY3RpdmUge1xuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcbn1cblxuLm5hdmJhciBuYXYgdWwgbGkgYTpob3ZlciB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubmF2YmFyIG5hdiB1bCBsaSBhLmFjdGl2ZSB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubG9nbyB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICB3aWR0aDogNnZ3O1xuICBoZWlnaHQ6IDZ2dztcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xufVxuXG4uaGVhZGVyIHtcbiAgaGVpZ2h0OiA2dnc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmZvb3RlciB7XG4gIGhlaWdodDogNXZ3O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDJweCBzb2xpZCAjMDAwO1xuICBib3gtc2hhZG93OlxuICAgIDNweCAzcHggMCAycHggIzAwMCxcbiAgICAtM3B4IC0zcHggMCAycHggI2MwYzBjMCxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjZmZmIGluc2V0O1xuICBwYWRkaW5nOiAwIDF2dztcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm90dG9tOiAwO1xuICB6LWluZGV4OiAxMDAwO1xufVxuXG4uZm9vdGVyIHtcbiAgZm9udC1zaXplOiAxdnc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDkwdnc7XG4gIHBhZGRpbmc6IDAgMXZ3O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGhlaWdodDogNXZ3O1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IDEwMDA7XG59XG5cbi8qIC0tLS0tLS0tLS0gUE9LRU1PTiBMSVNUIC0tLS0tLS0tLS0gKi9cblxuLnBva2Vtb24tbGlzdCB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW4tdG9wOiAwLjF2dztcbiAgbWFyZ2luLWJvdHRvbTogNXZ3O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmctdG9wOiA3LjV2dzsgLyogQWRkZWQgdG8gYWNjb3VudCBmb3IgdGhlIG5hdmJhciAqL1xufVxuXG4ucG9rZW1vbi1pdGVtIHtcbiAgZmxleC1iYXNpczogY2FsYygzMCUgLSAyZW0pO1xuICBtYXJnaW46IDFlbTtcbiAgcGFkZGluZzogMmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGhlaWdodDogNTB2aDtcbiAgd2lkdGg6IDIwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XG4gIGJveC1zaGFkb3c6XG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XG59XG5cbi5jb21tZW50LWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDFlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcbiAgYm94LXNoYWRvdzpcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXG4gICAgM3B4IDNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcbiAgdHJhbnNpdGlvbjogMC4zcztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jb21tZW50LWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjMGMwYzA7XG59XG5cbi5jb21tZW50LWJ1dHRvbjphY3RpdmUge1xuICBib3gtc2hhZG93OlxuICAgIC0zcHggLTNweCAwIDJweCAjMDAwLFxuICAgIDNweCAzcHggMCAycHggI2MwYzBjMCxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxuICAgIDNweCAzcHggNXB4IDRweCAjZmZmIGluc2V0O1xufVxuXG4uY29tbWVudC1idXR0b246YWN0aXZlLFxuLnJlc2VydmF0aW9uLWJ1dHRvbjphY3RpdmUge1xuICBib3JkZXItc3R5bGU6IGluc2V0O1xufVxuXG4ubGlrZS1pY29uIHtcbiAgZm9udC1zaXplOiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNHB4O1xuICByaWdodDogNTBweDtcbn1cblxuLmxpa2VzLWNvdW50IHtcbiAgZm9udC1zaXplOiAwLjVlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHg7IC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXG4gIHJpZ2h0OiAxMHB4OyAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xufVxuXG4udGl0bGUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXG5cbnNwYW4ge1xuICBmb250LXdlaWdodDogOTAwO1xufVxuXG4uY29tbWVudC1wb3AtdXAge1xuICB3aWR0aDogODAlO1xuICBtYXJnaW46IDF2aCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwYWRkaW5nOiAxdmggM3Z3O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDAuM3JlbSBzb2xpZCAjMDAwO1xuICBib3JkZXItcmFkaXVzOiAwLjlyZW07XG59XG5cbi5jb21tZW50LXBvcC11cCA+ICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4ueC1idXR0b24ge1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wb3AtdXAtYnV0dG9uczpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gIGNvbG9yOiAjZmZmO1xuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcbn1cblxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogMC41cztcbn1cblxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XG4gIG9wYWNpdHk6IDE7XG4gIHJpZ2h0OiAwLjVyZW07XG59XG5cbi5wb3AtdXAtYnV0dG9uczpmb2N1cyB7XG4gIGNvbG9yOiAjZjAwO1xufVxuXG4uY29tbWVudC1wb3AtdXAgaDIge1xuICBmb250LXNpemU6IDV2dztcbiAgbWFyZ2luOiAwLjVyZW07XG59XG5cbi5jb21tZW50LXBvcC11cCBoMyB7XG4gIGZvbnQtc2l6ZTogNHZoO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWw6bnRoLWNoaWxkKDEpIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuI2FiaWxpdGllcy1saXN0IGxpLFxuI3N0YXRzLWxpc3QgbGksXG4jZm9ybXMtbGlzdCBsaSxcbiN3ZWlnaHQtbGlzdCBsaSB7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBmb250LWZhbWlseTogY3Vyc2l2ZTtcbn1cblxuLmNvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4jY29tbWVudENvdW50IHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xufVxuXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgaDMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMS4zdmg7XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0LFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWEge1xuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMDAwO1xuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0OmhvdmVyLFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWE6aG92ZXIge1xuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGJ1dHRvbiB7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgcGFkZGluZzogMC4ycmVtIDAuNXJlbTtcbn1cblxuLmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSx5Q0FBeUM7RUFDekMsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsU0FBUztFQUNULHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFdBQVc7RUFDWCxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtFQUN6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O0FBQ2pCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsZUFBZTtBQUNqQjs7QUFFQTs7OztFQUlFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBRUE7O0VBRUUseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTs7RUFFRSw0QkFBNEI7RUFDNUIscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuKiB7XFxuICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuYm9keSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMCA0dnc7XFxuICBtYXJnaW46IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG5cXG4ubmF2YmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogOTB2dztcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmQxOGQ7XFxuICBoZWlnaHQ6IDcuNXZ3O1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTAwMDtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICBib3gtc2hhZG93OlxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXG59XFxuXFxuLm1haW4ge1xcbiAgcGFkZGluZy10b3A6IDEwcHg7ICAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xcbn1cXG5cXG4ucG9rZW1vbi1pdGVtIGltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbiNwb2tlbW9uLWNvdW50ZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xcbiAgd2lkdGg6IDM1dnc7XFxufVxcblxcbi5uYXZiYXIgLmxvZ28gaW1nIHtcXG4gIGhlaWdodDogNnZ3O1xcbn1cXG5cXG4ubmF2YmFyIG5hdiB1bCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsIGxpIHtcXG4gIHdpZHRoOiA0MCU7XFxufVxcblxcbi5uYXZiYXIgbmF2IHVsIGxpIHtcXG4gIG1hcmdpbjogMCAxdnc7XFxufVxcblxcbiNjb21tZW50LWxpc3QgbGkge1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBmb250LWZhbWlseTogY3Vyc2l2ZTtcXG59XFxuXFxuLm5hdmJhciBuYXYgdWwgbGkgYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLmxpc3RzIGE6aG92ZXIge1xcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxufVxcblxcbi5saXN0cyBhLmFjdGl2ZSB7XFxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcXG59XFxuXFxuLm5hdmJhciBuYXYgdWwgbGkgYTpob3ZlciB7XFxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcXG59XFxuXFxuLm5hdmJhciBuYXYgdWwgbGkgYS5hY3RpdmUge1xcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxufVxcblxcbi5sb2dvIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9hc3NldHMvbG9nby9wb2tlbW9uLWxvZ28ucG5nJyk7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgd2lkdGg6IDZ2dztcXG4gIGhlaWdodDogNnZ3O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIGhlaWdodDogNnZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDV2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXG4gIGJveC1zaGFkb3c6XFxuICAgIDNweCAzcHggMCAycHggIzAwMCxcXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjZmZmIGluc2V0O1xcbiAgcGFkZGluZzogMCAxdnc7XFxuICBwb3NpdGlvbjogc3RpY2t5O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IDEwMDA7XFxufVxcblxcbi5mb290ZXIge1xcbiAgZm9udC1zaXplOiAxdnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiA5MHZ3O1xcbiAgcGFkZGluZzogMCAxdnc7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgaGVpZ2h0OiA1dnc7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiAxMDAwO1xcbn1cXG5cXG4vKiAtLS0tLS0tLS0tIFBPS0VNT04gTElTVCAtLS0tLS0tLS0tICovXFxuXFxuLnBva2Vtb24tbGlzdCB7XFxuICBmbGV4LXNocmluazogMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tdG9wOiAwLjF2dztcXG4gIG1hcmdpbi1ib3R0b206IDV2dztcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmctdG9wOiA3LjV2dzsgLyogQWRkZWQgdG8gYWNjb3VudCBmb3IgdGhlIG5hdmJhciAqL1xcbn1cXG5cXG4ucG9rZW1vbi1pdGVtIHtcXG4gIGZsZXgtYmFzaXM6IGNhbGMoMzAlIC0gMmVtKTtcXG4gIG1hcmdpbjogMWVtO1xcbiAgcGFkZGluZzogMmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGhlaWdodDogNTB2aDtcXG4gIHdpZHRoOiAyMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXG4gIGJveC1zaGFkb3c6XFxuICAgIDNweCAzcHggMCAycHggIzAwMCxcXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjZmZmIGluc2V0O1xcbn1cXG5cXG4uY29tbWVudC1idXR0b24ge1xcbiAgcGFkZGluZzogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICBib3gtc2hhZG93OlxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5jb21tZW50LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzBjMGMwO1xcbn1cXG5cXG4uY29tbWVudC1idXR0b246YWN0aXZlIHtcXG4gIGJveC1zaGFkb3c6XFxuICAgIC0zcHggLTNweCAwIDJweCAjMDAwLFxcbiAgICAzcHggM3B4IDAgMnB4ICNjMGMwYzAsXFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXFxuICAgIDNweCAzcHggNXB4IDRweCAjZmZmIGluc2V0O1xcbn1cXG5cXG4uY29tbWVudC1idXR0b246YWN0aXZlLFxcbi5yZXNlcnZhdGlvbi1idXR0b246YWN0aXZlIHtcXG4gIGJvcmRlci1zdHlsZTogaW5zZXQ7XFxufVxcblxcbi5saWtlLWljb24ge1xcbiAgZm9udC1zaXplOiAxZW07XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDE0cHg7XFxuICByaWdodDogNTBweDtcXG59XFxuXFxuLmxpa2VzLWNvdW50IHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwcHg7IC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXFxuICByaWdodDogMTBweDsgLyogQWp1c3RhIGVzdGUgdmFsb3Igc2Vnw7puIHNlYSBuZWNlc2FyaW8gKi9cXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi8qIC0tLS0tLS0tLS0gQ09NTUVOVFMgUE9QIFVQIC0tLS0tLS0tLS0gKi9cXG5cXG5zcGFuIHtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxufVxcblxcbi5jb21tZW50LXBvcC11cCB7XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luOiAxdmggYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogMXZoIDN2dztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IDAuM3JlbSBzb2xpZCAjMDAwO1xcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi54LWJ1dHRvbiB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcXG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXI6OmFmdGVyIHtcXG4gIG9wYWNpdHk6IDE7XFxuICByaWdodDogMC41cmVtO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xcbiAgY29sb3I6ICNmMDA7XFxufVxcblxcbi5jb21tZW50LXBvcC11cCBoMiB7XFxuICBmb250LXNpemU6IDV2dztcXG4gIG1hcmdpbjogMC41cmVtO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAgaDMge1xcbiAgZm9udC1zaXplOiA0dmg7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWw6bnRoLWNoaWxkKDEpIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuI2FiaWxpdGllcy1saXN0IGxpLFxcbiNzdGF0cy1saXN0IGxpLFxcbiNmb3Jtcy1saXN0IGxpLFxcbiN3ZWlnaHQtbGlzdCBsaSB7XFxuICBmb250LXNpemU6IDAuNzhyZW07XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBmb250LWZhbWlseTogY3Vyc2l2ZTtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jY29tbWVudENvdW50IHtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGgzIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICByb3ctZ2FwOiAxLjN2aDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQsXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWEge1xcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzAwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQ6aG92ZXIsXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWE6aG92ZXIge1xcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzJiMjgyODtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7XFxufVxcblxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjJyZW0gMC41cmVtO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5pbXBvcnQgeyBkaXNwbGF5UG9rZW1vbiB9IGZyb20gJy4vbW9kdWxlL3Bva2Vtb24uanMnO1xuaW1wb3J0IHVwZGF0ZVBva2Vtb25Db3VudGVyIGZyb20gJy4vbW9kdWxlL3Bva2Vtb25Db3VudGVyLmpzJztcblxuZGlzcGxheVBva2Vtb24oKS50aGVuKCgpID0+IHVwZGF0ZVBva2Vtb25Db3VudGVyKCkpO1xuIl0sIm5hbWVzIjpbIkNvbW1lbnQiLCJnZXRDb21tZW50IiwicG9zdENvbW1lbnQiLCJoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIiwiQnVpbGRDb21tZW50UG9wVXAiLCJjb25zdHJ1Y3RvciIsInBva2Vtb24iLCJkZXRhaWxzIiwiZmVhdHVyZXMiLCJlbGVtZW50Iiwicm9vdCIsImNyZWF0ZVJvb3QiLCJpbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJzcHJpdGVzIiwiZnJvbnRfZGVmYXVsdCIsInBva2Vtb25OYW1lIiwiaW5uZXJUZXh0IiwibmFtZSIsInBva2Vtb25BYmlsaXRpZXMiLCJhYmlsaXRpZXMiLCJhYmlsaXRpZXNMaXN0IiwiZm9yRWFjaCIsImFiaWxpdHkiLCJpdGVtQWJpbGl0eSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZm9ybUxpc3QiLCJwb2tlbW9uRm9ybSIsImZvcm1zIiwiZm9ybSIsIml0ZW1Gb3JtIiwic3RhdHNMaXN0IiwicG9rZW1vblN0YXRzIiwic3RhdHMiLCJzdGF0IiwiaXRlbVN0YXQiLCJiYXNlX3N0YXQiLCJ3ZWlnaHRMaXN0IiwiaXRlbVdlaWdodCIsIndlaWdodCIsImNvbW1lbnRMaXN0IiwibnVtYmVyT2ZDb21tZW50cyIsImdldENvbW1lbnRzIiwiaXRlbUlkIiwidXNlck5hbWUiLCJjb21tZW50Iiwic3VibWl0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwidHJpbSIsImNvbW1lbnRDb250ZW50Iiwic2F2ZUNvbW1lbnQiLCJyZXNldCIsInNldFRpbWVvdXQiLCJ4QnV0dG9uIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJib2R5IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2hpbGRyZW4iLCJtZXNzYWdlIiwiaWRQb2tlbW9uIiwicGFyZW50IiwiY291bnQiLCJjb21tZW50cyIsImxlbmd0aCIsIml0ZW1Db21tZW50IiwiaW5uZXJIVE1MIiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiZXJyb3IiLCJyZXNwb25zZSIsImZldGNoIiwiY2F0Y2giLCJFcnJvciIsImpzb24iLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJtc2ciLCJwb3N0TGlrZSIsInBva2Vtb25JZCIsInJlc3VsdCIsImdldExpa2VzIiwibGlrZXMiLCJvayIsInN0YXR1cyIsImdldCIsImNvbnRhaW5lciIsImdldFBva2Vtb25EYXRhIiwiZGF0YSIsInJlc3VsdHMiLCJnZXRQb2tlbW9uRGV0YWlscyIsInVybCIsImRpc3BsYXlQb2tlbW9uIiwicG9rZW1vbkxpc3QiLCJwb2tlbW9uRGF0YSIsImxpa2VzRGF0YSIsInBva2Vtb25Qcm9taXNlcyIsIm1hcCIsImluZGV4IiwicG9rZW1vbkVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwb2tlbW9uVGl0bGVDb250YWluZXIiLCJwb2tlbW9uVGl0bGUiLCJ0ZXh0Q29udGVudCIsInBva2Vtb25JbWFnZSIsImxpa2VJY29uIiwibGlrZXNDb3VudCIsImxpa2VPYmoiLCJmaW5kIiwib2JqIiwicmVtb3ZlIiwiYXBwZW5kIiwiY29tbWVudEJ1dHRvbiIsImlkIiwidGFyZ2V0IiwicG9wVXAiLCJjb250YWlucyIsIk51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwiYWxsIiwidXBkYXRlUG9rZW1vbkNvdW50ZXIiLCJwb2tlbW9uQ291bnRlciIsImdldEVsZW1lbnRCeUlkIiwiZm9vdGVyIiwiaGVhZGVyIiwidG9nZ2xlIiwidGhlbiJdLCJzb3VyY2VSb290IjoiIn0=