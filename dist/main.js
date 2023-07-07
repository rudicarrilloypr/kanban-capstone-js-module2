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
<<<<<<< HEAD
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\r\n\r\n* {\r\n  font-family: 'Poppins', sans-serif;\r\n  font-size: 2vw;\r\n  font-weight: 600;\r\n}\r\n\r\nbody {\r\n  box-sizing: border-box;\r\n  padding: 0 4vw;\r\n  margin: 0;\r\n}\r\n\r\n.navbar {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 90vw;\r\n  padding: 0 1vw;\r\n  position: fixed;\r\n  background-color: #fff;\r\n  height: 7.5vw;\r\n  top: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n.main {\r\n  padding-top: 150px;  /* Ajusta este valor según sea necesario */\r\n}\r\n\r\n.pokemon-item img {\r\n  max-width: 100%;\r\n}\r\n\r\n#pokemon-counter {\r\n  margin-bottom: 50px;\r\n}\r\n\r\n.comment-pop-up div img {\r\n  width: 35vw;\r\n}\r\n\r\n.navbar .logo img {\r\n  height: 6vw;\r\n}\r\n\r\n.navbar nav ul {\r\n  display: flex;\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up li {\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up-details ul li {\r\n  width: 40%;\r\n}\r\n\r\n.navbar nav ul li {\r\n  margin: 0 1vw;\r\n}\r\n\r\n.navbar nav ul li a {\r\n  text-decoration: none;\r\n  color: inherit;\r\n}\r\n\r\n.lists a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.lists a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.logo {\r\n  background-image: url('./assets/logo/pokemon-logo.png');\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  width: 6vw;\r\n  height: 6vw;\r\n  background-position: center;\r\n}\r\n\r\n.header {\r\n  height: 6vw;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\nfooter {\r\n  height: 5vw;\r\n  display: flex;\r\n  align-items: center;\r\n  border: black solid 0.5vw;\r\n  padding: 0 1vw;\r\n}\r\n\r\n.footer {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  width: 90vw;\r\n  border: black solid 0.5vw;\r\n  padding: 0 1vw;\r\n  position: fixed;\r\n  background-color: #fff;\r\n  height: 5vw;\r\n  bottom: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n/* ---------- POKEMON LIST ---------- */\r\n\r\n.pokemon-list {\r\n  display: flex;\r\n  margin-top: 5vw;\r\n  margin-bottom: 5vw;\r\n  flex-wrap: wrap;\r\n  justify-content: space-around;\r\n  align-content: center;\r\n  height: 100vh;\r\n  padding-top: 7.5vw; /* Added to account for the navbar */\r\n}\r\n\r\n.pokemon-item {\r\n  flex-basis: calc(30% - 2em);\r\n  margin: 1em;\r\n  padding: 2em;\r\n  border: 1px solid black;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  height: 50vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  position: relative;\r\n  justify-content: space-between; /* Added to space out the elements */\r\n}\r\n\r\n.comment-button,\r\n.reservation-button {\r\n  margin: 0.5em 0;\r\n}\r\n\r\n.like-icon {\r\n  font-size: 2em;\r\n}\r\n\r\n.title-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n/* ---------- COMMENTS POP UP ---------- */\r\n\r\nspan {\r\n  font-weight: 900;\r\n}\r\n\r\n.comment-pop-up {\r\n  width: 80%;\r\n  margin: 1vh auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 1vh 3vw;\r\n  align-items: center;\r\n  border: 0.3rem solid black;\r\n  border-radius: 0.9rem;\r\n}\r\n\r\n.comment-pop-up > * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.x-button {\r\n  align-self: flex-end;\r\n  font-weight: 900;\r\n  background: none;\r\n  border-radius: 0.4rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.pop-up-buttons:hover {\r\n  background-color: black;\r\n  color: white;\r\n  padding-right: 1rem;\r\n  padding-left: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons::after {\r\n  position: absolute;\r\n  opacity: 0;\r\n  transition: 0.5s;\r\n}\r\n\r\n.pop-up-buttons:hover::after {\r\n  opacity: 1;\r\n  right: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons:focus {\r\n  color: red;\r\n}\r\n\r\n.comment-pop-up h2 {\r\n  font-size: 5vw;\r\n  margin: 0.5rem;\r\n}\r\n\r\n.comment-pop-up h3 {\r\n  font-size: 4vh;\r\n  margin: 0 auto;\r\n}\r\n\r\n.comment-pop-up-details ul:nth-child(1) {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n#abilities-list li,\r\n#stats-list li,\r\n#forms-list li,\r\n#weight-list li {\r\n  font-size: 0.7rem;\r\n  width: fit-content;\r\n}\r\n\r\n.comment-pop-up-comments-number-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n#commentCount {\r\n  font-size: inherit;\r\n}\r\n\r\n.comment-pop-up_form_container h3 {\r\n  text-align: center;\r\n}\r\n\r\n.comment-pop-up_form_container form {\r\n  display: flex;\r\n  flex-direction: column;\r\n  row-gap: 1.3vh;\r\n}\r\n\r\n.comment-pop-up_form_container form input,\r\n.comment-pop-up_form_container form textarea {\r\n  border: 0.2rem solid black;\r\n  border-radius: 0.3rem;\r\n}\r\n\r\n.comment-pop-up_form_container form input:hover,\r\n.comment-pop-up_form_container form textarea:hover {\r\n  border: 0.2rem solid #2b2828;\r\n  border-radius: 0.3rem;\r\n  background: #f9f7f7;\r\n}\r\n\r\n.comment-pop-up_form_container form button {\r\n  width: fit-content;\r\n  padding: 0.2rem 0.5rem;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n"],"sourceRoot":""}]);
=======
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\n\n* {\n  font-family: 'Press Start 2P', sans-serif;\n  font-size: 2vw;\n  font-weight: 600;\n}\n\nbody {\n  box-sizing: border-box;\n  padding: 0 4vw;\n  margin: 0;\n  background-color: #fff;\n}\n\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 90vw;\n  padding: 0 1vw;\n  position: sticky;\n  background-color: #f2d18d;\n  height: 7.5vw;\n  top: 0;\n  z-index: 1000;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n}\n\n.main {\n  padding-top: 10px;  /* Ajusta este valor según sea necesario */\n}\n\n.pokemon-item img {\n  max-width: 100%;\n}\n\n#pokemon-counter {\n  margin-bottom: 50px;\n}\n\n.comment-pop-up div img {\n  width: 35vw;\n}\n\n.navbar .logo img {\n  height: 6vw;\n}\n\n.navbar nav ul {\n  display: flex;\n  list-style: none;\n}\n\n.comment-pop-up li {\n  list-style: none;\n}\n\n.comment-pop-up-details ul li {\n  width: 40%;\n}\n\n.navbar nav ul li {\n  margin: 0 1vw;\n}\n\n.navbar nav ul li a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.lists a:hover {\n  color: rgb(36, 94, 180);\n}\n\n.lists a.active {\n  color: rgb(36, 94, 180);\n}\n\n.navbar nav ul li a:hover {\n  color: rgb(36, 94, 180);\n}\n\n.navbar nav ul li a.active {\n  color: rgb(36, 94, 180);\n}\n\n.logo {\n  background-image: url('./assets/logo/pokemon-logo.png');\n  background-repeat: no-repeat;\n  background-size: contain;\n  width: 6vw;\n  height: 6vw;\n  background-position: center;\n}\n\n.header {\n  height: 6vw;\n  display: flex;\n  align-items: center;\n}\n\nfooter {\n  height: 5vw;\n  display: flex;\n  align-items: center;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n  padding: 0 1vw;\n  position: sticky;\n  background-color: #fff;\n  bottom: 0;\n  z-index: 1000;\n}\n\n.footer {\n  font-size: 1vw;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 90vw;\n  padding: 0 1vw;\n  position: relative;\n  background-color: #fff;\n  height: 5vw;\n  bottom: 0;\n  z-index: 1000;\n}\n\n/* ---------- POKEMON LIST ---------- */\n\n.pokemon-list {\n  display: flex;\n  margin-top: 0.1vw;\n  margin-bottom: 5vw;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-content: center;\n  height: 100vh;\n  padding-top: 7.5vw; /* Added to account for the navbar */\n}\n\n.pokemon-item {\n  flex-basis: calc(30% - 2em);\n  margin: 1em;\n  padding: 2em;\n  text-align: center;\n  box-sizing: border-box;\n  height: 50vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  justify-content: space-between; /* Added to space out the elements */\n  background-color: #fff;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n}\n\n.comment-button {\n  padding: 1em;\n  background-color: #fff;\n  border: 2px solid #000;\n  box-shadow:\n    3px 3px 0 2px #000,\n    -3px -3px 0 2px #c0c0c0,\n    3px 3px 5px 4px #a9a9a9 inset,\n    -3px -3px 5px 4px #fff inset;\n  transition: 0.3s;\n  text-decoration: none;\n  text-align: center;\n}\n\n.comment-button:hover {\n  background-color: #c0c0c0;\n}\n\n.comment-button:active {\n  box-shadow:\n    -3px -3px 0 2px #000,\n    3px 3px 0 2px #c0c0c0,\n    -3px -3px 5px 4px #a9a9a9 inset,\n    3px 3px 5px 4px #fff inset;\n}\n\n.comment-button:active,\n.reservation-button:active {\n  border-style: inset;\n}\n\n.like-icon {\n  font-size: 1em;\n  position: absolute;\n  top: 14px;\n  right: 50px;\n}\n\n.likes-count {\n  font-size: 0.5em;\n  position: absolute;\n  top: 10px; /* Ajusta este valor según sea necesario */\n  right: 10px; /* Ajusta este valor según sea necesario */\n}\n\n.title-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n\n/* ---------- COMMENTS POP UP ---------- */\n\nspan {\n  font-weight: 900;\n}\n\n.comment-pop-up {\n  width: 80%;\n  margin: 1vh auto;\n  display: flex;\n  flex-direction: column;\n  padding: 1vh 3vw;\n  align-items: center;\n  border: 0.3rem solid #000;\n  border-radius: 0.9rem;\n}\n\n.comment-pop-up > * {\n  box-sizing: border-box;\n}\n\n.x-button {\n  align-self: flex-end;\n  font-weight: 900;\n  background: none;\n  border-radius: 0.4rem;\n  cursor: pointer;\n}\n\n.pop-up-buttons:hover {\n  background-color: #000;\n  color: #fff;\n  padding-right: 1rem;\n  padding-left: 0.5rem;\n}\n\n.pop-up-buttons::after {\n  position: absolute;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.pop-up-buttons:hover::after {\n  opacity: 1;\n  right: 0.5rem;\n}\n\n.pop-up-buttons:focus {\n  color: #f00;\n}\n\n.comment-pop-up h2 {\n  font-size: 5vw;\n  margin: 0.5rem;\n}\n\n.comment-pop-up h3 {\n  font-size: 4vh;\n  margin: 0 auto;\n}\n\n.comment-pop-up-details ul:nth-child(1) {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n}\n\n#abilities-list li,\n#stats-list li,\n#forms-list li,\n#weight-list li {\n  font-size: 0.7rem;\n  width: fit-content;\n}\n\n.comment-pop-up-comments-number-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#commentCount {\n  font-size: inherit;\n}\n\n.comment-pop-up_form_container h3 {\n  text-align: center;\n}\n\n.comment-pop-up_form_container form {\n  display: flex;\n  flex-direction: column;\n  row-gap: 1.3vh;\n}\n\n.comment-pop-up_form_container form input,\n.comment-pop-up_form_container form textarea {\n  border: 0.2rem solid #000;\n  border-radius: 0.3rem;\n}\n\n.comment-pop-up_form_container form input:hover,\n.comment-pop-up_form_container form textarea:hover {\n  border: 0.2rem solid #2b2828;\n  border-radius: 0.3rem;\n  background: #f9f7f7;\n}\n\n.comment-pop-up_form_container form button {\n  width: fit-content;\n  padding: 0.2rem 0.5rem;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
>>>>>>> 21f9391a6f59f14841180f70e9571af2c836a2b7
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyx3QkFBd0IsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sYUFBYSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsd0JBQXdCLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEseUJBQXlCLE9BQU8sTUFBTSxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sYUFBYSxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUs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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7V0NBQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNnQztBQUNTO0FBRTlEcUcsa0VBQWMsQ0FBQyxDQUFDLENBQUNvQyxJQUFJLENBQUMsTUFBTU4scUVBQW9CLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvYnVpbGRDb21tZW50UG9wVXAuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL2NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL2ludm9sdmVtZW50QXBpLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9wb2tlbW9uLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9wb2tlbW9uQ291bnRlci5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvdmlld0Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmNzcz9jZmU0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1lbnQgZnJvbSAnLi9jb21tZW50LmpzJztcbmltcG9ydCB7IGdldENvbW1lbnQsIHBvc3RDb21tZW50IH0gZnJvbSAnLi9pbnZvbHZlbWVudEFwaS5qcyc7XG5pbXBvcnQgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlciBmcm9tICcuL3ZpZXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWlsZENvbW1lbnRQb3BVcCB7XG4gIGNvbnN0cnVjdG9yKHBva2Vtb24sIGRldGFpbHMsIGZlYXR1cmVzKSB7XG4gICAgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlcigpO1xuXG4gICAgdGhpcy5lbGVtZW50ID0ge307XG4gICAgdGhpcy5lbGVtZW50LnJvb3QgPSBCdWlsZENvbW1lbnRQb3BVcC5jcmVhdGVSb290KCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuaW1hZ2UgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjaW1hZ2UtcG9rZW1vbicpO1xuICAgIHRoaXMuZWxlbWVudC5pbWFnZS5zcmMgPSBkZXRhaWxzLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcblxuICAgIHRoaXMuZWxlbWVudC5wb2tlbW9uTmFtZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9uLW5hbWUnKTtcbiAgICB0aGlzLmVsZW1lbnQucG9rZW1vbk5hbWUuaW5uZXJUZXh0ID0gcG9rZW1vbi5uYW1lO1xuXG4gICAgY29uc3QgcG9rZW1vbkFiaWxpdGllcyA9IGRldGFpbHMuYWJpbGl0aWVzO1xuICAgIC8vIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB0aGUgZXhhY3QgbnVtYmVyIG9mIGFiaWxpdGllcyBvZiBlYWNoIHBva2Vtb25cbiAgICB0aGlzLmVsZW1lbnQuYWJpbGl0aWVzTGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNhYmlsaXRpZXMtbGlzdCcpO1xuICAgIHBva2Vtb25BYmlsaXRpZXMuZm9yRWFjaCgoYWJpbGl0eSkgPT4ge1xuICAgICAgY29uc3QgaXRlbUFiaWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgaXRlbUFiaWxpdHkuaW5uZXJUZXh0ID0gYWJpbGl0eS5hYmlsaXR5Lm5hbWU7XG4gICAgICB0aGlzLmVsZW1lbnQuYWJpbGl0aWVzTGlzdC5hcHBlbmRDaGlsZChpdGVtQWJpbGl0eSk7XG4gICAgfSk7XG4gICAgLy8gZm9ybXNcbiAgICB0aGlzLmVsZW1lbnQuZm9ybUxpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjZm9ybXMtbGlzdCcpO1xuICAgIGNvbnN0IHBva2Vtb25Gb3JtID0gZGV0YWlscy5mb3JtcztcbiAgICBwb2tlbW9uRm9ybS5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgICBjb25zdCBpdGVtRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtRm9ybS5pbm5lclRleHQgPSBmb3JtLm5hbWU7XG4gICAgICB0aGlzLmVsZW1lbnQuZm9ybUxpc3QuYXBwZW5kQ2hpbGQoaXRlbUZvcm0pO1xuICAgIH0pO1xuICAgIC8vIHN0YXRzXG4gICAgdGhpcy5lbGVtZW50LnN0YXRzTGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNzdGF0cy1saXN0Jyk7XG4gICAgY29uc3QgcG9rZW1vblN0YXRzID0gZGV0YWlscy5zdGF0cztcbiAgICBwb2tlbW9uU3RhdHMuZm9yRWFjaCgoc3RhdCkgPT4ge1xuICAgICAgY29uc3QgaXRlbVN0YXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgaXRlbVN0YXQuaW5uZXJUZXh0ID0gYCR7c3RhdC5zdGF0Lm5hbWV9IDogJHtzdGF0LmJhc2Vfc3RhdH1gO1xuICAgICAgdGhpcy5lbGVtZW50LnN0YXRzTGlzdC5hcHBlbmRDaGlsZChpdGVtU3RhdCk7XG4gICAgfSk7XG5cbiAgICAvLyB3ZWlnaHRcbiAgICB0aGlzLmVsZW1lbnQud2VpZ2h0TGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyN3ZWlnaHQtbGlzdCcpO1xuICAgIGNvbnN0IGl0ZW1XZWlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGl0ZW1XZWlnaHQuaW5uZXJUZXh0ID0gZGV0YWlscy53ZWlnaHQ7XG4gICAgdGhpcy5lbGVtZW50LndlaWdodExpc3QuYXBwZW5kQ2hpbGQoaXRlbVdlaWdodCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1saXN0Jyk7XG4gICAgdGhpcy5lbGVtZW50Lm51bWJlck9mQ29tbWVudHMgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudENvdW50Jyk7XG4gICAgQnVpbGRDb21tZW50UG9wVXAuZ2V0Q29tbWVudHMoXG4gICAgICBmZWF0dXJlcy5pdGVtSWQsXG4gICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QsXG4gICAgICB0aGlzLmVsZW1lbnQubnVtYmVyT2ZDb21tZW50cyxcbiAgICApO1xuXG4gICAgdGhpcy5lbGVtZW50LmZvcm0gPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gICAgdGhpcy5lbGVtZW50LnVzZXJOYW1lID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX2lucHV0X25hbWUnKTtcbiAgICB0aGlzLmVsZW1lbnQuY29tbWVudCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN1Ym1pdEJ1dHRvbiA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LXBvcC11cF9zdWJtaXQnKTtcbiAgICB0aGlzLmVsZW1lbnQuc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHVzZXJOYW1lID0gdGhpcy5lbGVtZW50LnVzZXJOYW1lLnZhbHVlLnRyaW0oKTtcbiAgICAgIGNvbnN0IGNvbW1lbnRDb250ZW50ID0gdGhpcy5lbGVtZW50LmNvbW1lbnQudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgY29tbWVudCA9IG5ldyBDb21tZW50KGZlYXR1cmVzLml0ZW1JZCwgdXNlck5hbWUsIGNvbW1lbnRDb250ZW50KTtcbiAgICAgIEJ1aWxkQ29tbWVudFBvcFVwLnNhdmVDb21tZW50KGNvbW1lbnQpO1xuICAgICAgdGhpcy5lbGVtZW50LmNvbW1lbnRMaXN0LmlubmVyVGV4dCA9ICcnO1xuICAgICAgdGhpcy5lbGVtZW50LmZvcm0ucmVzZXQoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBCdWlsZENvbW1lbnRQb3BVcC5nZXRDb21tZW50cyhcbiAgICAgICAgICBmZWF0dXJlcy5pdGVtSWQsXG4gICAgICAgICAgdGhpcy5lbGVtZW50LmNvbW1lbnRMaXN0LFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5udW1iZXJPZkNvbW1lbnRzLFxuICAgICAgICApO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnQueEJ1dHRvbiA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJy54LWJ1dHRvbicpO1xuICAgIHRoaXMuZWxlbWVudC54QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50LnJvb3QucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQucm9vdCk7XG4gICAgICBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyKCk7XG4gICAgfSk7XG4gIH1cblxuICAgIHN0YXRpYyBjcmVhdGVSb290ID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5ib2R5KTtcbiAgICAgIHJldHVybiByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXBcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIngtYnV0dG9uIHBvcC11cC1idXR0b25zXCI+PGkgY2xhc3M9XCJiaSBiaS14LWxnXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXAtaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cInBva2Vtb24gaW1hZ2VcIiBpZCA9ICdpbWFnZS1wb2tlbW9uJz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoMiBpZD0ncG9rZW1vbi1uYW1lJz48L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXAtZGV0YWlsc1wiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+QWJpbGl0aWVzPC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0gJ2FiaWxpdGllcy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+Rm9ybXM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSAnZm9ybXMtbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPjxzcGFuPlN0YXRzPC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0nc3RhdHMtbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPjxzcGFuPndlaWdodDwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9ICd3ZWlnaHQtbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGgzID5cbiAgICAgICAgICAgICAgICBDb21tZW50cyAoPHNwYW4gaWQ9J2NvbW1lbnRDb3VudCc+PC9zcGFuPilcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8dWwgaWQgPSAnY29tbWVudC1saXN0Jz5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxoMz5BZGQgY29tbWVudDwvaDM+XG4gICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBjbGFzcz0nZm9ybSc+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvbW1lbnQtcG9wLXVwX2lucHV0X25hbWVcIiBpZD1cImNvbW1lbnQtcG9wLXVwX2lucHV0X25hbWVcIiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwX2lucHV0X25hbWVcIiBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiY29tbWVudC1wb3AtdXBfdGV4dGFyZWFfY29udGVudFwiIGlkPVwiY29tbWVudC1wb3AtdXBfdGV4dGFyZWFfY29udGVudFwiIGNvbHM9XCIzMFwiIHJvd3M9XCIxMFwiIHBsYWNlaG9sZGVyPVwiWW91ciBpbnNpZ2h0c1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJjb21tZW50LXBvcC11cF9zdWJtaXRcIiBjbGFzcz1cInBvcC11cC1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIENvbW1lbnRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgIDwvZGl2PlxuICAgICAgICAgICAgYCkuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgc3RhdGljIHNhdmVDb21tZW50ID0gYXN5bmMgKGNvbW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBwb3N0Q29tbWVudChjb21tZW50KTtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRDb21tZW50cyA9IGFzeW5jIChpZFBva2Vtb24sIHBhcmVudCwgY291bnQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudChpZFBva2Vtb24pO1xuICAgICAgICBjb3VudC5pbm5lclRleHQgPSBjb21tZW50cy5sZW5ndGg7XG4gICAgICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBpdGVtQ29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgaXRlbUNvbW1lbnQuaW5uZXJIVE1MID0gYCR7Y29tbWVudC5jcmVhdGlvbl9kYXRlfSAke2NvbW1lbnQudXNlcm5hbWV9IDogJHtjb21tZW50LmNvbW1lbnR9YDtcbiAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaXRlbUNvbW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvdW50LmlubmVySFRNTCA9IDA7XG4gICAgICAgIHBhcmVudC5pbm5lckhUTUwgPSAnPHA+Tm8gY29tbWVudCB5ZXQ8L3A+JztcbiAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudCB7XG4gIGNvbnN0cnVjdG9yKGl0ZW1JZCwgdXNlck5hbWUsIGNvbW1lbnQpIHtcbiAgICB0aGlzLml0ZW1JZCA9IGl0ZW1JZDtcbiAgICB0aGlzLnVzZXJOYW1lID0gdXNlck5hbWU7XG4gICAgdGhpcy5jb21tZW50ID0gY29tbWVudDtcbiAgfVxufSIsImNvbnN0IGdldENvbW1lbnQgPSBhc3luYyAoaWRQb2tlbW9uKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL09wWTJXaVFKQm1BM1pKTzBjcGlWL2NvbW1lbnRzP2l0ZW1faWQ9JHtpZFBva2Vtb259YClcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBuZXcgRXJyb3IoZXJyb3IpKTtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBjb21tZW50cztcbn07XG5cbmNvbnN0IHBvc3RDb21tZW50ID0gYXN5bmMgKGNvbW1lbnQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvY29tbWVudHMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogY29tbWVudC5pdGVtSWQsXG4gICAgICB1c2VybmFtZTogY29tbWVudC51c2VyTmFtZSxcbiAgICAgIGNvbW1lbnQ6IGNvbW1lbnQuY29tbWVudCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4gbmV3IEVycm9yKGVycm9yKSk7XG4gIGNvbnN0IG1zZyA9IGF3YWl0IHJlc3BvbnNlO1xuICByZXR1cm4gbXNnO1xufTtcblxuY29uc3QgcG9zdExpa2UgPSBhc3luYyAocG9rZW1vbklkKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL09wWTJXaVFKQm1BM1pKTzBjcGlWL2xpa2VzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IHBva2Vtb25JZCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4gbmV3IEVycm9yKGVycm9yKSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2U7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGxpa2VzO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL09wWTJXaVFKQm1BM1pKTzBjcGlWL2xpa2VzJyk7XG5cbiAgICAvLyBDaGVjayBpZiByZXNwb25zZSBpcyBva1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiByZXNwb25zZSBpcyBub3QgZW1wdHlcbiAgICBpZiAocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykgPT09ICcwJyB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNCkge1xuICAgICAgbGlrZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlrZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxpa2VzID0gW107XG4gIH1cbiAgcmV0dXJuIGxpa2VzO1xufTtcblxuZXhwb3J0IHtcbiAgZ2V0Q29tbWVudCwgcG9zdENvbW1lbnQsIHBvc3RMaWtlLCBnZXRMaWtlcyxcbn07XG4iLCJpbXBvcnQgQnVpbGRDb21tZW50UG9wVXAgZnJvbSAnLi9idWlsZENvbW1lbnRQb3BVcC5qcyc7XG5pbXBvcnQgeyBwb3N0TGlrZSwgZ2V0TGlrZXMgfSBmcm9tICcuL2ludm9sdmVtZW50QXBpLmpzJztcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcblxuLy8gRGF0YSBmcm9tIEFQSVxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbkRhdGEoKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbj9saW1pdD02Jyk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhLnJlc3VsdHM7XG59XG5cbi8vIFNwZWNpZmljIFBva2Vtb24gZGV0YWlsc1xuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbkRldGFpbHModXJsKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8vIEhUTUwgZWxlbWVudHMgZm9yIGVhY2ggUG9rZW1vblxuYXN5bmMgZnVuY3Rpb24gZGlzcGxheVBva2Vtb24oKSB7XG4gIGNvbnN0IHBva2Vtb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bva2Vtb24tbGlzdCcpO1xuICBjb25zdCBwb2tlbW9uRGF0YSA9IGF3YWl0IGdldFBva2Vtb25EYXRhKCk7XG5cbiAgLy8gR2V0IHRoZSBsaXN0IG9mIGxpa2VzIGZyb20gdGhlIEFQSVxuICBjb25zdCBsaWtlc0RhdGEgPSBhd2FpdCBnZXRMaWtlcygpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGZvckVhY2ggbG9vcCB0byBhIG1hcCBsb29wIHRoYXQgcmV0dXJucyBwcm9taXNlc1xuICBjb25zdCBwb2tlbW9uUHJvbWlzZXMgPSBwb2tlbW9uRGF0YS5tYXAoYXN5bmMgKHBva2Vtb24sIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZGV0YWlscyA9IGF3YWl0IGdldFBva2Vtb25EZXRhaWxzKHBva2Vtb24udXJsKTtcblxuICAgIGNvbnN0IHBva2Vtb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9rZW1vbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncG9rZW1vbi1pdGVtJyk7XG5cbiAgICBjb25zdCBwb2tlbW9uVGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwb2tlbW9uVGl0bGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBwb2tlbW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHBva2Vtb25UaXRsZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcblxuICAgIGNvbnN0IHBva2Vtb25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHBva2Vtb25JbWFnZS5zcmMgPSBkZXRhaWxzLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcblxuICAgIC8vIExpa2UgQnV0dG9uXG4gICAgY29uc3QgbGlrZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgbGlrZUljb24uY2xhc3NMaXN0LmFkZCgnbGlrZS1pY29uJywgJ2ZhcicsICdmYS1oZWFydCcpO1xuXG4gICAgLy8gQ3JlYXRlIGEgc3BhbiB0byBob2xkIHRoZSBsaWtlcyBjb3VudFxuICAgIGNvbnN0IGxpa2VzQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGlrZXNDb3VudC5jbGFzc0xpc3QuYWRkKCdsaWtlcy1jb3VudCcpO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBwb2tlbW9uIGlzIGluIHRoZSBsaXN0IG9mIGxpa2VzXG4gICAgY29uc3QgbGlrZU9iaiA9IGxpa2VzRGF0YS5maW5kKChvYmopID0+IG9iai5pdGVtX2lkID09PSBwb2tlbW9uLm5hbWUpO1xuICAgIGlmIChsaWtlT2JqKSB7XG4gICAgICBsaWtlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycpOyAvLyBmaWxsZWQgaGVhcnRcbiAgICAgIGxpa2VzQ291bnQudGV4dENvbnRlbnQgPSBsaWtlT2JqLmxpa2VzOyAvLyB1cGRhdGUgbGlrZXMgY291bnRcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBva2Vtb25UaXRsZUNvbnRhaW5lci5hcHBlbmQocG9rZW1vblRpdGxlLCBsaWtlSWNvbiwgbGlrZXNDb3VudCk7IC8vIGFwcGVuZCBsaWtlcyBjb3VudCB0byBjb250YWluZXJcblxuICAgIC8vIEJ1dHRvbnMgYW5kIFJlc2VydmF0aW9uIEJ1dHRvbnNcbiAgICBjb25zdCBjb21tZW50QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29tbWVudEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgY29tbWVudEJ1dHRvbi5pZCA9IGBpZFBva2Vtb24tJHtpbmRleH1gO1xuXG4gICAgcG9rZW1vbkVsZW1lbnQuYXBwZW5kKHBva2Vtb25JbWFnZSwgcG9rZW1vblRpdGxlQ29udGFpbmVyLCBjb21tZW50QnV0dG9uKTtcblxuICAgIGNvbW1lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgaXRlbUlkID0gZS50YXJnZXQuaWQ7XG4gICAgICBjb25zdCBwb3BVcCA9IG5ldyBCdWlsZENvbW1lbnRQb3BVcChwb2tlbW9uLCBkZXRhaWxzLCB7IGl0ZW1JZCB9KTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3BVcC5lbGVtZW50LnJvb3QpO1xuICAgICAgcG9rZW1vbkxpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSk7XG5cbiAgICAvLyBFdmVudCBsaXN0ZW5lciBmb3IgdGhlIGxpa2UgYnV0dG9uXG4gICAgbGlrZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAobGlrZUljb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYXInKSkge1xuICAgICAgICAvLyBQb3N0IHRoZSBsaWtlIHRvIHRoZSBBUElcbiAgICAgICAgYXdhaXQgcG9zdExpa2UocG9rZW1vbi5uYW1lKTtcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBpY29uIHRvIGZpbGxlZFxuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgbGlrZUljb24uY2xhc3NMaXN0LmFkZCgnZmFzJyk7XG4gICAgICAgIC8vIEluY3JlbWVudCB0aGUgbGlrZXMgY291bnRcbiAgICAgICAgbGlrZXNDb3VudC50ZXh0Q29udGVudCA9IE51bWJlcihsaWtlc0NvdW50LnRleHRDb250ZW50KSArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGljb24gdG8gZW1wdHlcbiAgICAgICAgbGlrZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFzJyk7XG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIFBva2Vtb24gaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgcG9rZW1vbkxpc3QuYXBwZW5kKHBva2Vtb25FbGVtZW50KTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gV2FpdCBmb3IgYWxsIHRoZSBQb2tlbW9uIHRvIGJlIGFkZGVkIHRvIHRoZSBET01cbiAgYXdhaXQgUHJvbWlzZS5hbGwocG9rZW1vblByb21pc2VzKTtcbn1cblxuLy8gRXhwb3J0IGZ1bmN0aW9uc1xuZXhwb3J0IHsgZ2V0UG9rZW1vbkRhdGEsIGdldFBva2Vtb25EZXRhaWxzLCBkaXNwbGF5UG9rZW1vbiB9O1xuIiwiaW1wb3J0IHsgZ2V0UG9rZW1vbkRhdGEgfSBmcm9tICcuL3Bva2Vtb24uanMnO1xuXG5jb25zdCB1cGRhdGVQb2tlbW9uQ291bnRlciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcG9rZW1vbkNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9rZW1vbi1jb3VudGVyJyk7XG4gIGlmIChwb2tlbW9uQ291bnRlcikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRQb2tlbW9uRGF0YSgpO1xuICAgIHBva2Vtb25Db3VudGVyLnRleHRDb250ZW50ID0gZGF0YS5sZW5ndGg7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZVBva2Vtb25Db3VudGVyO1xuIiwiY29uc3QgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlciA9ICgpID0+IHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpO1xuICBjb25zdCBwb2tlbW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uLWxpc3QnKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpO1xuICBmb290ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gIHBva2Vtb25MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9sb2dvL3Bva2Vtb24tbG9nby5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAydnc7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBwYWRkaW5nOiAwIDR2dztcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5uYXZiYXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB3aWR0aDogOTB2dztcclxuICBwYWRkaW5nOiAwIDF2dztcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBoZWlnaHQ6IDcuNXZ3O1xyXG4gIHRvcDogMDtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4ubWFpbiB7XHJcbiAgcGFkZGluZy10b3A6IDE1MHB4OyAgLyogQWp1c3RhIGVzdGUgdmFsb3Igc2Vnw7puIHNlYSBuZWNlc2FyaW8gKi9cclxufVxyXG5cclxuLnBva2Vtb24taXRlbSBpbWcge1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5cclxuI3Bva2Vtb24tY291bnRlciB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xyXG4gIHdpZHRoOiAzNXZ3O1xyXG59XHJcblxyXG4ubmF2YmFyIC5sb2dvIGltZyB7XHJcbiAgaGVpZ2h0OiA2dnc7XHJcbn1cclxuXHJcbi5uYXZiYXIgbmF2IHVsIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cCBsaSB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWwgbGkge1xyXG4gIHdpZHRoOiA0MCU7XHJcbn1cclxuXHJcbi5uYXZiYXIgbmF2IHVsIGxpIHtcclxuICBtYXJnaW46IDAgMXZ3O1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCBsaSBhIHtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbi5saXN0cyBhOmhvdmVyIHtcclxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcclxufVxyXG5cclxuLmxpc3RzIGEuYWN0aXZlIHtcclxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcclxufVxyXG5cclxuLm5hdmJhciBuYXYgdWwgbGkgYTpob3ZlciB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5uYXZiYXIgbmF2IHVsIGxpIGEuYWN0aXZlIHtcclxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcclxufVxyXG5cclxuLmxvZ28ge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICB3aWR0aDogNnZ3O1xyXG4gIGhlaWdodDogNnZ3O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxufVxyXG5cclxuLmhlYWRlciB7XHJcbiAgaGVpZ2h0OiA2dnc7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5mb290ZXIge1xyXG4gIGhlaWdodDogNXZ3O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDAuNXZ3O1xyXG4gIHBhZGRpbmc6IDAgMXZ3O1xyXG59XHJcblxyXG4uZm9vdGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHdpZHRoOiA5MHZ3O1xyXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMC41dnc7XHJcbiAgcGFkZGluZzogMCAxdnc7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgaGVpZ2h0OiA1dnc7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbn1cclxuXHJcbi8qIC0tLS0tLS0tLS0gUE9LRU1PTiBMSVNUIC0tLS0tLS0tLS0gKi9cclxuXHJcbi5wb2tlbW9uLWxpc3Qge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogNXZ3O1xyXG4gIG1hcmdpbi1ib3R0b206IDV2dztcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgcGFkZGluZy10b3A6IDcuNXZ3OyAvKiBBZGRlZCB0byBhY2NvdW50IGZvciB0aGUgbmF2YmFyICovXHJcbn1cclxuXHJcbi5wb2tlbW9uLWl0ZW0ge1xyXG4gIGZsZXgtYmFzaXM6IGNhbGMoMzAlIC0gMmVtKTtcclxuICBtYXJnaW46IDFlbTtcclxuICBwYWRkaW5nOiAyZW07XHJcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgaGVpZ2h0OiA1MHZoO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IC8qIEFkZGVkIHRvIHNwYWNlIG91dCB0aGUgZWxlbWVudHMgKi9cclxufVxyXG5cclxuLmNvbW1lbnQtYnV0dG9uLFxyXG4ucmVzZXJ2YXRpb24tYnV0dG9uIHtcclxuICBtYXJnaW46IDAuNWVtIDA7XHJcbn1cclxuXHJcbi5saWtlLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMmVtO1xyXG59XHJcblxyXG4udGl0bGUtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXHJcblxyXG5zcGFuIHtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAge1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbWFyZ2luOiAxdmggYXV0bztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgcGFkZGluZzogMXZoIDN2dztcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJvcmRlcjogMC4zcmVtIHNvbGlkIGJsYWNrO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuOXJlbTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwID4gKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLngtYnV0dG9uIHtcclxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcclxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogMC41cztcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XHJcbiAgb3BhY2l0eTogMTtcclxuICByaWdodDogMC41cmVtO1xyXG59XHJcblxyXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cCBoMiB7XHJcbiAgZm9udC1zaXplOiA1dnc7XHJcbiAgbWFyZ2luOiAwLjVyZW07XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cCBoMyB7XHJcbiAgZm9udC1zaXplOiA0dmg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsOm50aC1jaGlsZCgxKSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuXHJcbiNhYmlsaXRpZXMtbGlzdCBsaSxcclxuI3N0YXRzLWxpc3QgbGksXHJcbiNmb3Jtcy1saXN0IGxpLFxyXG4jd2VpZ2h0LWxpc3QgbGkge1xyXG4gIGZvbnQtc2l6ZTogMC43cmVtO1xyXG4gIHdpZHRoOiBmaXQtY29udGVudDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4jY29tbWVudENvdW50IHtcclxuICBmb250LXNpemU6IGluaGVyaXQ7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHJvdy1nYXA6IDEuM3ZoO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dCxcclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWEge1xyXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIGJsYWNrO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQ6aG92ZXIsXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhOmhvdmVyIHtcclxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcclxuICBiYWNrZ3JvdW5kOiAjZjlmN2Y3O1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBidXR0b24ge1xyXG4gIHdpZHRoOiBmaXQtY29udGVudDtcclxuICBwYWRkaW5nOiAwLjJyZW0gMC41cmVtO1xyXG59XHJcblxyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2Vi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ZCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QjtFQUM3QixlQUFlO0FBQ2pCOztBQUVBOzs7O0VBSUUsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCOztBQUVBOztFQUVFLDBCQUEwQjtFQUMxQixxQkFBcUI7QUFDdkI7O0FBRUE7O0VBRUUsNEJBQTRCO0VBQzVCLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwJmRpc3BsYXk9c3dhcCcpO1xcclxcblxcclxcbioge1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMCA0dnc7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgcGFkZGluZzogMCAxdnc7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbiAgaGVpZ2h0OiA3LjV2dztcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHotaW5kZXg6IDEwMDA7XFxyXFxufVxcclxcblxcclxcbi5tYWluIHtcXHJcXG4gIHBhZGRpbmctdG9wOiAxNTBweDsgIC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXFxyXFxufVxcclxcblxcclxcbi5wb2tlbW9uLWl0ZW0gaW1nIHtcXHJcXG4gIG1heC13aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuI3Bva2Vtb24tY291bnRlciB7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgZGl2IGltZyB7XFxyXFxuICB3aWR0aDogMzV2dztcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciAubG9nbyBpbWcge1xcclxcbiAgaGVpZ2h0OiA2dnc7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgbGkge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWwgbGkge1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciBuYXYgdWwgbGkge1xcclxcbiAgbWFyZ2luOiAwIDF2dztcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciBuYXYgdWwgbGkgYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmxpc3RzIGE6aG92ZXIge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5saXN0cyBhLmFjdGl2ZSB7XFxyXFxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciBuYXYgdWwgbGkgYTpob3ZlciB7XFxyXFxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciBuYXYgdWwgbGkgYS5hY3RpdmUge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5sb2dvIHtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9hc3NldHMvbG9nby9wb2tlbW9uLWxvZ28ucG5nJyk7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcclxcbiAgd2lkdGg6IDZ2dztcXHJcXG4gIGhlaWdodDogNnZ3O1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIHtcXHJcXG4gIGhlaWdodDogNnZ3O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICBoZWlnaHQ6IDV2dztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAwLjV2dztcXHJcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgd2lkdGg6IDkwdnc7XFxyXFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDAuNXZ3O1xcclxcbiAgcGFkZGluZzogMCAxdnc7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbiAgaGVpZ2h0OiA1dnc7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICB6LWluZGV4OiAxMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tIFBPS0VNT04gTElTVCAtLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuLnBva2Vtb24tbGlzdCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbWFyZ2luLXRvcDogNXZ3O1xcclxcbiAgbWFyZ2luLWJvdHRvbTogNXZ3O1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgcGFkZGluZy10b3A6IDcuNXZ3OyAvKiBBZGRlZCB0byBhY2NvdW50IGZvciB0aGUgbmF2YmFyICovXFxyXFxufVxcclxcblxcclxcbi5wb2tlbW9uLWl0ZW0ge1xcclxcbiAgZmxleC1iYXNpczogY2FsYygzMCUgLSAyZW0pO1xcclxcbiAgbWFyZ2luOiAxZW07XFxyXFxuICBwYWRkaW5nOiAyZW07XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBoZWlnaHQ6IDUwdmg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IC8qIEFkZGVkIHRvIHNwYWNlIG91dCB0aGUgZWxlbWVudHMgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtYnV0dG9uLFxcclxcbi5yZXNlcnZhdGlvbi1idXR0b24ge1xcclxcbiAgbWFyZ2luOiAwLjVlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubGlrZS1pY29uIHtcXHJcXG4gIGZvbnQtc2l6ZTogMmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIC0tLS0tLS0tLS0gQ09NTUVOVFMgUE9QIFVQIC0tLS0tLS0tLS0gKi9cXHJcXG5cXHJcXG5zcGFuIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cCB7XFxyXFxuICB3aWR0aDogODAlO1xcclxcbiAgbWFyZ2luOiAxdmggYXV0bztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcGFkZGluZzogMXZoIDN2dztcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBib3JkZXI6IDAuM3JlbSBzb2xpZCBibGFjaztcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuOXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwID4gKiB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4ueC1idXR0b24ge1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbiAgYmFja2dyb3VuZDogbm9uZTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcXHJcXG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wLXVwLWJ1dHRvbnM6OmFmdGVyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIG9wYWNpdHk6IDA7XFxyXFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXI6OmFmdGVyIHtcXHJcXG4gIG9wYWNpdHk6IDE7XFxyXFxuICByaWdodDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xcclxcbiAgY29sb3I6IHJlZDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGgyIHtcXHJcXG4gIGZvbnQtc2l6ZTogNXZ3O1xcclxcbiAgbWFyZ2luOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cCBoMyB7XFxyXFxuICBmb250LXNpemU6IDR2aDtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bDpudGgtY2hpbGQoMSkge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4jYWJpbGl0aWVzLWxpc3QgbGksXFxyXFxuI3N0YXRzLWxpc3QgbGksXFxyXFxuI2Zvcm1zLWxpc3QgbGksXFxyXFxuI3dlaWdodC1saXN0IGxpIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC43cmVtO1xcclxcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNjb21tZW50Q291bnQge1xcclxcbiAgZm9udC1zaXplOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgaDMge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHJvdy1nYXA6IDEuM3ZoO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dCxcXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCBibGFjaztcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQ6aG92ZXIsXFxyXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWE6aG92ZXIge1xcclxcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzJiMjgyODtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXHJcXG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGJ1dHRvbiB7XFxyXFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxuICBwYWRkaW5nOiAwLjJyZW0gMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uaGlkZGVuIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5pbXBvcnQgeyBkaXNwbGF5UG9rZW1vbiB9IGZyb20gJy4vbW9kdWxlL3Bva2Vtb24uanMnO1xuaW1wb3J0IHVwZGF0ZVBva2Vtb25Db3VudGVyIGZyb20gJy4vbW9kdWxlL3Bva2Vtb25Db3VudGVyLmpzJztcblxuZGlzcGxheVBva2Vtb24oKS50aGVuKCgpID0+IHVwZGF0ZVBva2Vtb25Db3VudGVyKCkpO1xuIl0sIm5hbWVzIjpbIkNvbW1lbnQiLCJnZXRDb21tZW50IiwicG9zdENvbW1lbnQiLCJoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIiwiQnVpbGRDb21tZW50UG9wVXAiLCJjb25zdHJ1Y3RvciIsInBva2Vtb24iLCJkZXRhaWxzIiwiZmVhdHVyZXMiLCJlbGVtZW50Iiwicm9vdCIsImNyZWF0ZVJvb3QiLCJpbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJzcHJpdGVzIiwiZnJvbnRfZGVmYXVsdCIsInBva2Vtb25OYW1lIiwiaW5uZXJUZXh0IiwibmFtZSIsInBva2Vtb25BYmlsaXRpZXMiLCJhYmlsaXRpZXMiLCJhYmlsaXRpZXNMaXN0IiwiZm9yRWFjaCIsImFiaWxpdHkiLCJpdGVtQWJpbGl0eSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZm9ybUxpc3QiLCJwb2tlbW9uRm9ybSIsImZvcm1zIiwiZm9ybSIsIml0ZW1Gb3JtIiwic3RhdHNMaXN0IiwicG9rZW1vblN0YXRzIiwic3RhdHMiLCJzdGF0IiwiaXRlbVN0YXQiLCJiYXNlX3N0YXQiLCJ3ZWlnaHRMaXN0IiwiaXRlbVdlaWdodCIsIndlaWdodCIsImNvbW1lbnRMaXN0IiwibnVtYmVyT2ZDb21tZW50cyIsImdldENvbW1lbnRzIiwiaXRlbUlkIiwidXNlck5hbWUiLCJjb21tZW50Iiwic3VibWl0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwidHJpbSIsImNvbW1lbnRDb250ZW50Iiwic2F2ZUNvbW1lbnQiLCJyZXNldCIsInNldFRpbWVvdXQiLCJ4QnV0dG9uIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJib2R5IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2hpbGRyZW4iLCJtZXNzYWdlIiwiaWRQb2tlbW9uIiwicGFyZW50IiwiY291bnQiLCJjb21tZW50cyIsImxlbmd0aCIsIml0ZW1Db21tZW50IiwiaW5uZXJIVE1MIiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiZXJyb3IiLCJyZXNwb25zZSIsImZldGNoIiwiY2F0Y2giLCJFcnJvciIsImpzb24iLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJtc2ciLCJwb3N0TGlrZSIsInBva2Vtb25JZCIsInJlc3VsdCIsImdldExpa2VzIiwibGlrZXMiLCJvayIsInN0YXR1cyIsImdldCIsImNvbnRhaW5lciIsImdldFBva2Vtb25EYXRhIiwiZGF0YSIsInJlc3VsdHMiLCJnZXRQb2tlbW9uRGV0YWlscyIsInVybCIsImRpc3BsYXlQb2tlbW9uIiwicG9rZW1vbkxpc3QiLCJwb2tlbW9uRGF0YSIsImxpa2VzRGF0YSIsInBva2Vtb25Qcm9taXNlcyIsIm1hcCIsImluZGV4IiwicG9rZW1vbkVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwb2tlbW9uVGl0bGVDb250YWluZXIiLCJwb2tlbW9uVGl0bGUiLCJ0ZXh0Q29udGVudCIsInBva2Vtb25JbWFnZSIsImxpa2VJY29uIiwibGlrZXNDb3VudCIsImxpa2VPYmoiLCJmaW5kIiwib2JqIiwicmVtb3ZlIiwiYXBwZW5kIiwiY29tbWVudEJ1dHRvbiIsImlkIiwidGFyZ2V0IiwicG9wVXAiLCJjb250YWlucyIsIk51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwiYWxsIiwidXBkYXRlUG9rZW1vbkNvdW50ZXIiLCJwb2tlbW9uQ291bnRlciIsImdldEVsZW1lbnRCeUlkIiwiZm9vdGVyIiwiaGVhZGVyIiwidG9nZ2xlIiwidGhlbiJdLCJzb3VyY2VSb290IjoiIn0=
=======
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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a2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL2J1aWxkQ29tbWVudFBvcFVwLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9jb21tZW50LmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9pbnZvbHZlbWVudEFwaS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvcG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvcG9rZW1vbkNvdW50ZXIuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3ZpZXdGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tZW50IGZyb20gJy4vY29tbWVudC5qcyc7XG5pbXBvcnQgeyBnZXRDb21tZW50LCBwb3N0Q29tbWVudCB9IGZyb20gJy4vaW52b2x2ZW1lbnRBcGkuanMnO1xuaW1wb3J0IGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIgZnJvbSAnLi92aWV3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRDb21tZW50UG9wVXAge1xuICBjb25zdHJ1Y3Rvcihwb2tlbW9uLCBkZXRhaWxzLCBmZWF0dXJlcykge1xuICAgIGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIoKTtcblxuICAgIHRoaXMuZWxlbWVudCA9IHt9O1xuICAgIHRoaXMuZWxlbWVudC5yb290ID0gQnVpbGRDb21tZW50UG9wVXAuY3JlYXRlUm9vdCgpO1xuXG4gICAgdGhpcy5lbGVtZW50LmltYWdlID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2ltYWdlLXBva2Vtb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuaW1hZ2Uuc3JjID0gZGV0YWlscy5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG5cbiAgICB0aGlzLmVsZW1lbnQucG9rZW1vbk5hbWUgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbi1uYW1lJyk7XG4gICAgdGhpcy5lbGVtZW50LnBva2Vtb25OYW1lLmlubmVyVGV4dCA9IHBva2Vtb24ubmFtZTtcblxuICAgIGNvbnN0IHBva2Vtb25BYmlsaXRpZXMgPSBkZXRhaWxzLmFiaWxpdGllcztcbiAgICAvLyBiZWNhdXNlIHdlIGRvbid0IGtub3cgdGhlIGV4YWN0IG51bWJlciBvZiBhYmlsaXRpZXMgb2YgZWFjaCBwb2tlbW9uXG4gICAgdGhpcy5lbGVtZW50LmFiaWxpdGllc0xpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjYWJpbGl0aWVzLWxpc3QnKTtcbiAgICBwb2tlbW9uQWJpbGl0aWVzLmZvckVhY2goKGFiaWxpdHkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1BYmlsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1BYmlsaXR5LmlubmVyVGV4dCA9IGFiaWxpdHkuYWJpbGl0eS5uYW1lO1xuICAgICAgdGhpcy5lbGVtZW50LmFiaWxpdGllc0xpc3QuYXBwZW5kQ2hpbGQoaXRlbUFiaWxpdHkpO1xuICAgIH0pO1xuICAgIC8vIGZvcm1zXG4gICAgdGhpcy5lbGVtZW50LmZvcm1MaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2Zvcm1zLWxpc3QnKTtcbiAgICBjb25zdCBwb2tlbW9uRm9ybSA9IGRldGFpbHMuZm9ybXM7XG4gICAgcG9rZW1vbkZvcm0uZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgY29uc3QgaXRlbUZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgaXRlbUZvcm0uaW5uZXJUZXh0ID0gZm9ybS5uYW1lO1xuICAgICAgdGhpcy5lbGVtZW50LmZvcm1MaXN0LmFwcGVuZENoaWxkKGl0ZW1Gb3JtKTtcbiAgICB9KTtcbiAgICAvLyBzdGF0c1xuICAgIHRoaXMuZWxlbWVudC5zdGF0c0xpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjc3RhdHMtbGlzdCcpO1xuICAgIGNvbnN0IHBva2Vtb25TdGF0cyA9IGRldGFpbHMuc3RhdHM7XG4gICAgcG9rZW1vblN0YXRzLmZvckVhY2goKHN0YXQpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1TdGF0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1TdGF0LmlubmVyVGV4dCA9IGAke3N0YXQuc3RhdC5uYW1lfSA6ICR7c3RhdC5iYXNlX3N0YXR9YDtcbiAgICAgIHRoaXMuZWxlbWVudC5zdGF0c0xpc3QuYXBwZW5kQ2hpbGQoaXRlbVN0YXQpO1xuICAgIH0pO1xuXG4gICAgLy8gd2VpZ2h0XG4gICAgdGhpcy5lbGVtZW50LndlaWdodExpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjd2VpZ2h0LWxpc3QnKTtcbiAgICBjb25zdCBpdGVtV2VpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtV2VpZ2h0LmlubmVyVGV4dCA9IGRldGFpbHMud2VpZ2h0O1xuICAgIHRoaXMuZWxlbWVudC53ZWlnaHRMaXN0LmFwcGVuZENoaWxkKGl0ZW1XZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNvbW1lbnRMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtbGlzdCcpO1xuICAgIHRoaXMuZWxlbWVudC5udW1iZXJPZkNvbW1lbnRzID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnRDb3VudCcpO1xuICAgIEJ1aWxkQ29tbWVudFBvcFVwLmdldENvbW1lbnRzKFxuICAgICAgZmVhdHVyZXMuaXRlbUlkLFxuICAgICAgdGhpcy5lbGVtZW50LmNvbW1lbnRMaXN0LFxuICAgICAgdGhpcy5lbGVtZW50Lm51bWJlck9mQ29tbWVudHMsXG4gICAgKTtcblxuICAgIHRoaXMuZWxlbWVudC5mb3JtID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICAgIHRoaXMuZWxlbWVudC51c2VyTmFtZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lJyk7XG4gICAgdGhpcy5lbGVtZW50LmNvbW1lbnQgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfdGV4dGFyZWFfY29udGVudCcpO1xuICAgIHRoaXMuZWxlbWVudC5zdWJtaXRCdXR0b24gPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfc3VibWl0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB1c2VyTmFtZSA9IHRoaXMuZWxlbWVudC51c2VyTmFtZS52YWx1ZS50cmltKCk7XG4gICAgICBjb25zdCBjb21tZW50Q29udGVudCA9IHRoaXMuZWxlbWVudC5jb21tZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudChmZWF0dXJlcy5pdGVtSWQsIHVzZXJOYW1lLCBjb21tZW50Q29udGVudCk7XG4gICAgICBCdWlsZENvbW1lbnRQb3BVcC5zYXZlQ29tbWVudChjb21tZW50KTtcbiAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdC5pbm5lclRleHQgPSAnJztcbiAgICAgIHRoaXMuZWxlbWVudC5mb3JtLnJlc2V0KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQnVpbGRDb21tZW50UG9wVXAuZ2V0Q29tbWVudHMoXG4gICAgICAgICAgZmVhdHVyZXMuaXRlbUlkLFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCxcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubnVtYmVyT2ZDb21tZW50cyxcbiAgICAgICAgKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LnhCdXR0b24gPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcueC1idXR0b24nKTtcbiAgICB0aGlzLmVsZW1lbnQueEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5yb290LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50LnJvb3QpO1xuICAgICAgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlUm9vdCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuYm9keSk7XG4gICAgICByZXR1cm4gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ4LWJ1dHRvbiBwb3AtdXAtYnV0dG9uc1wiPjxpIGNsYXNzPVwiYmkgYmkteC1sZ1wiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwLWltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJwb2tlbW9uIGltYWdlXCIgaWQgPSAnaW1hZ2UtcG9rZW1vbic+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgaWQ9J3Bva2Vtb24tbmFtZSc+PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwLWRldGFpbHNcIj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPjxzcGFuPkFiaWxpdGllczwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9ICdhYmlsaXRpZXMtbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPjxzcGFuPkZvcm1zPC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0gJ2Zvcm1zLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5TdGF0czwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9J3N0YXRzLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj53ZWlnaHQ8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSAnd2VpZ2h0LWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxoMyA+XG4gICAgICAgICAgICAgICAgQ29tbWVudHMgKDxzcGFuIGlkPSdjb21tZW50Q291bnQnPjwvc3Bhbj4pXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHVsIGlkID0gJ2NvbW1lbnQtbGlzdCc+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDM+QWRkIGNvbW1lbnQ8L2gzPlxuICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgY2xhc3M9J2Zvcm0nPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lXCIgaWQ9XCJjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lXCIgY2xhc3M9XCJjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lXCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImNvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnRcIiBpZD1cImNvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnRcIiBjb2xzPVwiMzBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwiY29tbWVudC1wb3AtdXBfc3VibWl0XCIgY2xhc3M9XCJwb3AtdXAtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICBDb21tZW50XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApLmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHN0YXRpYyBzYXZlQ29tbWVudCA9IGFzeW5jIChjb21tZW50KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcG9zdENvbW1lbnQoY29tbWVudCk7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMgPSBhc3luYyAoaWRQb2tlbW9uLCBwYXJlbnQsIGNvdW50KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnQoaWRQb2tlbW9uKTtcbiAgICAgICAgY291bnQuaW5uZXJUZXh0ID0gY29tbWVudHMubGVuZ3RoO1xuICAgICAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXRlbUNvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgIGl0ZW1Db21tZW50LmlubmVySFRNTCA9IGAke2NvbW1lbnQuY3JlYXRpb25fZGF0ZX0gJHtjb21tZW50LnVzZXJuYW1lfSA6ICR7Y29tbWVudC5jb21tZW50fWA7XG4gICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGl0ZW1Db21tZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb3VudC5pbm5lckhUTUwgPSAwO1xuICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gJzxwPk5vIGNvbW1lbnQgeWV0PC9wPic7XG4gICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnQge1xuICBjb25zdHJ1Y3RvcihpdGVtSWQsIHVzZXJOYW1lLCBjb21tZW50KSB7XG4gICAgdGhpcy5pdGVtSWQgPSBpdGVtSWQ7XG4gICAgdGhpcy51c2VyTmFtZSA9IHVzZXJOYW1lO1xuICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XG4gIH1cbn0iLCJjb25zdCBnZXRDb21tZW50ID0gYXN5bmMgKGlkUG9rZW1vbikgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9jb21tZW50cz9pdGVtX2lkPSR7aWRQb2tlbW9ufWApXG4gICAgLmNhdGNoKChlcnJvcikgPT4gbmV3IEVycm9yKGVycm9yKSk7XG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gY29tbWVudHM7XG59O1xuXG5jb25zdCBwb3N0Q29tbWVudCA9IGFzeW5jIChjb21tZW50KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL09wWTJXaVFKQm1BM1pKTzBjcGlWL2NvbW1lbnRzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IGNvbW1lbnQuaXRlbUlkLFxuICAgICAgdXNlcm5hbWU6IGNvbW1lbnQudXNlck5hbWUsXG4gICAgICBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuICBjb25zdCBtc2cgPSBhd2FpdCByZXNwb25zZTtcbiAgcmV0dXJuIG1zZztcbn07XG5cbmNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKHBva2Vtb25JZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9saWtlcycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBwb2tlbW9uSWQsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBsaWtlcztcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9saWtlcycpO1xuXG4gICAgLy8gQ2hlY2sgaWYgcmVzcG9uc2UgaXMgb2tcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgcmVzcG9uc2UgaXMgbm90IGVtcHR5XG4gICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpID09PSAnMCcgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpIHtcbiAgICAgIGxpa2VzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpa2VzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsaWtlcyA9IFtdO1xuICB9XG4gIHJldHVybiBsaWtlcztcbn07XG5cbmV4cG9ydCB7XG4gIGdldENvbW1lbnQsIHBvc3RDb21tZW50LCBwb3N0TGlrZSwgZ2V0TGlrZXMsXG59O1xuIiwiaW1wb3J0IEJ1aWxkQ29tbWVudFBvcFVwIGZyb20gJy4vYnVpbGRDb21tZW50UG9wVXAuanMnO1xuaW1wb3J0IHsgcG9zdExpa2UsIGdldExpa2VzIH0gZnJvbSAnLi9pbnZvbHZlbWVudEFwaS5qcyc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG5cbi8vIERhdGEgZnJvbSBBUElcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EYXRhKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9NicpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YS5yZXN1bHRzO1xufVxuXG4vLyBTcGVjaWZpYyBQb2tlbW9uIGRldGFpbHNcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EZXRhaWxzKHVybCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vLyBIVE1MIGVsZW1lbnRzIGZvciBlYWNoIFBva2Vtb25cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlQb2tlbW9uKCkge1xuICBjb25zdCBwb2tlbW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9uLWxpc3QnKTtcbiAgY29uc3QgcG9rZW1vbkRhdGEgPSBhd2FpdCBnZXRQb2tlbW9uRGF0YSgpO1xuXG4gIC8vIEdldCB0aGUgbGlzdCBvZiBsaWtlcyBmcm9tIHRoZSBBUElcbiAgY29uc3QgbGlrZXNEYXRhID0gYXdhaXQgZ2V0TGlrZXMoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBmb3JFYWNoIGxvb3AgdG8gYSBtYXAgbG9vcCB0aGF0IHJldHVybnMgcHJvbWlzZXNcbiAgY29uc3QgcG9rZW1vblByb21pc2VzID0gcG9rZW1vbkRhdGEubWFwKGFzeW5jIChwb2tlbW9uLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGRldGFpbHMgPSBhd2FpdCBnZXRQb2tlbW9uRGV0YWlscyhwb2tlbW9uLnVybCk7XG5cbiAgICBjb25zdCBwb2tlbW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBva2Vtb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bva2Vtb24taXRlbScpO1xuXG4gICAgY29uc3QgcG9rZW1vblRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9rZW1vblRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgcG9rZW1vblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwb2tlbW9uVGl0bGUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG5cbiAgICBjb25zdCBwb2tlbW9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBwb2tlbW9uSW1hZ2Uuc3JjID0gZGV0YWlscy5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG5cbiAgICAvLyBMaWtlIEJ1dHRvblxuICAgIGNvbnN0IGxpa2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2xpa2UtaWNvbicsICdmYXInLCAnZmEtaGVhcnQnKTtcblxuICAgIC8vIENyZWF0ZSBhIHNwYW4gdG8gaG9sZCB0aGUgbGlrZXMgY291bnRcbiAgICBjb25zdCBsaWtlc0NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxpa2VzQ291bnQuY2xhc3NMaXN0LmFkZCgnbGlrZXMtY291bnQnKTtcblxuICAgIC8vIENoZWNrIGlmIHRoaXMgcG9rZW1vbiBpcyBpbiB0aGUgbGlzdCBvZiBsaWtlc1xuICAgIGNvbnN0IGxpa2VPYmogPSBsaWtlc0RhdGEuZmluZCgob2JqKSA9PiBvYmouaXRlbV9pZCA9PT0gcG9rZW1vbi5uYW1lKTtcbiAgICBpZiAobGlrZU9iaikge1xuICAgICAgbGlrZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFyJyk7XG4gICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTsgLy8gZmlsbGVkIGhlYXJ0XG4gICAgICBsaWtlc0NvdW50LnRleHRDb250ZW50ID0gbGlrZU9iai5saWtlczsgLy8gdXBkYXRlIGxpa2VzIGNvdW50XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb2tlbW9uVGl0bGVDb250YWluZXIuYXBwZW5kKHBva2Vtb25UaXRsZSwgbGlrZUljb24sIGxpa2VzQ291bnQpOyAvLyBhcHBlbmQgbGlrZXMgY291bnQgdG8gY29udGFpbmVyXG5cbiAgICAvLyBCdXR0b25zIGFuZCBSZXNlcnZhdGlvbiBCdXR0b25zXG4gICAgY29uc3QgY29tbWVudEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbW1lbnRCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgIGNvbW1lbnRCdXR0b24uaWQgPSBgaWRQb2tlbW9uLSR7aW5kZXh9YDtcblxuICAgIHBva2Vtb25FbGVtZW50LmFwcGVuZChwb2tlbW9uSW1hZ2UsIHBva2Vtb25UaXRsZUNvbnRhaW5lciwgY29tbWVudEJ1dHRvbik7XG5cbiAgICBjb21tZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1JZCA9IGUudGFyZ2V0LmlkO1xuICAgICAgY29uc3QgcG9wVXAgPSBuZXcgQnVpbGRDb21tZW50UG9wVXAocG9rZW1vbiwgZGV0YWlscywgeyBpdGVtSWQgfSk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXAuZWxlbWVudC5yb290KTtcbiAgICAgIHBva2Vtb25MaXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsaWtlIGJ1dHRvblxuICAgIGxpa2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKGxpa2VJY29uLmNsYXNzTGlzdC5jb250YWlucygnZmFyJykpIHtcbiAgICAgICAgLy8gUG9zdCB0aGUgbGlrZSB0byB0aGUgQVBJXG4gICAgICAgIGF3YWl0IHBvc3RMaWtlKHBva2Vtb24ubmFtZSk7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgaWNvbiB0byBmaWxsZWRcbiAgICAgICAgbGlrZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFyJyk7XG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycpO1xuICAgICAgICAvLyBJbmNyZW1lbnQgdGhlIGxpa2VzIGNvdW50XG4gICAgICAgIGxpa2VzQ291bnQudGV4dENvbnRlbnQgPSBOdW1iZXIobGlrZXNDb3VudC50ZXh0Q29udGVudCkgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBpY29uIHRvIGVtcHR5XG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcycpO1xuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBQb2tlbW9uIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBET01cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHBva2Vtb25MaXN0LmFwcGVuZChwb2tlbW9uRWxlbWVudCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFdhaXQgZm9yIGFsbCB0aGUgUG9rZW1vbiB0byBiZSBhZGRlZCB0byB0aGUgRE9NXG4gIGF3YWl0IFByb21pc2UuYWxsKHBva2Vtb25Qcm9taXNlcyk7XG59XG5cbi8vIEV4cG9ydCBmdW5jdGlvbnNcbmV4cG9ydCB7IGdldFBva2Vtb25EYXRhLCBnZXRQb2tlbW9uRGV0YWlscywgZGlzcGxheVBva2Vtb24gfTtcbiIsImltcG9ydCB7IGdldFBva2Vtb25EYXRhIH0gZnJvbSAnLi9wb2tlbW9uLmpzJztcblxuY29uc3QgdXBkYXRlUG9rZW1vbkNvdW50ZXIgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBva2Vtb25Db3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bva2Vtb24tY291bnRlcicpO1xuICBpZiAocG9rZW1vbkNvdW50ZXIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0UG9rZW1vbkRhdGEoKTtcbiAgICBwb2tlbW9uQ291bnRlci50ZXh0Q29udGVudCA9IGRhdGEubGVuZ3RoO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVQb2tlbW9uQ291bnRlcjtcbiIsImNvbnN0IGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKTtcbiAgY29uc3QgcG9rZW1vbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9rZW1vbi1saXN0Jyk7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXInKTtcbiAgZm9vdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICBwb2tlbW9uTGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvbG9nby9wb2tlbW9uLWxvZ28ucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDQwMDswLDUwMDswLDYwMDswLDcwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgZm9udC1mYW1pbHk6ICdQcmVzcyBTdGFydCAyUCcsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMnZ3O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5ib2R5IHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogMCA0dnc7XG4gIG1hcmdpbjogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLm5hdmJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogOTB2dztcbiAgcGFkZGluZzogMCAxdnc7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmQxOGQ7XG4gIGhlaWdodDogNy41dnc7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTAwMDtcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcbiAgYm94LXNoYWRvdzpcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXG4gICAgM3B4IDNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcbn1cblxuLm1haW4ge1xuICBwYWRkaW5nLXRvcDogMTBweDsgIC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXG59XG5cbi5wb2tlbW9uLWl0ZW0gaW1nIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG4jcG9rZW1vbi1jb3VudGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcbn1cblxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xuICB3aWR0aDogMzV2dztcbn1cblxuLm5hdmJhciAubG9nbyBpbWcge1xuICBoZWlnaHQ6IDZ2dztcbn1cblxuLm5hdmJhciBuYXYgdWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4uY29tbWVudC1wb3AtdXAgbGkge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bCBsaSB7XG4gIHdpZHRoOiA0MCU7XG59XG5cbi5uYXZiYXIgbmF2IHVsIGxpIHtcbiAgbWFyZ2luOiAwIDF2dztcbn1cblxuLm5hdmJhciBuYXYgdWwgbGkgYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5cbi5saXN0cyBhOmhvdmVyIHtcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XG59XG5cbi5saXN0cyBhLmFjdGl2ZSB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubmF2YmFyIG5hdiB1bCBsaSBhOmhvdmVyIHtcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XG59XG5cbi5uYXZiYXIgbmF2IHVsIGxpIGEuYWN0aXZlIHtcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XG59XG5cbi5sb2dvIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIHdpZHRoOiA2dnc7XG4gIGhlaWdodDogNnZ3O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG59XG5cbi5oZWFkZXIge1xuICBoZWlnaHQ6IDZ2dztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuZm9vdGVyIHtcbiAgaGVpZ2h0OiA1dnc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XG4gIGJveC1zaGFkb3c6XG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XG4gIHBhZGRpbmc6IDAgMXZ3O1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IDEwMDA7XG59XG5cbi5mb290ZXIge1xuICBmb250LXNpemU6IDF2dztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogOTB2dztcbiAgcGFkZGluZzogMCAxdnc7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgaGVpZ2h0OiA1dnc7XG4gIGJvdHRvbTogMDtcbiAgei1pbmRleDogMTAwMDtcbn1cblxuLyogLS0tLS0tLS0tLSBQT0tFTU9OIExJU1QgLS0tLS0tLS0tLSAqL1xuXG4ucG9rZW1vbi1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luLXRvcDogMC4xdnc7XG4gIG1hcmdpbi1ib3R0b206IDV2dztcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nLXRvcDogNy41dnc7IC8qIEFkZGVkIHRvIGFjY291bnQgZm9yIHRoZSBuYXZiYXIgKi9cbn1cblxuLnBva2Vtb24taXRlbSB7XG4gIGZsZXgtYmFzaXM6IGNhbGMoMzAlIC0gMmVtKTtcbiAgbWFyZ2luOiAxZW07XG4gIHBhZGRpbmc6IDJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBoZWlnaHQ6IDUwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XG4gIGJveC1zaGFkb3c6XG4gICAgM3B4IDNweCAwIDJweCAjMDAwLFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNmZmYgaW5zZXQ7XG59XG5cbi5jb21tZW50LWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDFlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcbiAgYm94LXNoYWRvdzpcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXG4gICAgM3B4IDNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcbiAgdHJhbnNpdGlvbjogMC4zcztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jb21tZW50LWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjMGMwYzA7XG59XG5cbi5jb21tZW50LWJ1dHRvbjphY3RpdmUge1xuICBib3gtc2hhZG93OlxuICAgIC0zcHggLTNweCAwIDJweCAjMDAwLFxuICAgIDNweCAzcHggMCAycHggI2MwYzBjMCxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxuICAgIDNweCAzcHggNXB4IDRweCAjZmZmIGluc2V0O1xufVxuXG4uY29tbWVudC1idXR0b246YWN0aXZlLFxuLnJlc2VydmF0aW9uLWJ1dHRvbjphY3RpdmUge1xuICBib3JkZXItc3R5bGU6IGluc2V0O1xufVxuXG4ubGlrZS1pY29uIHtcbiAgZm9udC1zaXplOiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNHB4O1xuICByaWdodDogNTBweDtcbn1cblxuLmxpa2VzLWNvdW50IHtcbiAgZm9udC1zaXplOiAwLjVlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHg7IC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXG4gIHJpZ2h0OiAxMHB4OyAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xufVxuXG4udGl0bGUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXG5cbnNwYW4ge1xuICBmb250LXdlaWdodDogOTAwO1xufVxuXG4uY29tbWVudC1wb3AtdXAge1xuICB3aWR0aDogODAlO1xuICBtYXJnaW46IDF2aCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwYWRkaW5nOiAxdmggM3Z3O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDAuM3JlbSBzb2xpZCAjMDAwO1xuICBib3JkZXItcmFkaXVzOiAwLjlyZW07XG59XG5cbi5jb21tZW50LXBvcC11cCA+ICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4ueC1idXR0b24ge1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wb3AtdXAtYnV0dG9uczpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gIGNvbG9yOiAjZmZmO1xuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcbn1cblxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogMC41cztcbn1cblxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XG4gIG9wYWNpdHk6IDE7XG4gIHJpZ2h0OiAwLjVyZW07XG59XG5cbi5wb3AtdXAtYnV0dG9uczpmb2N1cyB7XG4gIGNvbG9yOiAjZjAwO1xufVxuXG4uY29tbWVudC1wb3AtdXAgaDIge1xuICBmb250LXNpemU6IDV2dztcbiAgbWFyZ2luOiAwLjVyZW07XG59XG5cbi5jb21tZW50LXBvcC11cCBoMyB7XG4gIGZvbnQtc2l6ZTogNHZoO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWw6bnRoLWNoaWxkKDEpIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuI2FiaWxpdGllcy1saXN0IGxpLFxuI3N0YXRzLWxpc3QgbGksXG4jZm9ybXMtbGlzdCBsaSxcbiN3ZWlnaHQtbGlzdCBsaSB7XG4gIGZvbnQtc2l6ZTogMC43cmVtO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG59XG5cbi5jb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI2NvbW1lbnRDb3VudCB7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbn1cblxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGgzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHJvdy1nYXA6IDEuM3ZoO1xufVxuXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dCxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhIHtcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzAwMDtcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xufVxuXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dDpob3Zlcixcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhOmhvdmVyIHtcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzJiMjgyODtcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xuICBiYWNrZ3JvdW5kOiAjZjlmN2Y3O1xufVxuXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBidXR0b24ge1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHBhZGRpbmc6IDAuMnJlbSAwLjVyZW07XG59XG5cbi5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0UseUNBQXlDO0VBQ3pDLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixXQUFXO0VBQ1gsY0FBYztFQUNkLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLE1BQU07RUFDTixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCOzs7O2dDQUk4QjtBQUNoQzs7QUFFQTtFQUNFLGlCQUFpQixHQUFHLDBDQUEwQztBQUNoRTs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VB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O0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBRUE7O0VBRUUseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTs7RUFFRSw0QkFBNEI7RUFDNUIscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuKiB7XFxuICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuYm9keSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMCA0dnc7XFxuICBtYXJnaW46IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG5cXG4ubmF2YmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogOTB2dztcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmQxOGQ7XFxuICBoZWlnaHQ6IDcuNXZ3O1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTAwMDtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICBib3gtc2hhZG93OlxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXG59XFxuXFxuLm1haW4ge1xcbiAgcGFkZGluZy10b3A6IDEwcHg7ICAvKiBBanVzdGEgZXN0ZSB2YWxvciBzZWfDum4gc2VhIG5lY2VzYXJpbyAqL1xcbn1cXG5cXG4ucG9rZW1vbi1pdGVtIGltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbiNwb2tlbW9uLWNvdW50ZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xcbiAgd2lkdGg6IDM1dnc7XFxufVxcblxcbi5uYXZiYXIgLmxvZ28gaW1nIHtcXG4gIGhlaWdodDogNnZ3O1xcbn1cXG5cXG4ubmF2YmFyIG5hdiB1bCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsIGxpIHtcXG4gIHdpZHRoOiA0MCU7XFxufVxcblxcbi5uYXZiYXIgbmF2IHVsIGxpIHtcXG4gIG1hcmdpbjogMCAxdnc7XFxufVxcblxcbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcblxcbi5saXN0cyBhOmhvdmVyIHtcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcbn1cXG5cXG4ubGlzdHMgYS5hY3RpdmUge1xcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxufVxcblxcbi5uYXZiYXIgbmF2IHVsIGxpIGE6aG92ZXIge1xcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxufVxcblxcbi5uYXZiYXIgbmF2IHVsIGxpIGEuYWN0aXZlIHtcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcbn1cXG5cXG4ubG9nbyB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vYXNzZXRzL2xvZ28vcG9rZW1vbi1sb2dvLnBuZycpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIHdpZHRoOiA2dnc7XFxuICBoZWlnaHQ6IDZ2dztcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBoZWlnaHQ6IDZ2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgaGVpZ2h0OiA1dnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICBib3gtc2hhZG93OlxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiAxMDAwO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG4gIGZvbnQtc2l6ZTogMXZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogOTB2dztcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNXZ3O1xcbiAgYm90dG9tOiAwO1xcbiAgei1pbmRleDogMTAwMDtcXG59XFxuXFxuLyogLS0tLS0tLS0tLSBQT0tFTU9OIExJU1QgLS0tLS0tLS0tLSAqL1xcblxcbi5wb2tlbW9uLWxpc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbi10b3A6IDAuMXZ3O1xcbiAgbWFyZ2luLWJvdHRvbTogNXZ3O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZy10b3A6IDcuNXZ3OyAvKiBBZGRlZCB0byBhY2NvdW50IGZvciB0aGUgbmF2YmFyICovXFxufVxcblxcbi5wb2tlbW9uLWl0ZW0ge1xcbiAgZmxleC1iYXNpczogY2FsYygzMCUgLSAyZW0pO1xcbiAgbWFyZ2luOiAxZW07XFxuICBwYWRkaW5nOiAyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXG4gIGJveC1zaGFkb3c6XFxuICAgIDNweCAzcHggMCAycHggIzAwMCxcXG4gICAgLTNweCAtM3B4IDAgMnB4ICNjMGMwYzAsXFxuICAgIDNweCAzcHggNXB4IDRweCAjYTlhOWE5IGluc2V0LFxcbiAgICAtM3B4IC0zcHggNXB4IDRweCAjZmZmIGluc2V0O1xcbn1cXG5cXG4uY29tbWVudC1idXR0b24ge1xcbiAgcGFkZGluZzogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICBib3gtc2hhZG93OlxcbiAgICAzcHggM3B4IDAgMnB4ICMwMDAsXFxuICAgIC0zcHggLTNweCAwIDJweCAjYzBjMGMwLFxcbiAgICAzcHggM3B4IDVweCA0cHggI2E5YTlhOSBpbnNldCxcXG4gICAgLTNweCAtM3B4IDVweCA0cHggI2ZmZiBpbnNldDtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5jb21tZW50LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzBjMGMwO1xcbn1cXG5cXG4uY29tbWVudC1idXR0b246YWN0aXZlIHtcXG4gIGJveC1zaGFkb3c6XFxuICAgIC0zcHggLTNweCAwIDJweCAjMDAwLFxcbiAgICAzcHggM3B4IDAgMnB4ICNjMGMwYzAsXFxuICAgIC0zcHggLTNweCA1cHggNHB4ICNhOWE5YTkgaW5zZXQsXFxuICAgIDNweCAzcHggNXB4IDRweCAjZmZmIGluc2V0O1xcbn1cXG5cXG4uY29tbWVudC1idXR0b246YWN0aXZlLFxcbi5yZXNlcnZhdGlvbi1idXR0b246YWN0aXZlIHtcXG4gIGJvcmRlci1zdHlsZTogaW5zZXQ7XFxufVxcblxcbi5saWtlLWljb24ge1xcbiAgZm9udC1zaXplOiAxZW07XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDE0cHg7XFxuICByaWdodDogNTBweDtcXG59XFxuXFxuLmxpa2VzLWNvdW50IHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwcHg7IC8qIEFqdXN0YSBlc3RlIHZhbG9yIHNlZ8O6biBzZWEgbmVjZXNhcmlvICovXFxuICByaWdodDogMTBweDsgLyogQWp1c3RhIGVzdGUgdmFsb3Igc2Vnw7puIHNlYSBuZWNlc2FyaW8gKi9cXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi8qIC0tLS0tLS0tLS0gQ09NTUVOVFMgUE9QIFVQIC0tLS0tLS0tLS0gKi9cXG5cXG5zcGFuIHtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxufVxcblxcbi5jb21tZW50LXBvcC11cCB7XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luOiAxdmggYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogMXZoIDN2dztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IDAuM3JlbSBzb2xpZCAjMDAwO1xcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi54LWJ1dHRvbiB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcXG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXI6OmFmdGVyIHtcXG4gIG9wYWNpdHk6IDE7XFxuICByaWdodDogMC41cmVtO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xcbiAgY29sb3I6ICNmMDA7XFxufVxcblxcbi5jb21tZW50LXBvcC11cCBoMiB7XFxuICBmb250LXNpemU6IDV2dztcXG4gIG1hcmdpbjogMC41cmVtO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAgaDMge1xcbiAgZm9udC1zaXplOiA0dmg7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWw6bnRoLWNoaWxkKDEpIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuI2FiaWxpdGllcy1saXN0IGxpLFxcbiNzdGF0cy1saXN0IGxpLFxcbiNmb3Jtcy1saXN0IGxpLFxcbiN3ZWlnaHQtbGlzdCBsaSB7XFxuICBmb250LXNpemU6IDAuN3JlbTtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jY29tbWVudENvdW50IHtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGgzIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICByb3ctZ2FwOiAxLjN2aDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQsXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWEge1xcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzAwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQ6aG92ZXIsXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWE6aG92ZXIge1xcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgIzJiMjgyODtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7XFxufVxcblxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjJyZW0gMC41cmVtO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5pbXBvcnQgeyBkaXNwbGF5UG9rZW1vbiB9IGZyb20gJy4vbW9kdWxlL3Bva2Vtb24uanMnO1xuaW1wb3J0IHVwZGF0ZVBva2Vtb25Db3VudGVyIGZyb20gJy4vbW9kdWxlL3Bva2Vtb25Db3VudGVyLmpzJztcblxuZGlzcGxheVBva2Vtb24oKS50aGVuKCgpID0+IHVwZGF0ZVBva2Vtb25Db3VudGVyKCkpO1xuIl0sIm5hbWVzIjpbIkNvbW1lbnQiLCJnZXRDb21tZW50IiwicG9zdENvbW1lbnQiLCJoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIiwiQnVpbGRDb21tZW50UG9wVXAiLCJjb25zdHJ1Y3RvciIsInBva2Vtb24iLCJkZXRhaWxzIiwiZmVhdHVyZXMiLCJlbGVtZW50Iiwicm9vdCIsImNyZWF0ZVJvb3QiLCJpbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJzcHJpdGVzIiwiZnJvbnRfZGVmYXVsdCIsInBva2Vtb25OYW1lIiwiaW5uZXJUZXh0IiwibmFtZSIsInBva2Vtb25BYmlsaXRpZXMiLCJhYmlsaXRpZXMiLCJhYmlsaXRpZXNMaXN0IiwiZm9yRWFjaCIsImFiaWxpdHkiLCJpdGVtQWJpbGl0eSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZm9ybUxpc3QiLCJwb2tlbW9uRm9ybSIsImZvcm1zIiwiZm9ybSIsIml0ZW1Gb3JtIiwic3RhdHNMaXN0IiwicG9rZW1vblN0YXRzIiwic3RhdHMiLCJzdGF0IiwiaXRlbVN0YXQiLCJiYXNlX3N0YXQiLCJ3ZWlnaHRMaXN0IiwiaXRlbVdlaWdodCIsIndlaWdodCIsImNvbW1lbnRMaXN0IiwibnVtYmVyT2ZDb21tZW50cyIsImdldENvbW1lbnRzIiwiaXRlbUlkIiwidXNlck5hbWUiLCJjb21tZW50Iiwic3VibWl0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwidHJpbSIsImNvbW1lbnRDb250ZW50Iiwic2F2ZUNvbW1lbnQiLCJyZXNldCIsInNldFRpbWVvdXQiLCJ4QnV0dG9uIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJib2R5IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2hpbGRyZW4iLCJtZXNzYWdlIiwiaWRQb2tlbW9uIiwicGFyZW50IiwiY291bnQiLCJjb21tZW50cyIsImxlbmd0aCIsIml0ZW1Db21tZW50IiwiaW5uZXJIVE1MIiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiZXJyb3IiLCJyZXNwb25zZSIsImZldGNoIiwiY2F0Y2giLCJFcnJvciIsImpzb24iLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJtc2ciLCJwb3N0TGlrZSIsInBva2Vtb25JZCIsInJlc3VsdCIsImdldExpa2VzIiwibGlrZXMiLCJvayIsInN0YXR1cyIsImdldCIsImNvbnRhaW5lciIsImdldFBva2Vtb25EYXRhIiwiZGF0YSIsInJlc3VsdHMiLCJnZXRQb2tlbW9uRGV0YWlscyIsInVybCIsImRpc3BsYXlQb2tlbW9uIiwicG9rZW1vbkxpc3QiLCJwb2tlbW9uRGF0YSIsImxpa2VzRGF0YSIsInBva2Vtb25Qcm9taXNlcyIsIm1hcCIsImluZGV4IiwicG9rZW1vbkVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwb2tlbW9uVGl0bGVDb250YWluZXIiLCJwb2tlbW9uVGl0bGUiLCJ0ZXh0Q29udGVudCIsInBva2Vtb25JbWFnZSIsImxpa2VJY29uIiwibGlrZXNDb3VudCIsImxpa2VPYmoiLCJmaW5kIiwib2JqIiwicmVtb3ZlIiwiYXBwZW5kIiwiY29tbWVudEJ1dHRvbiIsImlkIiwidGFyZ2V0IiwicG9wVXAiLCJjb250YWlucyIsIk51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwiYWxsIiwidXBkYXRlUG9rZW1vbkNvdW50ZXIiLCJwb2tlbW9uQ291bnRlciIsImdldEVsZW1lbnRCeUlkIiwiZm9vdGVyIiwiaGVhZGVyIiwidG9nZ2xlIiwidGhlbiJdLCJzb3VyY2VSb290IjoiIn0=
>>>>>>> 21f9391a6f59f14841180f70e9571af2c836a2b7
