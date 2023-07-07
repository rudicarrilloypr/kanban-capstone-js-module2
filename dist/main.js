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
  font-size: 0.7rem;
  width: fit-content;
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
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\r\n\r\n* {\r\n  font-family: 'Press Start 2P', sans-serif;\r\n  font-size: 2vw;\r\n  font-weight: 600;\r\n}\r\n\r\nbody {\r\n  box-sizing: border-box;\r\n  padding: 0 4vw;\r\n  margin: 0;\r\n  background-color: #fff;\r\n}\r\n\r\n.navbar {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 90vw;\r\n  padding: 0 1vw;\r\n  position: sticky;\r\n  background-color: #f2d18d;\r\n  height: 7.5vw;\r\n  top: 0;\r\n  z-index: 1000;\r\n  border: 2px solid #000;\r\n  box-shadow:\r\n    3px 3px 0 2px #000,\r\n    -3px -3px 0 2px #c0c0c0,\r\n    3px 3px 5px 4px #a9a9a9 inset,\r\n    -3px -3px 5px 4px #fff inset;\r\n}\r\n\r\n.main {\r\n  padding-top: 10px;  /* Ajusta este valor según sea necesario */\r\n}\r\n\r\n.pokemon-item img {\r\n  max-width: 100%;\r\n}\r\n\r\n#pokemon-counter {\r\n  margin-bottom: 50px;\r\n}\r\n\r\n.comment-pop-up div img {\r\n  width: 35vw;\r\n}\r\n\r\n.navbar .logo img {\r\n  height: 6vw;\r\n}\r\n\r\n.navbar nav ul {\r\n  display: flex;\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up li {\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up-details ul li {\r\n  width: 40%;\r\n}\r\n\r\n.navbar nav ul li {\r\n  margin: 0 1vw;\r\n}\r\n\r\n.navbar nav ul li a {\r\n  text-decoration: none;\r\n  color: inherit;\r\n}\r\n\r\n.lists a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.lists a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.logo {\r\n  background-image: url('./assets/logo/pokemon-logo.png');\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  width: 6vw;\r\n  height: 6vw;\r\n  background-position: center;\r\n}\r\n\r\n.header {\r\n  height: 6vw;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\nfooter {\r\n  height: 5vw;\r\n  display: flex;\r\n  align-items: center;\r\n  border: 2px solid #000;\r\n  box-shadow:\r\n    3px 3px 0 2px #000,\r\n    -3px -3px 0 2px #c0c0c0,\r\n    3px 3px 5px 4px #a9a9a9 inset,\r\n    -3px -3px 5px 4px #fff inset;\r\n  padding: 0 1vw;\r\n  position: sticky;\r\n  background-color: #fff;\r\n  bottom: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n.footer {\r\n  font-size: 1vw;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  width: 90vw;\r\n  padding: 0 1vw;\r\n  position: relative;\r\n  background-color: #fff;\r\n  height: 5vw;\r\n  bottom: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n/* ---------- POKEMON LIST ---------- */\r\n\r\n.pokemon-list {\r\n  flex-shrink: 0;\r\n  display: flex;\r\n  margin-top: 0.1vw;\r\n  margin-bottom: 5vw;\r\n  flex-wrap: wrap;\r\n  justify-content: space-around;\r\n  align-content: center;\r\n  height: 100vh;\r\n  padding-top: 7.5vw; /* Added to account for the navbar */\r\n}\r\n\r\n.pokemon-item {\r\n  flex-basis: calc(30% - 2em);\r\n  margin: 1em;\r\n  padding: 2em;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  height: 50vh;\r\n  width: 20vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  position: relative;\r\n  justify-content: space-between; /* Added to space out the elements */\r\n  background-color: #fff;\r\n  border: 2px solid #000;\r\n  box-shadow:\r\n    3px 3px 0 2px #000,\r\n    -3px -3px 0 2px #c0c0c0,\r\n    3px 3px 5px 4px #a9a9a9 inset,\r\n    -3px -3px 5px 4px #fff inset;\r\n}\r\n\r\n.comment-button {\r\n  padding: 1em;\r\n  background-color: #fff;\r\n  border: 2px solid #000;\r\n  box-shadow:\r\n    3px 3px 0 2px #000,\r\n    -3px -3px 0 2px #c0c0c0,\r\n    3px 3px 5px 4px #a9a9a9 inset,\r\n    -3px -3px 5px 4px #fff inset;\r\n  transition: 0.3s;\r\n  text-decoration: none;\r\n  text-align: center;\r\n}\r\n\r\n.comment-button:hover {\r\n  background-color: #c0c0c0;\r\n}\r\n\r\n.comment-button:active {\r\n  box-shadow:\r\n    -3px -3px 0 2px #000,\r\n    3px 3px 0 2px #c0c0c0,\r\n    -3px -3px 5px 4px #a9a9a9 inset,\r\n    3px 3px 5px 4px #fff inset;\r\n}\r\n\r\n.comment-button:active,\r\n.reservation-button:active {\r\n  border-style: inset;\r\n}\r\n\r\n.like-icon {\r\n  font-size: 1em;\r\n  position: absolute;\r\n  top: 14px;\r\n  right: 50px;\r\n}\r\n\r\n.likes-count {\r\n  font-size: 0.5em;\r\n  position: absolute;\r\n  top: 10px; /* Ajusta este valor según sea necesario */\r\n  right: 10px; /* Ajusta este valor según sea necesario */\r\n}\r\n\r\n.title-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n/* ---------- COMMENTS POP UP ---------- */\r\n\r\nspan {\r\n  font-weight: 900;\r\n}\r\n\r\n.comment-pop-up {\r\n  width: 80%;\r\n  margin: 1vh auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 1vh 3vw;\r\n  align-items: center;\r\n  border: 0.3rem solid #000;\r\n  border-radius: 0.9rem;\r\n}\r\n\r\n.comment-pop-up > * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.x-button {\r\n  align-self: flex-end;\r\n  font-weight: 900;\r\n  background: none;\r\n  border-radius: 0.4rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.pop-up-buttons:hover {\r\n  background-color: #000;\r\n  color: #fff;\r\n  padding-right: 1rem;\r\n  padding-left: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons::after {\r\n  position: absolute;\r\n  opacity: 0;\r\n  transition: 0.5s;\r\n}\r\n\r\n.pop-up-buttons:hover::after {\r\n  opacity: 1;\r\n  right: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons:focus {\r\n  color: #f00;\r\n}\r\n\r\n.comment-pop-up h2 {\r\n  font-size: 5vw;\r\n  margin: 0.5rem;\r\n}\r\n\r\n.comment-pop-up h3 {\r\n  font-size: 4vh;\r\n  margin: 0 auto;\r\n}\r\n\r\n.comment-pop-up-details ul:nth-child(1) {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n#abilities-list li,\r\n#stats-list li,\r\n#forms-list li,\r\n#weight-list li {\r\n  font-size: 0.7rem;\r\n  width: fit-content;\r\n}\r\n\r\n.comment-pop-up-comments-number-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n#commentCount {\r\n  font-size: inherit;\r\n}\r\n\r\n.comment-pop-up_form_container h3 {\r\n  text-align: center;\r\n}\r\n\r\n.comment-pop-up_form_container form {\r\n  display: flex;\r\n  flex-direction: column;\r\n  row-gap: 1.3vh;\r\n}\r\n\r\n.comment-pop-up_form_container form input,\r\n.comment-pop-up_form_container form textarea {\r\n  border: 0.2rem solid #000;\r\n  border-radius: 0.3rem;\r\n}\r\n\r\n.comment-pop-up_form_container form input:hover,\r\n.comment-pop-up_form_container form textarea:hover {\r\n  border: 0.2rem solid #2b2828;\r\n  border-radius: 0.3rem;\r\n  background: #f9f7f7;\r\n}\r\n\r\n.comment-pop-up_form_container form button {\r\n  width: fit-content;\r\n  padding: 0.2rem 0.5rem;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFlBQVksU0FBUyxPQUFPLE9BQU8sS0FBSyx3QkFBd0IsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsU0FBUyxPQUFPLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLE1BQU0sYUFBYSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSx5QkFBeUIsYUFBYSxhQUFhLFNBQVMsT0FBTyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsU0FBUyxPQUFPLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxRQUFRLE9BQU8sT0FBTyxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSx1QkFBdUIsdUJBQXVCLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sYUFBYSxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxRQUFRLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sTUFBTSxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxh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QSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1dDQUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7Ozs7QUNBcUI7QUFDZ0M7QUFDUztBQUU5RHFHLGtFQUFjLENBQUMsQ0FBQyxDQUFDb0MsSUFBSSxDQUFDLE1BQU1OLHFFQUFvQixDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL2J1aWxkQ29tbWVudFBvcFVwLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9jb21tZW50LmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9pbnZvbHZlbWVudEFwaS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvcG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvcG9rZW1vbkNvdW50ZXIuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3ZpZXdGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tZW50IGZyb20gJy4vY29tbWVudC5qcyc7XG5pbXBvcnQgeyBnZXRDb21tZW50LCBwb3N0Q29tbWVudCB9IGZyb20gJy4vaW52b2x2ZW1lbnRBcGkuanMnO1xuaW1wb3J0IGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIgZnJvbSAnLi92aWV3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRDb21tZW50UG9wVXAge1xuICBjb25zdHJ1Y3Rvcihwb2tlbW9uLCBkZXRhaWxzLCBmZWF0dXJlcykge1xuICAgIGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIoKTtcblxuICAgIHRoaXMuZWxlbWVudCA9IHt9O1xuICAgIHRoaXMuZWxlbWVudC5yb290ID0gQnVpbGRDb21tZW50UG9wVXAuY3JlYXRlUm9vdCgpO1xuXG4gICAgdGhpcy5lbGVtZW50LmltYWdlID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2ltYWdlLXBva2Vtb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuaW1hZ2Uuc3JjID0gZGV0YWlscy5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG5cbiAgICB0aGlzLmVsZW1lbnQucG9rZW1vbk5hbWUgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbi1uYW1lJyk7XG4gICAgdGhpcy5lbGVtZW50LnBva2Vtb25OYW1lLmlubmVyVGV4dCA9IHBva2Vtb24ubmFtZTtcblxuICAgIGNvbnN0IHBva2Vtb25BYmlsaXRpZXMgPSBkZXRhaWxzLmFiaWxpdGllcztcbiAgICAvLyBiZWNhdXNlIHdlIGRvbid0IGtub3cgdGhlIGV4YWN0IG51bWJlciBvZiBhYmlsaXRpZXMgb2YgZWFjaCBwb2tlbW9uXG4gICAgdGhpcy5lbGVtZW50LmFiaWxpdGllc0xpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjYWJpbGl0aWVzLWxpc3QnKTtcbiAgICBwb2tlbW9uQWJpbGl0aWVzLmZvckVhY2goKGFiaWxpdHkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1BYmlsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1BYmlsaXR5LmlubmVyVGV4dCA9IGFiaWxpdHkuYWJpbGl0eS5uYW1lO1xuICAgICAgdGhpcy5lbGVtZW50LmFiaWxpdGllc0xpc3QuYXBwZW5kQ2hpbGQoaXRlbUFiaWxpdHkpO1xuICAgIH0pO1xuICAgIC8vIGZvcm1zXG4gICAgdGhpcy5lbGVtZW50LmZvcm1MaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2Zvcm1zLWxpc3QnKTtcbiAgICBjb25zdCBwb2tlbW9uRm9ybSA9IGRldGFpbHMuZm9ybXM7XG4gICAgcG9rZW1vbkZvcm0uZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgY29uc3QgaXRlbUZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgaXRlbUZvcm0uaW5uZXJUZXh0ID0gZm9ybS5uYW1lO1xuICAgICAgdGhpcy5lbGVtZW50LmZvcm1MaXN0LmFwcGVuZENoaWxkKGl0ZW1Gb3JtKTtcbiAgICB9KTtcbiAgICAvLyBzdGF0c1xuICAgIHRoaXMuZWxlbWVudC5zdGF0c0xpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjc3RhdHMtbGlzdCcpO1xuICAgIGNvbnN0IHBva2Vtb25TdGF0cyA9IGRldGFpbHMuc3RhdHM7XG4gICAgcG9rZW1vblN0YXRzLmZvckVhY2goKHN0YXQpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1TdGF0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1TdGF0LmlubmVyVGV4dCA9IGAke3N0YXQuc3RhdC5uYW1lfSA6ICR7c3RhdC5iYXNlX3N0YXR9YDtcbiAgICAgIHRoaXMuZWxlbWVudC5zdGF0c0xpc3QuYXBwZW5kQ2hpbGQoaXRlbVN0YXQpO1xuICAgIH0pO1xuXG4gICAgLy8gd2VpZ2h0XG4gICAgdGhpcy5lbGVtZW50LndlaWdodExpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjd2VpZ2h0LWxpc3QnKTtcbiAgICBjb25zdCBpdGVtV2VpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtV2VpZ2h0LmlubmVyVGV4dCA9IGRldGFpbHMud2VpZ2h0O1xuICAgIHRoaXMuZWxlbWVudC53ZWlnaHRMaXN0LmFwcGVuZENoaWxkKGl0ZW1XZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNvbW1lbnRMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtbGlzdCcpO1xuICAgIHRoaXMuZWxlbWVudC5udW1iZXJPZkNvbW1lbnRzID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnRDb3VudCcpO1xuICAgIEJ1aWxkQ29tbWVudFBvcFVwLmdldENvbW1lbnRzKFxuICAgICAgZmVhdHVyZXMuaXRlbUlkLFxuICAgICAgdGhpcy5lbGVtZW50LmNvbW1lbnRMaXN0LFxuICAgICAgdGhpcy5lbGVtZW50Lm51bWJlck9mQ29tbWVudHMsXG4gICAgKTtcblxuICAgIHRoaXMuZWxlbWVudC5mb3JtID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICAgIHRoaXMuZWxlbWVudC51c2VyTmFtZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lJyk7XG4gICAgdGhpcy5lbGVtZW50LmNvbW1lbnQgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfdGV4dGFyZWFfY29udGVudCcpO1xuICAgIHRoaXMuZWxlbWVudC5zdWJtaXRCdXR0b24gPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfc3VibWl0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB1c2VyTmFtZSA9IHRoaXMuZWxlbWVudC51c2VyTmFtZS52YWx1ZS50cmltKCk7XG4gICAgICBjb25zdCBjb21tZW50Q29udGVudCA9IHRoaXMuZWxlbWVudC5jb21tZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudChmZWF0dXJlcy5pdGVtSWQsIHVzZXJOYW1lLCBjb21tZW50Q29udGVudCk7XG4gICAgICBCdWlsZENvbW1lbnRQb3BVcC5zYXZlQ29tbWVudChjb21tZW50KTtcbiAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdC5pbm5lclRleHQgPSAnJztcbiAgICAgIHRoaXMuZWxlbWVudC5mb3JtLnJlc2V0KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQnVpbGRDb21tZW50UG9wVXAuZ2V0Q29tbWVudHMoXG4gICAgICAgICAgZmVhdHVyZXMuaXRlbUlkLFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCxcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubnVtYmVyT2ZDb21tZW50cyxcbiAgICAgICAgKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LnhCdXR0b24gPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcueC1idXR0b24nKTtcbiAgICB0aGlzLmVsZW1lbnQueEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5yb290LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50LnJvb3QpO1xuICAgICAgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlUm9vdCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuYm9keSk7XG4gICAgICByZXR1cm4gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ4LWJ1dHRvbiBwb3AtdXAtYnV0dG9uc1wiPjxpIGNsYXNzPVwiYmkgYmkteC1sZ1wiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwLWltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJwb2tlbW9uIGltYWdlXCIgaWQgPSAnaW1hZ2UtcG9rZW1vbic+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgaWQ9J3Bva2Vtb24tbmFtZSc+PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwLWRldGFpbHNcIj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPjxzcGFuPkFiaWxpdGllczwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9ICdhYmlsaXRpZXMtbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPjxzcGFuPkZvcm1zPC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0gJ2Zvcm1zLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5TdGF0czwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9J3N0YXRzLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj53ZWlnaHQ8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSAnd2VpZ2h0LWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxoMyA+XG4gICAgICAgICAgICAgICAgQ29tbWVudHMgKDxzcGFuIGlkPSdjb21tZW50Q291bnQnPjwvc3Bhbj4pXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHVsIGlkID0gJ2NvbW1lbnQtbGlzdCc+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDM+QWRkIGNvbW1lbnQ8L2gzPlxuICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgY2xhc3M9J2Zvcm0nPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lXCIgaWQ9XCJjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lXCIgY2xhc3M9XCJjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lXCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImNvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnRcIiBpZD1cImNvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnRcIiBjb2xzPVwiMzBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwiY29tbWVudC1wb3AtdXBfc3VibWl0XCIgY2xhc3M9XCJwb3AtdXAtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICBDb21tZW50XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApLmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHN0YXRpYyBzYXZlQ29tbWVudCA9IGFzeW5jIChjb21tZW50KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcG9zdENvbW1lbnQoY29tbWVudCk7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMgPSBhc3luYyAoaWRQb2tlbW9uLCBwYXJlbnQsIGNvdW50KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnQoaWRQb2tlbW9uKTtcbiAgICAgICAgY291bnQuaW5uZXJUZXh0ID0gY29tbWVudHMubGVuZ3RoO1xuICAgICAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXRlbUNvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgIGl0ZW1Db21tZW50LmlubmVySFRNTCA9IGAke2NvbW1lbnQuY3JlYXRpb25fZGF0ZX0gJHtjb21tZW50LnVzZXJuYW1lfSA6ICR7Y29tbWVudC5jb21tZW50fWA7XG4gICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGl0ZW1Db21tZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb3VudC5pbm5lckhUTUwgPSAwO1xuICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gJzxwPk5vIGNvbW1lbnQgeWV0PC9wPic7XG4gICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnQge1xuICBjb25zdHJ1Y3RvcihpdGVtSWQsIHVzZXJOYW1lLCBjb21tZW50KSB7XG4gICAgdGhpcy5pdGVtSWQgPSBpdGVtSWQ7XG4gICAgdGhpcy51c2VyTmFtZSA9IHVzZXJOYW1lO1xuICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XG4gIH1cbn0iLCJjb25zdCBnZXRDb21tZW50ID0gYXN5bmMgKGlkUG9rZW1vbikgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9jb21tZW50cz9pdGVtX2lkPSR7aWRQb2tlbW9ufWApXG4gICAgLmNhdGNoKChlcnJvcikgPT4gbmV3IEVycm9yKGVycm9yKSk7XG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gY29tbWVudHM7XG59O1xuXG5jb25zdCBwb3N0Q29tbWVudCA9IGFzeW5jIChjb21tZW50KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL09wWTJXaVFKQm1BM1pKTzBjcGlWL2NvbW1lbnRzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IGNvbW1lbnQuaXRlbUlkLFxuICAgICAgdXNlcm5hbWU6IGNvbW1lbnQudXNlck5hbWUsXG4gICAgICBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuICBjb25zdCBtc2cgPSBhd2FpdCByZXNwb25zZTtcbiAgcmV0dXJuIG1zZztcbn07XG5cbmNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKHBva2Vtb25JZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9saWtlcycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBwb2tlbW9uSWQsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBsaWtlcztcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9saWtlcycpO1xuXG4gICAgLy8gQ2hlY2sgaWYgcmVzcG9uc2UgaXMgb2tcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgcmVzcG9uc2UgaXMgbm90IGVtcHR5XG4gICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpID09PSAnMCcgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpIHtcbiAgICAgIGxpa2VzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpa2VzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsaWtlcyA9IFtdO1xuICB9XG4gIHJldHVybiBsaWtlcztcbn07XG5cbmV4cG9ydCB7XG4gIGdldENvbW1lbnQsIHBvc3RDb21tZW50LCBwb3N0TGlrZSwgZ2V0TGlrZXMsXG59O1xuIiwiaW1wb3J0IEJ1aWxkQ29tbWVudFBvcFVwIGZyb20gJy4vYnVpbGRDb21tZW50UG9wVXAuanMnO1xuaW1wb3J0IHsgcG9zdExpa2UsIGdldExpa2VzIH0gZnJvbSAnLi9pbnZvbHZlbWVudEFwaS5qcyc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG5cbi8vIERhdGEgZnJvbSBBUElcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EYXRhKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9NicpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YS5yZXN1bHRzO1xufVxuXG4vLyBTcGVjaWZpYyBQb2tlbW9uIGRldGFpbHNcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EZXRhaWxzKHVybCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vLyBIVE1MIGVsZW1lbnRzIGZvciBlYWNoIFBva2Vtb25cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlQb2tlbW9uKCkge1xuICBjb25zdCBwb2tlbW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9uLWxpc3QnKTtcbiAgY29uc3QgcG9rZW1vbkRhdGEgPSBhd2FpdCBnZXRQb2tlbW9uRGF0YSgpO1xuXG4gIC8vIEdldCB0aGUgbGlzdCBvZiBsaWtlcyBmcm9tIHRoZSBBUElcbiAgY29uc3QgbGlrZXNEYXRhID0gYXdhaXQgZ2V0TGlrZXMoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBmb3JFYWNoIGxvb3AgdG8gYSBtYXAgbG9vcCB0aGF0IHJldHVybnMgcHJvbWlzZXNcbiAgY29uc3QgcG9rZW1vblByb21pc2VzID0gcG9rZW1vbkRhdGEubWFwKGFzeW5jIChwb2tlbW9uLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGRldGFpbHMgPSBhd2FpdCBnZXRQb2tlbW9uRGV0YWlscyhwb2tlbW9uLnVybCk7XG5cbiAgICBjb25zdCBwb2tlbW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBva2Vtb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bva2Vtb24taXRlbScpO1xuXG4gICAgY29uc3QgcG9rZW1vblRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9rZW1vblRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgcG9rZW1vblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwb2tlbW9uVGl0bGUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG5cbiAgICBjb25zdCBwb2tlbW9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBwb2tlbW9uSW1hZ2Uuc3JjID0gZGV0YWlscy5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG5cbiAgICAvLyBMaWtlIEJ1dHRvblxuICAgIGNvbnN0IGxpa2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2xpa2UtaWNvbicsICdmYXInLCAnZmEtaGVhcnQnKTtcblxuICAgIC8vIENyZWF0ZSBhIHNwYW4gdG8gaG9sZCB0aGUgbGlrZXMgY291bnRcbiAgICBjb25zdCBsaWtlc0NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxpa2VzQ291bnQuY2xhc3NMaXN0LmFkZCgnbGlrZXMtY291bnQnKTtcblxuICAgIC8vIENoZWNrIGlmIHRoaXMgcG9rZW1vbiBpcyBpbiB0aGUgbGlzdCBvZiBsaWtlc1xuICAgIGNvbnN0IGxpa2VPYmogPSBsaWtlc0RhdGEuZmluZCgob2JqKSA9PiBvYmouaXRlbV9pZCA9PT0gcG9rZW1vbi5uYW1lKTtcbiAgICBpZiAobGlrZU9iaikge1xuICAgICAgbGlrZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFyJyk7XG4gICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTsgLy8gZmlsbGVkIGhlYXJ0XG4gICAgICBsaWtlc0NvdW50LnRleHRDb250ZW50ID0gbGlrZU9iai5saWtlczsgLy8gdXBkYXRlIGxpa2VzIGNvdW50XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb2tlbW9uVGl0bGVDb250YWluZXIuYXBwZW5kKHBva2Vtb25UaXRsZSwgbGlrZUljb24sIGxpa2VzQ291bnQpOyAvLyBhcHBlbmQgbGlrZXMgY291bnQgdG8gY29udGFpbmVyXG5cbiAgICAvLyBCdXR0b25zIGFuZCBSZXNlcnZhdGlvbiBCdXR0b25zXG4gICAgY29uc3QgY29tbWVudEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbW1lbnRCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgIGNvbW1lbnRCdXR0b24uaWQgPSBgaWRQb2tlbW9uLSR7aW5kZXh9YDtcblxuICAgIHBva2Vtb25FbGVtZW50LmFwcGVuZChwb2tlbW9uSW1hZ2UsIHBva2Vtb25UaXRsZUNvbnRhaW5lciwgY29tbWVudEJ1dHRvbik7XG5cbiAgICBjb21tZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1JZCA9IGUudGFyZ2V0LmlkO1xuICAgICAgY29uc3QgcG9wVXAgPSBuZXcgQnVpbGRDb21tZW50UG9wVXAocG9rZW1vbiwgZGV0YWlscywgeyBpdGVtSWQgfSk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXAuZWxlbWVudC5yb290KTtcbiAgICAgIHBva2Vtb25MaXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsaWtlIGJ1dHRvblxuICAgIGxpa2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKGxpa2VJY29uLmNsYXNzTGlzdC5jb250YWlucygnZmFyJykpIHtcbiAgICAgICAgLy8gUG9zdCB0aGUgbGlrZSB0byB0aGUgQVBJXG4gICAgICAgIGF3YWl0IHBvc3RMaWtlKHBva2Vtb24ubmFtZSk7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgaWNvbiB0byBmaWxsZWRcbiAgICAgICAgbGlrZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFyJyk7XG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycpO1xuICAgICAgICAvLyBJbmNyZW1lbnQgdGhlIGxpa2VzIGNvdW50XG4gICAgICAgIGxpa2VzQ291bnQudGV4dENvbnRlbnQgPSBOdW1iZXIobGlrZXNDb3VudC50ZXh0Q29udGVudCkgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBpY29uIHRvIGVtcHR5XG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcycpO1xuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBQb2tlbW9uIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBET01cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHBva2Vtb25MaXN0LmFwcGVuZChwb2tlbW9uRWxlbWVudCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFdhaXQgZm9yIGFsbCB0aGUgUG9rZW1vbiB0byBiZSBhZGRlZCB0byB0aGUgRE9NXG4gIGF3YWl0IFByb21pc2UuYWxsKHBva2Vtb25Qcm9taXNlcyk7XG59XG5cbi8vIEV4cG9ydCBmdW5jdGlvbnNcbmV4cG9ydCB7IGdldFBva2Vtb25EYXRhLCBnZXRQb2tlbW9uRGV0YWlscywgZGlzcGxheVBva2Vtb24gfTtcbiIsImltcG9ydCB7IGdldFBva2Vtb25EYXRhIH0gZnJvbSAnLi9wb2tlbW9uLmpzJztcblxuY29uc3QgdXBkYXRlUG9rZW1vbkNvdW50ZXIgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBva2Vtb25Db3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bva2Vtb24tY291bnRlcicpO1xuICBpZiAocG9rZW1vbkNvdW50ZXIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0UG9rZW1vbkRhdGEoKTtcbiAgICBwb2tlbW9uQ291bnRlci50ZXh0Q29udGVudCA9IGRhdGEubGVuZ3RoO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVQb2tlbW9uQ291bnRlcjtcbiIsImNvbnN0IGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKTtcbiAgY29uc3QgcG9rZW1vbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9rZW1vbi1saXN0Jyk7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXInKTtcbiAgZm9vdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICBwb2tlbW9uTGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvbG9nby9wb2tlbW9uLWxvZ28ucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDQwMDswLDUwMDswLDYwMDswLDcwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcclxuICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDJ2dztcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIHBhZGRpbmc6IDAgNHZ3O1xyXG4gIG1hcmdpbjogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4ubmF2YmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDkwdnc7XHJcbiAgcGFkZGluZzogMCAxdnc7XHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkMThkO1xyXG4gIGhlaWdodDogNy41dnc7XHJcbiAgdG9wOiAwO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcclxuICBib3gtc2hhZG93OlxyXG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxyXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXHJcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcclxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XHJcbn1cclxuXHJcbi5tYWluIHtcclxuICBwYWRkaW5nLXRvcDogMTBweDsgIC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXHJcbn1cclxuXHJcbi5wb2tlbW9uLWl0ZW0gaW1nIHtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNwb2tlbW9uLWNvdW50ZXIge1xyXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cCBkaXYgaW1nIHtcclxuICB3aWR0aDogMzV2dztcclxufVxyXG5cclxuLm5hdmJhciAubG9nbyBpbWcge1xyXG4gIGhlaWdodDogNnZ3O1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgbGkge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsIGxpIHtcclxuICB3aWR0aDogNDAlO1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCBsaSB7XHJcbiAgbWFyZ2luOiAwIDF2dztcclxufVxyXG5cclxuLm5hdmJhciBuYXYgdWwgbGkgYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiBpbmhlcml0O1xyXG59XHJcblxyXG4ubGlzdHMgYTpob3ZlciB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5saXN0cyBhLmFjdGl2ZSB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5uYXZiYXIgbmF2IHVsIGxpIGE6aG92ZXIge1xyXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCBsaSBhLmFjdGl2ZSB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5sb2dvIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XHJcbiAgd2lkdGg6IDZ2dztcclxuICBoZWlnaHQ6IDZ2dztcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5oZWFkZXIge1xyXG4gIGhlaWdodDogNnZ3O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuZm9vdGVyIHtcclxuICBoZWlnaHQ6IDV2dztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcclxuICBib3gtc2hhZG93OlxyXG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxyXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXHJcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcclxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XHJcbiAgcGFkZGluZzogMCAxdnc7XHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4uZm9vdGVyIHtcclxuICBmb250LXNpemU6IDF2dztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHdpZHRoOiA5MHZ3O1xyXG4gIHBhZGRpbmc6IDAgMXZ3O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGhlaWdodDogNXZ3O1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4vKiAtLS0tLS0tLS0tIFBPS0VNT04gTElTVCAtLS0tLS0tLS0tICovXHJcblxyXG4ucG9rZW1vbi1saXN0IHtcclxuICBmbGV4LXNocmluazogMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbi10b3A6IDAuMXZ3O1xyXG4gIG1hcmdpbi1ib3R0b206IDV2dztcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgcGFkZGluZy10b3A6IDcuNXZ3OyAvKiBBZGRlZCB0byBhY2NvdW50IGZvciB0aGUgbmF2YmFyICovXHJcbn1cclxuXHJcbi5wb2tlbW9uLWl0ZW0ge1xyXG4gIGZsZXgtYmFzaXM6IGNhbGMoMzAlIC0gMmVtKTtcclxuICBtYXJnaW46IDFlbTtcclxuICBwYWRkaW5nOiAyZW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgaGVpZ2h0OiA1MHZoO1xyXG4gIHdpZHRoOiAyMHZoO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IC8qIEFkZGVkIHRvIHNwYWNlIG91dCB0aGUgZWxlbWVudHMgKi9cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XHJcbiAgYm94LXNoYWRvdzpcclxuICAgIDNweCAzcHggMCAycHggIzAwMCxcclxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxyXG4gICAgM3B4IDNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXHJcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjZmZmIGluc2V0O1xyXG59XHJcblxyXG4uY29tbWVudC1idXR0b24ge1xyXG4gIHBhZGRpbmc6IDFlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XHJcbiAgYm94LXNoYWRvdzpcclxuICAgIDNweCAzcHggMCAycHggIzAwMCxcclxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxyXG4gICAgM3B4IDNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXHJcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjZmZmIGluc2V0O1xyXG4gIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmNvbW1lbnQtYnV0dG9uOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzBjMGMwO1xyXG59XHJcblxyXG4uY29tbWVudC1idXR0b246YWN0aXZlIHtcclxuICBib3gtc2hhZG93OlxyXG4gICAgLTNweCAtM3B4IDAgMnB4ICMwMDAsXHJcbiAgICAzcHggM3B4IDAgMnB4ICNjMGMwYzAsXHJcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxyXG4gICAgM3B4IDNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XHJcbn1cclxuXHJcbi5jb21tZW50LWJ1dHRvbjphY3RpdmUsXHJcbi5yZXNlcnZhdGlvbi1idXR0b246YWN0aXZlIHtcclxuICBib3JkZXItc3R5bGU6IGluc2V0O1xyXG59XHJcblxyXG4ubGlrZS1pY29uIHtcclxuICBmb250LXNpemU6IDFlbTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxNHB4O1xyXG4gIHJpZ2h0OiA1MHB4O1xyXG59XHJcblxyXG4ubGlrZXMtY291bnQge1xyXG4gIGZvbnQtc2l6ZTogMC41ZW07XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTBweDsgLyogQWp1c3RhIGVzdGUgdmFsb3Igc2Vnw7puIHNlYSBuZWNlc2FyaW8gKi9cclxuICByaWdodDogMTBweDsgLyogQWp1c3RhIGVzdGUgdmFsb3Igc2Vnw7puIHNlYSBuZWNlc2FyaW8gKi9cclxufVxyXG5cclxuLnRpdGxlLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXHJcblxyXG5zcGFuIHtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAge1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbWFyZ2luOiAxdmggYXV0bztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgcGFkZGluZzogMXZoIDN2dztcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJvcmRlcjogMC4zcmVtIHNvbGlkICMwMDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4ueC1idXR0b24ge1xyXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAwLjRyZW07XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcclxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogMC41cztcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XHJcbiAgb3BhY2l0eTogMTtcclxuICByaWdodDogMC41cmVtO1xyXG59XHJcblxyXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xyXG4gIGNvbG9yOiAjZjAwO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgaDIge1xyXG4gIGZvbnQtc2l6ZTogNXZ3O1xyXG4gIG1hcmdpbjogMC41cmVtO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgaDMge1xyXG4gIGZvbnQtc2l6ZTogNHZoO1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bDpudGgtY2hpbGQoMSkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG59XHJcblxyXG4jYWJpbGl0aWVzLWxpc3QgbGksXHJcbiNzdGF0cy1saXN0IGxpLFxyXG4jZm9ybXMtbGlzdCBsaSxcclxuI3dlaWdodC1saXN0IGxpIHtcclxuICBmb250LXNpemU6IDAuN3JlbTtcclxuICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuI2NvbW1lbnRDb3VudCB7XHJcbiAgZm9udC1zaXplOiBpbmhlcml0O1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgaDMge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICByb3ctZ2FwOiAxLjN2aDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQsXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhIHtcclxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMDAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQ6aG92ZXIsXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhOmhvdmVyIHtcclxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcclxuICBiYWNrZ3JvdW5kOiAjZjlmN2Y3O1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBidXR0b24ge1xyXG4gIHdpZHRoOiBmaXQtY29udGVudDtcclxuICBwYWRkaW5nOiAwLjJyZW0gMC41cmVtO1xyXG59XHJcblxyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHlDQUF5QztFQUN6QyxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixNQUFNO0VBQ04sYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qjs7OztnQ0FJOEI7QUFDaEM7O0FBRUE7RUFDRSxpQkFBaUIsR0FBRywwQ0FBMEM7QUFDaEU7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztB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O0VBQ0UsY0FBYztFQUNkLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsNkJBQTZCO0VBQzdCLGVBQWU7QUFDakI7O0FBRUE7Ozs7RUFJRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBRUE7O0VBRUUseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTs7RUFFRSw0QkFBNEI7RUFDNUIscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDAmZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMCA0dnc7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICB3aWR0aDogOTB2dztcXHJcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcclxcbiAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmQxOGQ7XFxyXFxuICBoZWlnaHQ6IDcuNXZ3O1xcclxcbiAgdG9wOiAwO1xcclxcbiAgei1pbmRleDogMTAwMDtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICBib3gtc2hhZG93OlxcclxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxyXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcclxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXHJcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4ge1xcclxcbiAgcGFkZGluZy10b3A6IDEwcHg7ICAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xcclxcbn1cXHJcXG5cXHJcXG4ucG9rZW1vbi1pdGVtIGltZyB7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbiNwb2tlbW9uLWNvdW50ZXIge1xcclxcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xcclxcbiAgd2lkdGg6IDM1dnc7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgLmxvZ28gaW1nIHtcXHJcXG4gIGhlaWdodDogNnZ3O1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIG5hdiB1bCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsIGxpIHtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIHtcXHJcXG4gIG1hcmdpbjogMCAxdnc7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5saXN0cyBhOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcclxcbn1cXHJcXG5cXHJcXG4ubGlzdHMgYS5hY3RpdmUge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGE6aG92ZXIge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGEuYWN0aXZlIHtcXHJcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcclxcbn1cXHJcXG5cXHJcXG4ubG9nbyB7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vYXNzZXRzL2xvZ28vcG9rZW1vbi1sb2dvLnBuZycpO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXHJcXG4gIHdpZHRoOiA2dnc7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgaGVpZ2h0OiA1dnc7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICBib3gtc2hhZG93OlxcclxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxyXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcclxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXHJcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXHJcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcclxcbiAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICB6LWluZGV4OiAxMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyIHtcXHJcXG4gIGZvbnQtc2l6ZTogMXZ3O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICB3aWR0aDogOTB2dztcXHJcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGhlaWdodDogNXZ3O1xcclxcbiAgYm90dG9tOiAwO1xcclxcbiAgei1pbmRleDogMTAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tLS0tLS0tLSBQT0tFTU9OIExJU1QgLS0tLS0tLS0tLSAqL1xcclxcblxcclxcbi5wb2tlbW9uLWxpc3Qge1xcclxcbiAgZmxleC1zaHJpbms6IDA7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbWFyZ2luLXRvcDogMC4xdnc7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA1dnc7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICBwYWRkaW5nLXRvcDogNy41dnc7IC8qIEFkZGVkIHRvIGFjY291bnQgZm9yIHRoZSBuYXZiYXIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLnBva2Vtb24taXRlbSB7XFxyXFxuICBmbGV4LWJhc2lzOiBjYWxjKDMwJSAtIDJlbSk7XFxyXFxuICBtYXJnaW46IDFlbTtcXHJcXG4gIHBhZGRpbmc6IDJlbTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBoZWlnaHQ6IDUwdmg7XFxyXFxuICB3aWR0aDogMjB2aDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgLyogQWRkZWQgdG8gc3BhY2Ugb3V0IHRoZSBlbGVtZW50cyAqL1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICBib3gtc2hhZG93OlxcclxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxyXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcclxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXHJcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtYnV0dG9uIHtcXHJcXG4gIHBhZGRpbmc6IDFlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCAjMDAwO1xcclxcbiAgYm94LXNoYWRvdzpcXHJcXG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxcclxcbiAgICAtM3B4IC0zcHggMCAycHggI2MwYzBjMCxcXHJcXG4gICAgM3B4IDNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXFxyXFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XFxyXFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1idXR0b246aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MwYzBjMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtYnV0dG9uOmFjdGl2ZSB7XFxyXFxuICBib3gtc2hhZG93OlxcclxcbiAgICAtM3B4IC0zcHggMCAycHggIzAwMCxcXHJcXG4gICAgM3B4IDNweCAwIDJweCAjYzBjMGMwLFxcclxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxcclxcbiAgICAzcHggM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtYnV0dG9uOmFjdGl2ZSxcXHJcXG4ucmVzZXJ2YXRpb24tYnV0dG9uOmFjdGl2ZSB7XFxyXFxuICBib3JkZXItc3R5bGU6IGluc2V0O1xcclxcbn1cXHJcXG5cXHJcXG4ubGlrZS1pY29uIHtcXHJcXG4gIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAxNHB4O1xcclxcbiAgcmlnaHQ6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5saWtlcy1jb3VudCB7XFxyXFxuICBmb250LXNpemU6IDAuNWVtO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAxMHB4OyAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xcclxcbiAgcmlnaHQ6IDEwcHg7IC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXFxyXFxufVxcclxcblxcclxcbi50aXRsZS1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuc3BhbiB7XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAge1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIG1hcmdpbjogMXZoIGF1dG87XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHBhZGRpbmc6IDF2aCAzdnc7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYm9yZGVyOiAwLjNyZW0gc29saWQgIzAwMDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuOXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwID4gKiB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4ueC1idXR0b24ge1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbiAgYmFja2dyb3VuZDogbm9uZTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIHBhZGRpbmctcmlnaHQ6IDFyZW07XFxyXFxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBvcGFjaXR5OiAwO1xcclxcbiAgdHJhbnNpdGlvbjogMC41cztcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XFxyXFxuICBvcGFjaXR5OiAxO1xcclxcbiAgcmlnaHQ6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOmZvY3VzIHtcXHJcXG4gIGNvbG9yOiAjZjAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgaDIge1xcclxcbiAgZm9udC1zaXplOiA1dnc7XFxyXFxuICBtYXJnaW46IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGgzIHtcXHJcXG4gIGZvbnQtc2l6ZTogNHZoO1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsOm50aC1jaGlsZCgxKSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbiNhYmlsaXRpZXMtbGlzdCBsaSxcXHJcXG4jc3RhdHMtbGlzdCBsaSxcXHJcXG4jZm9ybXMtbGlzdCBsaSxcXHJcXG4jd2VpZ2h0LWxpc3QgbGkge1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbW1lbnRDb3VudCB7XFxyXFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcm93LWdhcDogMS4zdmg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0LFxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhIHtcXHJcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkICMwMDA7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0OmhvdmVyLFxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhOmhvdmVyIHtcXHJcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkICMyYjI4Mjg7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxyXFxuICBiYWNrZ3JvdW5kOiAjZjlmN2Y3O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBidXR0b24ge1xcclxcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogMC4ycmVtIDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZGRlbiB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IHsgZGlzcGxheVBva2Vtb24gfSBmcm9tICcuL21vZHVsZS9wb2tlbW9uLmpzJztcbmltcG9ydCB1cGRhdGVQb2tlbW9uQ291bnRlciBmcm9tICcuL21vZHVsZS9wb2tlbW9uQ291bnRlci5qcyc7XG5cbmRpc3BsYXlQb2tlbW9uKCkudGhlbigoKSA9PiB1cGRhdGVQb2tlbW9uQ291bnRlcigpKTtcbiJdLCJuYW1lcyI6WyJDb21tZW50IiwiZ2V0Q29tbWVudCIsInBvc3RDb21tZW50IiwiaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlciIsIkJ1aWxkQ29tbWVudFBvcFVwIiwiY29uc3RydWN0b3IiLCJwb2tlbW9uIiwiZGV0YWlscyIsImZlYXR1cmVzIiwiZWxlbWVudCIsInJvb3QiLCJjcmVhdGVSb290IiwiaW1hZ2UiLCJxdWVyeVNlbGVjdG9yIiwic3JjIiwic3ByaXRlcyIsImZyb250X2RlZmF1bHQiLCJwb2tlbW9uTmFtZSIsImlubmVyVGV4dCIsIm5hbWUiLCJwb2tlbW9uQWJpbGl0aWVzIiwiYWJpbGl0aWVzIiwiYWJpbGl0aWVzTGlzdCIsImZvckVhY2giLCJhYmlsaXR5IiwiaXRlbUFiaWxpdHkiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImZvcm1MaXN0IiwicG9rZW1vbkZvcm0iLCJmb3JtcyIsImZvcm0iLCJpdGVtRm9ybSIsInN0YXRzTGlzdCIsInBva2Vtb25TdGF0cyIsInN0YXRzIiwic3RhdCIsIml0ZW1TdGF0IiwiYmFzZV9zdGF0Iiwid2VpZ2h0TGlzdCIsIml0ZW1XZWlnaHQiLCJ3ZWlnaHQiLCJjb21tZW50TGlzdCIsIm51bWJlck9mQ29tbWVudHMiLCJnZXRDb21tZW50cyIsIml0ZW1JZCIsInVzZXJOYW1lIiwiY29tbWVudCIsInN1Ym1pdEJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInRyaW0iLCJjb21tZW50Q29udGVudCIsInNhdmVDb21tZW50IiwicmVzZXQiLCJzZXRUaW1lb3V0IiwieEJ1dHRvbiIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlIiwiYm9keSIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsImNoaWxkcmVuIiwibWVzc2FnZSIsImlkUG9rZW1vbiIsInBhcmVudCIsImNvdW50IiwiY29tbWVudHMiLCJsZW5ndGgiLCJpdGVtQ29tbWVudCIsImlubmVySFRNTCIsImNyZWF0aW9uX2RhdGUiLCJ1c2VybmFtZSIsImVycm9yIiwicmVzcG9uc2UiLCJmZXRjaCIsImNhdGNoIiwiRXJyb3IiLCJqc29uIiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsIml0ZW1faWQiLCJoZWFkZXJzIiwibXNnIiwicG9zdExpa2UiLCJwb2tlbW9uSWQiLCJyZXN1bHQiLCJnZXRMaWtlcyIsImxpa2VzIiwib2siLCJzdGF0dXMiLCJnZXQiLCJjb250YWluZXIiLCJnZXRQb2tlbW9uRGF0YSIsImRhdGEiLCJyZXN1bHRzIiwiZ2V0UG9rZW1vbkRldGFpbHMiLCJ1cmwiLCJkaXNwbGF5UG9rZW1vbiIsInBva2Vtb25MaXN0IiwicG9rZW1vbkRhdGEiLCJsaWtlc0RhdGEiLCJwb2tlbW9uUHJvbWlzZXMiLCJtYXAiLCJpbmRleCIsInBva2Vtb25FbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicG9rZW1vblRpdGxlQ29udGFpbmVyIiwicG9rZW1vblRpdGxlIiwidGV4dENvbnRlbnQiLCJwb2tlbW9uSW1hZ2UiLCJsaWtlSWNvbiIsImxpa2VzQ291bnQiLCJsaWtlT2JqIiwiZmluZCIsIm9iaiIsInJlbW92ZSIsImFwcGVuZCIsImNvbW1lbnRCdXR0b24iLCJpZCIsInRhcmdldCIsInBvcFVwIiwiY29udGFpbnMiLCJOdW1iZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCIsInVwZGF0ZVBva2Vtb25Db3VudGVyIiwicG9rZW1vbkNvdW50ZXIiLCJnZXRFbGVtZW50QnlJZCIsImZvb3RlciIsImhlYWRlciIsInRvZ2dsZSIsInRoZW4iXSwic291cmNlUm9vdCI6IiJ9