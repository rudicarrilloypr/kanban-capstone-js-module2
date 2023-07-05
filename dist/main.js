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
/* harmony export */   postComment: () => (/* binding */ postComment)
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
  let count = 0;
  pokemonData.forEach(async pokemon => {
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
    commentButton.id = `idPokemon-${count}`;
    const reservationButton = document.createElement('button');
    reservationButton.textContent = 'Reservations';
    pokemonElement.append(pokemonImage, pokemonTitleContainer, commentButton, reservationButton);
    pokemonList.append(pokemonElement);
    count += 1;
    commentButton.addEventListener('click', e => {
      const itemId = e.target.id;
      const popUp = new _buildCommentPopUp_js__WEBPACK_IMPORTED_MODULE_0__["default"](pokemon, details, {
        itemId
      });
      container.appendChild(popUp.element.root);
      pokemonList.classList.add('hidden');
    });
  });
}

// Export functions


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
  font-family: 'Poppins', sans-serif;
  font-size: 2vw;
  font-weight: 600;
}

body {
  box-sizing: border-box;
  padding: 0 4vw;
  margin: 0;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  padding: 0 1vw;
  position: fixed;
  background-color: #fff;
  height: 7.5vw;
  top: 0;
  z-index: 1000;
}

.pokemon-item img {
  max-width: 100%;
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
  border: black solid 0.5vw;
  padding: 0 1vw;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  border: black solid 0.5vw;
  padding: 0 1vw;
  position: fixed;
  background-color: #fff;
  height: 5vw;
  bottom: 0;
  z-index: 1000;
}

/* ---------- POKEMON LIST ---------- */

.pokemon-list {
  display: flex;
  margin-top: 5vw;
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
  border: 1px solid black;
  text-align: center;
  box-sizing: border-box;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-between; /* Added to space out the elements */
}

.comment-button,
.reservation-button {
  margin: 0.5em 0;
}

.like-icon {
  font-size: 2em;
}

.title-container {
  display: flex;
  justify-content: space-between;
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
  border: 0.3rem solid black;
  border-radius: 0.9rem;
}

.comment-pop-up > * {
  box-sizing: border-box;
}

.x-button {
  position: fixed;
  align-self: flex-end;
  font-weight: 900;
  background: none;
  border-radius: 0.4rem;
  cursor: pointer;
}

.pop-up-buttons:hover {
  background-color: black;
  color: white;
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
  color: red;
}

.comment-pop-up-image-container {
  height: 45vh;
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
  border: 0.2rem solid black;
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
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAEA;EACE,kCAAkC;EAClC,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,sBAAsB;EACtB,cAAc;EACd,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,WAAW;EACX,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,aAAa;EACb,MAAM;EACN,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,yDAAuD;EACvD,4BAA4B;EAC5B,wBAAwB;EACxB,UAAU;EACV,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,WAAW;EACX,yBAAyB;EACzB,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,WAAW;EACX,SAAS;EACT,aAAa;AACf;;AAEA,uCAAuC;;AAEvC;EACE,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,6BAA6B;EAC7B,qBAAqB;EACrB,aAAa;EACb,kBAAkB,EAAE,oCAAoC;AAC1D;;AAEA;EACE,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,uBAAuB;EACvB,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,8BAA8B,EAAE,oCAAoC;AACtE;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,WAAW;AACb;;AAEA,0CAA0C;;AAE1C;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,mBAAmB;EACnB,0BAA0B;EAC1B,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,eAAe;AACjB;;AAEA;;;;EAIE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,cAAc;AAChB;;AAEA;;EAEE,0BAA0B;EAC1B,qBAAqB;AACvB;;AAEA;;EAEE,4BAA4B;EAC5B,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\r\n\r\n* {\r\n  font-family: 'Poppins', sans-serif;\r\n  font-size: 2vw;\r\n  font-weight: 600;\r\n}\r\n\r\nbody {\r\n  box-sizing: border-box;\r\n  padding: 0 4vw;\r\n  margin: 0;\r\n}\r\n\r\n.navbar {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 90vw;\r\n  padding: 0 1vw;\r\n  position: fixed;\r\n  background-color: #fff;\r\n  height: 7.5vw;\r\n  top: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n.pokemon-item img {\r\n  max-width: 100%;\r\n}\r\n\r\n.comment-pop-up div img {\r\n  width: 35vw;\r\n}\r\n\r\n.navbar .logo img {\r\n  height: 6vw;\r\n}\r\n\r\n.navbar nav ul {\r\n  display: flex;\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up li {\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up-details ul li {\r\n  width: 40%;\r\n}\r\n\r\n.navbar nav ul li {\r\n  margin: 0 1vw;\r\n}\r\n\r\n.navbar nav ul li a {\r\n  text-decoration: none;\r\n  color: inherit;\r\n}\r\n\r\n.lists a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.lists a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.logo {\r\n  background-image: url('./assets/logo/pokemon-logo.png');\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  width: 6vw;\r\n  height: 6vw;\r\n  background-position: center;\r\n}\r\n\r\n.header {\r\n  height: 6vw;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\nfooter {\r\n  height: 5vw;\r\n  display: flex;\r\n  align-items: center;\r\n  border: black solid 0.5vw;\r\n  padding: 0 1vw;\r\n}\r\n\r\n.footer {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  width: 90vw;\r\n  border: black solid 0.5vw;\r\n  padding: 0 1vw;\r\n  position: fixed;\r\n  background-color: #fff;\r\n  height: 5vw;\r\n  bottom: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n/* ---------- POKEMON LIST ---------- */\r\n\r\n.pokemon-list {\r\n  display: flex;\r\n  margin-top: 5vw;\r\n  margin-bottom: 5vw;\r\n  flex-wrap: wrap;\r\n  justify-content: space-around;\r\n  align-content: center;\r\n  height: 100vh;\r\n  padding-top: 7.5vw; /* Added to account for the navbar */\r\n}\r\n\r\n.pokemon-item {\r\n  flex-basis: calc(30% - 2em);\r\n  margin: 1em;\r\n  padding: 2em;\r\n  border: 1px solid black;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  height: 50vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  position: relative;\r\n  justify-content: space-between; /* Added to space out the elements */\r\n}\r\n\r\n.comment-button,\r\n.reservation-button {\r\n  margin: 0.5em 0;\r\n}\r\n\r\n.like-icon {\r\n  font-size: 2em;\r\n}\r\n\r\n.title-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n/* ---------- COMMENTS POP UP ---------- */\r\n\r\nspan {\r\n  font-weight: 900;\r\n}\r\n\r\n.comment-pop-up {\r\n  width: 80%;\r\n  margin: 1vh auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 1vh 3vw;\r\n  align-items: center;\r\n  border: 0.3rem solid black;\r\n  border-radius: 0.9rem;\r\n}\r\n\r\n.comment-pop-up > * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.x-button {\r\n  position: fixed;\r\n  align-self: flex-end;\r\n  font-weight: 900;\r\n  background: none;\r\n  border-radius: 0.4rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.pop-up-buttons:hover {\r\n  background-color: black;\r\n  color: white;\r\n  padding-right: 1rem;\r\n  padding-left: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons::after {\r\n  position: absolute;\r\n  opacity: 0;\r\n  transition: 0.5s;\r\n}\r\n\r\n.pop-up-buttons:hover::after {\r\n  opacity: 1;\r\n  right: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons:focus {\r\n  color: red;\r\n}\r\n\r\n.comment-pop-up-image-container {\r\n  height: 45vh;\r\n}\r\n\r\n.comment-pop-up h2 {\r\n  font-size: 5vw;\r\n  margin: 0.5rem;\r\n}\r\n\r\n.comment-pop-up h3 {\r\n  font-size: 4vh;\r\n  margin: 0 auto;\r\n}\r\n\r\n.comment-pop-up-details ul:nth-child(1) {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n#abilities-list li,\r\n#stats-list li,\r\n#forms-list li,\r\n#weight-list li {\r\n  font-size: 0.7rem;\r\n  width: fit-content;\r\n}\r\n\r\n.comment-pop-up-comments-number-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n#commentCount {\r\n  font-size: inherit;\r\n}\r\n\r\n.comment-pop-up_form_container h3 {\r\n  text-align: center;\r\n}\r\n\r\n.comment-pop-up_form_container form {\r\n  display: flex;\r\n  flex-direction: column;\r\n  row-gap: 1.3vh;\r\n}\r\n\r\n.comment-pop-up_form_container form input,\r\n.comment-pop-up_form_container form textarea {\r\n  border: 0.2rem solid black;\r\n  border-radius: 0.3rem;\r\n}\r\n\r\n.comment-pop-up_form_container form input:hover,\r\n.comment-pop-up_form_container form textarea:hover {\r\n  border: 0.2rem solid #2b2828;\r\n  border-radius: 0.3rem;\r\n  background: #f9f7f7;\r\n}\r\n\r\n.comment-pop-up_form_container form button {\r\n  width: fit-content;\r\n  padding: 0.2rem 0.5rem;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "1b7b1e6c0da30eea9e42.png";

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



// Ahora puedes usar la función displayPokemon en tu index.js
(0,_module_pokemon_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemon)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFtQztBQUMyQjtBQUNBO0FBRS9DLE1BQU1JLGlCQUFpQixDQUFDO0VBQ3JDQyxXQUFXQSxDQUFDQyxPQUFPLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFO0lBQ3RDTCw2REFBNEIsQ0FBQyxDQUFDO0lBRTlCLElBQUksQ0FBQ00sT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUNBLE9BQU8sQ0FBQ0MsSUFBSSxHQUFHTixpQkFBaUIsQ0FBQ08sVUFBVSxDQUFDLENBQUM7SUFFbEQsSUFBSSxDQUFDRixPQUFPLENBQUNHLEtBQUssR0FBRyxJQUFJLENBQUNILE9BQU8sQ0FBQ0MsSUFBSSxDQUFDRyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDdEUsSUFBSSxDQUFDSixPQUFPLENBQUNHLEtBQUssQ0FBQ0UsR0FBRyxHQUFHUCxPQUFPLENBQUNRLE9BQU8sQ0FBQ0MsYUFBYTtJQUV0RCxJQUFJLENBQUNQLE9BQU8sQ0FBQ1EsV0FBVyxHQUFHLElBQUksQ0FBQ1IsT0FBTyxDQUFDQyxJQUFJLENBQUNHLGFBQWEsQ0FBQyxlQUFlLENBQUM7SUFDM0UsSUFBSSxDQUFDSixPQUFPLENBQUNRLFdBQVcsQ0FBQ0MsU0FBUyxHQUFHWixPQUFPLENBQUNhLElBQUk7SUFFakQsTUFBTUMsZ0JBQWdCLEdBQUdiLE9BQU8sQ0FBQ2MsU0FBUztJQUMxQztJQUNBLElBQUksQ0FBQ1osT0FBTyxDQUFDYSxhQUFhLEdBQUcsSUFBSSxDQUFDYixPQUFPLENBQUNDLElBQUksQ0FBQ0csYUFBYSxDQUFDLGlCQUFpQixDQUFDO0lBQy9FTyxnQkFBZ0IsQ0FBQ0csT0FBTyxDQUFFQyxPQUFPLElBQUs7TUFDcEMsTUFBTUMsV0FBVyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUM7TUFDaERGLFdBQVcsQ0FBQ1AsU0FBUyxHQUFHTSxPQUFPLENBQUNBLE9BQU8sQ0FBQ0wsSUFBSTtNQUM1QyxJQUFJLENBQUNWLE9BQU8sQ0FBQ2EsYUFBYSxDQUFDTSxXQUFXLENBQUNILFdBQVcsQ0FBQztJQUNyRCxDQUFDLENBQUM7SUFDRjtJQUNBLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQ29CLFFBQVEsR0FBRyxJQUFJLENBQUNwQixPQUFPLENBQUNDLElBQUksQ0FBQ0csYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUN0RSxNQUFNaUIsV0FBVyxHQUFHdkIsT0FBTyxDQUFDd0IsS0FBSztJQUNqQ0QsV0FBVyxDQUFDUCxPQUFPLENBQUVTLElBQUksSUFBSztNQUM1QixNQUFNQyxRQUFRLEdBQUdQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQztNQUM3Q00sUUFBUSxDQUFDZixTQUFTLEdBQUdjLElBQUksQ0FBQ2IsSUFBSTtNQUM5QixJQUFJLENBQUNWLE9BQU8sQ0FBQ29CLFFBQVEsQ0FBQ0QsV0FBVyxDQUFDSyxRQUFRLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBQ0Y7SUFDQSxJQUFJLENBQUN4QixPQUFPLENBQUN5QixTQUFTLEdBQUcsSUFBSSxDQUFDekIsT0FBTyxDQUFDQyxJQUFJLENBQUNHLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDdkUsTUFBTXNCLFlBQVksR0FBRzVCLE9BQU8sQ0FBQzZCLEtBQUs7SUFDbENELFlBQVksQ0FBQ1osT0FBTyxDQUFFYyxJQUFJLElBQUs7TUFDN0IsTUFBTUMsUUFBUSxHQUFHWixRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUM7TUFDN0NXLFFBQVEsQ0FBQ3BCLFNBQVMsR0FBSSxHQUFFbUIsSUFBSSxDQUFDQSxJQUFJLENBQUNsQixJQUFLLE1BQUtrQixJQUFJLENBQUNFLFNBQVUsRUFBQztNQUM1RCxJQUFJLENBQUM5QixPQUFPLENBQUN5QixTQUFTLENBQUNOLFdBQVcsQ0FBQ1UsUUFBUSxDQUFDO0lBQzlDLENBQUMsQ0FBQzs7SUFFRjtJQUNBLElBQUksQ0FBQzdCLE9BQU8sQ0FBQytCLFVBQVUsR0FBRyxJQUFJLENBQUMvQixPQUFPLENBQUNDLElBQUksQ0FBQ0csYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUN6RSxNQUFNNEIsVUFBVSxHQUFHZixRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDL0NjLFVBQVUsQ0FBQ3ZCLFNBQVMsR0FBR1gsT0FBTyxDQUFDbUMsTUFBTTtJQUNyQyxJQUFJLENBQUNqQyxPQUFPLENBQUMrQixVQUFVLENBQUNaLFdBQVcsQ0FBQ2EsVUFBVSxDQUFDO0lBRS9DLElBQUksQ0FBQ2hDLE9BQU8sQ0FBQ2tDLFdBQVcsR0FBRyxJQUFJLENBQUNsQyxPQUFPLENBQUNDLElBQUksQ0FBQ0csYUFBYSxDQUFDLGVBQWUsQ0FBQztJQUMzRSxJQUFJLENBQUNKLE9BQU8sQ0FBQ21DLGdCQUFnQixHQUFHLElBQUksQ0FBQ25DLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDRyxhQUFhLENBQUMsZUFBZSxDQUFDO0lBQ2hGVCxpQkFBaUIsQ0FBQ3lDLFdBQVcsQ0FDM0JyQyxRQUFRLENBQUNzQyxNQUFNLEVBQ2YsSUFBSSxDQUFDckMsT0FBTyxDQUFDa0MsV0FBVyxFQUN4QixJQUFJLENBQUNsQyxPQUFPLENBQUNtQyxnQkFDZixDQUFDO0lBRUQsSUFBSSxDQUFDbkMsT0FBTyxDQUFDdUIsSUFBSSxHQUFHLElBQUksQ0FBQ3ZCLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDRyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQzNELElBQUksQ0FBQ0osT0FBTyxDQUFDc0MsUUFBUSxHQUFHLElBQUksQ0FBQ3RDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDRyxhQUFhLENBQUMsNEJBQTRCLENBQUM7SUFDckYsSUFBSSxDQUFDSixPQUFPLENBQUN1QyxPQUFPLEdBQUcsSUFBSSxDQUFDdkMsT0FBTyxDQUFDQyxJQUFJLENBQUNHLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQztJQUMxRixJQUFJLENBQUNKLE9BQU8sQ0FBQ3dDLFlBQVksR0FBRyxJQUFJLENBQUN4QyxPQUFPLENBQUNDLElBQUksQ0FBQ0csYUFBYSxDQUFDLHdCQUF3QixDQUFDO0lBQ3JGLElBQUksQ0FBQ0osT0FBTyxDQUFDd0MsWUFBWSxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLENBQUMsSUFBSztNQUN6REEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUNsQixNQUFNTCxRQUFRLEdBQUcsSUFBSSxDQUFDdEMsT0FBTyxDQUFDc0MsUUFBUSxDQUFDTSxLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQ25ELE1BQU1DLGNBQWMsR0FBRyxJQUFJLENBQUM5QyxPQUFPLENBQUN1QyxPQUFPLENBQUNLLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUM7TUFDeEQsTUFBTU4sT0FBTyxHQUFHLElBQUloRCxtREFBTyxDQUFDUSxRQUFRLENBQUNzQyxNQUFNLEVBQUVDLFFBQVEsRUFBRVEsY0FBYyxDQUFDO01BQ3RFbkQsaUJBQWlCLENBQUNvRCxXQUFXLENBQUNSLE9BQU8sQ0FBQztNQUN0QyxJQUFJLENBQUN2QyxPQUFPLENBQUNrQyxXQUFXLENBQUN6QixTQUFTLEdBQUcsRUFBRTtNQUN2QyxJQUFJLENBQUNULE9BQU8sQ0FBQ3VCLElBQUksQ0FBQ3lCLEtBQUssQ0FBQyxDQUFDO01BQ3pCQyxVQUFVLENBQUMsTUFBTTtRQUNmdEQsaUJBQWlCLENBQUN5QyxXQUFXLENBQzNCckMsUUFBUSxDQUFDc0MsTUFBTSxFQUNmLElBQUksQ0FBQ3JDLE9BQU8sQ0FBQ2tDLFdBQVcsRUFDeEIsSUFBSSxDQUFDbEMsT0FBTyxDQUFDbUMsZ0JBQ2YsQ0FBQztNQUNILENBQUMsRUFBRSxJQUFJLENBQUM7SUFDVixDQUFDLENBQUM7SUFFRixJQUFJLENBQUNuQyxPQUFPLENBQUNrRCxPQUFPLEdBQUcsSUFBSSxDQUFDbEQsT0FBTyxDQUFDQyxJQUFJLENBQUNHLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDbkUsSUFBSSxDQUFDSixPQUFPLENBQUNrRCxPQUFPLENBQUNULGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQ25ELElBQUksQ0FBQ3pDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDa0QsYUFBYSxDQUFDQyxXQUFXLENBQUMsSUFBSSxDQUFDcEQsT0FBTyxDQUFDQyxJQUFJLENBQUM7TUFDOURQLDZEQUE0QixDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0VBQ0o7RUFFRSxPQUFPUSxVQUFVLEdBQUdBLENBQUEsS0FBTTtJQUN4QixNQUFNbUQsS0FBSyxHQUFHcEMsUUFBUSxDQUFDcUMsV0FBVyxDQUFDLENBQUM7SUFDcENELEtBQUssQ0FBQ0UsVUFBVSxDQUFDdEMsUUFBUSxDQUFDdUMsSUFBSSxDQUFDO0lBQy9CLE9BQU9ILEtBQUssQ0FBQ0ksd0JBQXdCLENBQUU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdEIsQ0FBQztFQUVELE9BQU9YLFdBQVcsR0FBRyxNQUFPUixPQUFPLElBQUs7SUFDdEMsTUFBTW9CLE9BQU8sR0FBRyxNQUFNbEUsK0RBQVcsQ0FBQzhDLE9BQU8sQ0FBQztJQUMxQyxPQUFPb0IsT0FBTztFQUNoQixDQUFDO0VBRUQsT0FBT3ZCLFdBQVcsR0FBRyxNQUFBQSxDQUFPd0IsU0FBUyxFQUFFQyxNQUFNLEVBQUVDLEtBQUssS0FBSztJQUN2RCxJQUFJO01BQ0YsTUFBTUMsUUFBUSxHQUFHLE1BQU12RSw4REFBVSxDQUFDb0UsU0FBUyxDQUFDO01BQzVDRSxLQUFLLENBQUNyRCxTQUFTLEdBQUdzRCxRQUFRLENBQUNDLE1BQU07TUFDakNELFFBQVEsQ0FBQ2pELE9BQU8sQ0FBRXlCLE9BQU8sSUFBSztRQUM1QixNQUFNMEIsV0FBVyxHQUFHaEQsUUFBUSxDQUFDQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ2hEK0MsV0FBVyxDQUFDQyxTQUFTLEdBQUksR0FBRTNCLE9BQU8sQ0FBQzRCLGFBQWMsSUFBRzVCLE9BQU8sQ0FBQzZCLFFBQVMsTUFBSzdCLE9BQU8sQ0FBQ0EsT0FBUSxFQUFDO1FBQzNGc0IsTUFBTSxDQUFDMUMsV0FBVyxDQUFDOEMsV0FBVyxDQUFDO01BQ2pDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxPQUFPSSxLQUFLLEVBQUU7TUFDZFAsS0FBSyxDQUFDSSxTQUFTLEdBQUcsQ0FBQztNQUNuQkwsTUFBTSxDQUFDSyxTQUFTLEdBQUcsdUJBQXVCO0lBQzVDO0VBQ0YsQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7OztBQzNKZSxNQUFNM0UsT0FBTyxDQUFDO0VBQzNCSyxXQUFXQSxDQUFDeUMsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLE9BQU8sRUFBRTtJQUNyQyxJQUFJLENBQUNGLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNDLFFBQVEsR0FBR0EsUUFBUTtJQUN4QixJQUFJLENBQUNDLE9BQU8sR0FBR0EsT0FBTztFQUN4QjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7QUNOQSxNQUFNL0MsVUFBVSxHQUFHLE1BQU9vRSxTQUFTLElBQUs7RUFDdEMsTUFBTVUsUUFBUSxHQUFHLE1BQU1DLEtBQUssQ0FBRSxpSEFBZ0hYLFNBQVUsRUFBQyxDQUFDLENBQ3ZKWSxLQUFLLENBQUVILEtBQUssSUFBSyxJQUFJSSxLQUFLLENBQUNKLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLE1BQU1OLFFBQVEsR0FBRyxNQUFNTyxRQUFRLENBQUNJLElBQUksQ0FBQyxDQUFDO0VBQ3RDLE9BQU9YLFFBQVE7QUFDakIsQ0FBQztBQUVELE1BQU10RSxXQUFXLEdBQUcsTUFBTzhDLE9BQU8sSUFBSztFQUNyQyxNQUFNK0IsUUFBUSxHQUFHLE1BQU1DLEtBQUssQ0FBQyx1R0FBdUcsRUFBRTtJQUNwSUksTUFBTSxFQUFFLE1BQU07SUFDZG5CLElBQUksRUFBRW9CLElBQUksQ0FBQ0MsU0FBUyxDQUNsQjtNQUNFQyxPQUFPLEVBQUV2QyxPQUFPLENBQUNGLE1BQU07TUFDdkIrQixRQUFRLEVBQUU3QixPQUFPLENBQUNELFFBQVE7TUFDMUJDLE9BQU8sRUFBRUEsT0FBTyxDQUFDQTtJQUNuQixDQUNGLENBQUM7SUFDRHdDLE9BQU8sRUFBRTtNQUNQLGNBQWMsRUFBRTtJQUNsQjtFQUNGLENBQUMsQ0FBQyxDQUNDUCxLQUFLLENBQUVILEtBQUssSUFBSyxJQUFJSSxLQUFLLENBQUNKLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLE1BQU1XLEdBQUcsR0FBRyxNQUFNVixRQUFRO0VBQzFCLE9BQU9VLEdBQUc7QUFDWixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QnNEO0FBRXZELE1BQU1DLFNBQVMsR0FBR2hFLFFBQVEsQ0FBQ2IsYUFBYSxDQUFDLE9BQU8sQ0FBQzs7QUFFakQ7QUFDQSxlQUFlOEUsY0FBY0EsQ0FBQSxFQUFHO0VBQzlCLE1BQU1aLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUMsMkNBQTJDLENBQUM7RUFDekUsTUFBTVksSUFBSSxHQUFHLE1BQU1iLFFBQVEsQ0FBQ0ksSUFBSSxDQUFDLENBQUM7RUFDbEMsT0FBT1MsSUFBSSxDQUFDQyxPQUFPO0FBQ3JCOztBQUVBO0FBQ0EsZUFBZUMsaUJBQWlCQSxDQUFDQyxHQUFHLEVBQUU7RUFDcEMsTUFBTWhCLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUNlLEdBQUcsQ0FBQztFQUNqQyxNQUFNSCxJQUFJLEdBQUcsTUFBTWIsUUFBUSxDQUFDSSxJQUFJLENBQUMsQ0FBQztFQUNsQyxPQUFPUyxJQUFJO0FBQ2I7O0FBRUE7QUFDQSxlQUFlSSxjQUFjQSxDQUFBLEVBQUc7RUFDOUIsTUFBTUMsV0FBVyxHQUFHdkUsUUFBUSxDQUFDYixhQUFhLENBQUMsZUFBZSxDQUFDO0VBQzNELE1BQU1xRixXQUFXLEdBQUcsTUFBTVAsY0FBYyxDQUFDLENBQUM7RUFDMUMsSUFBSXBCLEtBQUssR0FBRyxDQUFDO0VBQ2IyQixXQUFXLENBQUMzRSxPQUFPLENBQUMsTUFBT2pCLE9BQU8sSUFBSztJQUNyQyxNQUFNQyxPQUFPLEdBQUcsTUFBTXVGLGlCQUFpQixDQUFDeEYsT0FBTyxDQUFDeUYsR0FBRyxDQUFDO0lBRXBELE1BQU1JLGNBQWMsR0FBR3pFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNwRHdFLGNBQWMsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBRTVDLE1BQU1DLHFCQUFxQixHQUFHNUUsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzNEMkUscUJBQXFCLENBQUNGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0lBRXRELE1BQU1FLFlBQVksR0FBRzdFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQztJQUNqRDRFLFlBQVksQ0FBQ0MsV0FBVyxHQUFHbEcsT0FBTyxDQUFDYSxJQUFJO0lBRXZDLE1BQU1zRixZQUFZLEdBQUcvRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDbEQ4RSxZQUFZLENBQUMzRixHQUFHLEdBQUdQLE9BQU8sQ0FBQ1EsT0FBTyxDQUFDQyxhQUFhOztJQUVoRDtJQUNBLE1BQU0wRixRQUFRLEdBQUdoRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDL0MrRSxRQUFRLENBQUNGLFdBQVcsR0FBRyxJQUFJO0lBQzNCRSxRQUFRLENBQUNOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUVuQ0MscUJBQXFCLENBQUNLLE1BQU0sQ0FBQ0osWUFBWSxFQUFFRyxRQUFRLENBQUM7O0lBRXBEO0lBQ0EsTUFBTUUsYUFBYSxHQUFHbEYsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3REaUYsYUFBYSxDQUFDSixXQUFXLEdBQUcsVUFBVTtJQUN0Q0ksYUFBYSxDQUFDQyxFQUFFLEdBQUksYUFBWXRDLEtBQU0sRUFBQztJQUN2QyxNQUFNdUMsaUJBQWlCLEdBQUdwRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDMURtRixpQkFBaUIsQ0FBQ04sV0FBVyxHQUFHLGNBQWM7SUFFOUNMLGNBQWMsQ0FBQ1EsTUFBTSxDQUFDRixZQUFZLEVBQUVILHFCQUFxQixFQUFFTSxhQUFhLEVBQUVFLGlCQUFpQixDQUFDO0lBQzVGYixXQUFXLENBQUNVLE1BQU0sQ0FBQ1IsY0FBYyxDQUFDO0lBQ2xDNUIsS0FBSyxJQUFJLENBQUM7SUFFVnFDLGFBQWEsQ0FBQzFELGdCQUFnQixDQUFDLE9BQU8sRUFBR0MsQ0FBQyxJQUFLO01BQzdDLE1BQU1MLE1BQU0sR0FBR0ssQ0FBQyxDQUFDNEQsTUFBTSxDQUFDRixFQUFFO01BQzFCLE1BQU1HLEtBQUssR0FBRyxJQUFJNUcsNkRBQWlCLENBQUNFLE9BQU8sRUFBRUMsT0FBTyxFQUFFO1FBQUV1QztNQUFPLENBQUMsQ0FBQztNQUNqRTRDLFNBQVMsQ0FBQzlELFdBQVcsQ0FBQ29GLEtBQUssQ0FBQ3ZHLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDO01BQ3pDdUYsV0FBVyxDQUFDRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0o7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQSxNQUFNbEcsNEJBQTRCLEdBQUdBLENBQUEsS0FBTTtFQUN6QyxNQUFNOEcsTUFBTSxHQUFHdkYsUUFBUSxDQUFDYixhQUFhLENBQUMsU0FBUyxDQUFDO0VBQ2hELE1BQU1vRixXQUFXLEdBQUd2RSxRQUFRLENBQUNiLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDM0QsTUFBTXFHLE1BQU0sR0FBR3hGLFFBQVEsQ0FBQ2IsYUFBYSxDQUFDLFNBQVMsQ0FBQztFQUNoRG9HLE1BQU0sQ0FBQ2IsU0FBUyxDQUFDZSxNQUFNLENBQUMsUUFBUSxDQUFDO0VBQ2pDbEIsV0FBVyxDQUFDRyxTQUFTLENBQUNlLE1BQU0sQ0FBQyxRQUFRLENBQUM7RUFDdENELE1BQU0sQ0FBQ2QsU0FBUyxDQUFDZSxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ25DLENBQUM7QUFFRCxpRUFBZWhILDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUM0M7QUFDMEc7QUFDakI7QUFDTztBQUNoRyw0Q0FBNEMseUlBQWlEO0FBQzdGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YsdUhBQXVILE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLG9CQUFvQjtBQUMvSyx5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxNQUFNLGFBQWEsTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLHdCQUF3QixPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLHlCQUF5QixPQUFPLE1BQU0sVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLGFBQWEsTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxRQUFRLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sTUFBTSxZQUFZLGFBQWEs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c3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvYnVpbGRDb21tZW50UG9wVXAuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL2NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL2ludm9sdmVtZW50QXBpLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9wb2tlbW9uLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS92aWV3RnVuY3Rpb25zLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWVudCBmcm9tICcuL2NvbW1lbnQuanMnO1xuaW1wb3J0IHsgZ2V0Q29tbWVudCwgcG9zdENvbW1lbnQgfSBmcm9tICcuL2ludm9sdmVtZW50QXBpLmpzJztcbmltcG9ydCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIGZyb20gJy4vdmlld0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1aWxkQ29tbWVudFBvcFVwIHtcbiAgY29uc3RydWN0b3IocG9rZW1vbiwgZGV0YWlscywgZmVhdHVyZXMpIHtcbiAgICBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyKCk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSB7fTtcbiAgICB0aGlzLmVsZW1lbnQucm9vdCA9IEJ1aWxkQ29tbWVudFBvcFVwLmNyZWF0ZVJvb3QoKTtcblxuICAgIHRoaXMuZWxlbWVudC5pbWFnZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZS1wb2tlbW9uJyk7XG4gICAgdGhpcy5lbGVtZW50LmltYWdlLnNyYyA9IGRldGFpbHMuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuXG4gICAgdGhpcy5lbGVtZW50LnBva2Vtb25OYW1lID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3Bva2Vtb24tbmFtZScpO1xuICAgIHRoaXMuZWxlbWVudC5wb2tlbW9uTmFtZS5pbm5lclRleHQgPSBwb2tlbW9uLm5hbWU7XG5cbiAgICBjb25zdCBwb2tlbW9uQWJpbGl0aWVzID0gZGV0YWlscy5hYmlsaXRpZXM7XG4gICAgLy8gYmVjYXVzZSB3ZSBkb24ndCBrbm93IHRoZSBleGFjdCBudW1iZXIgb2YgYWJpbGl0aWVzIG9mIGVhY2ggcG9rZW1vblxuICAgIHRoaXMuZWxlbWVudC5hYmlsaXRpZXNMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2FiaWxpdGllcy1saXN0Jyk7XG4gICAgcG9rZW1vbkFiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5KSA9PiB7XG4gICAgICBjb25zdCBpdGVtQWJpbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtQWJpbGl0eS5pbm5lclRleHQgPSBhYmlsaXR5LmFiaWxpdHkubmFtZTtcbiAgICAgIHRoaXMuZWxlbWVudC5hYmlsaXRpZXNMaXN0LmFwcGVuZENoaWxkKGl0ZW1BYmlsaXR5KTtcbiAgICB9KTtcbiAgICAvLyBmb3Jtc1xuICAgIHRoaXMuZWxlbWVudC5mb3JtTGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNmb3Jtcy1saXN0Jyk7XG4gICAgY29uc3QgcG9rZW1vbkZvcm0gPSBkZXRhaWxzLmZvcm1zO1xuICAgIHBva2Vtb25Gb3JtLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1Gb3JtLmlubmVyVGV4dCA9IGZvcm0ubmFtZTtcbiAgICAgIHRoaXMuZWxlbWVudC5mb3JtTGlzdC5hcHBlbmRDaGlsZChpdGVtRm9ybSk7XG4gICAgfSk7XG4gICAgLy8gc3RhdHNcbiAgICB0aGlzLmVsZW1lbnQuc3RhdHNMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3N0YXRzLWxpc3QnKTtcbiAgICBjb25zdCBwb2tlbW9uU3RhdHMgPSBkZXRhaWxzLnN0YXRzO1xuICAgIHBva2Vtb25TdGF0cy5mb3JFYWNoKChzdGF0KSA9PiB7XG4gICAgICBjb25zdCBpdGVtU3RhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtU3RhdC5pbm5lclRleHQgPSBgJHtzdGF0LnN0YXQubmFtZX0gOiAke3N0YXQuYmFzZV9zdGF0fWA7XG4gICAgICB0aGlzLmVsZW1lbnQuc3RhdHNMaXN0LmFwcGVuZENoaWxkKGl0ZW1TdGF0KTtcbiAgICB9KTtcblxuICAgIC8vIHdlaWdodFxuICAgIHRoaXMuZWxlbWVudC53ZWlnaHRMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3dlaWdodC1saXN0Jyk7XG4gICAgY29uc3QgaXRlbVdlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaXRlbVdlaWdodC5pbm5lclRleHQgPSBkZXRhaWxzLndlaWdodDtcbiAgICB0aGlzLmVsZW1lbnQud2VpZ2h0TGlzdC5hcHBlbmRDaGlsZChpdGVtV2VpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LWxpc3QnKTtcbiAgICB0aGlzLmVsZW1lbnQubnVtYmVyT2ZDb21tZW50cyA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50Q291bnQnKTtcbiAgICBCdWlsZENvbW1lbnRQb3BVcC5nZXRDb21tZW50cyhcbiAgICAgIGZlYXR1cmVzLml0ZW1JZCxcbiAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCxcbiAgICAgIHRoaXMuZWxlbWVudC5udW1iZXJPZkNvbW1lbnRzLFxuICAgICk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZm9ybSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgICB0aGlzLmVsZW1lbnQudXNlck5hbWUgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZScpO1xuICAgIHRoaXMuZWxlbWVudC5jb21tZW50ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnQnKTtcbiAgICB0aGlzLmVsZW1lbnQuc3VibWl0QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3N1Ym1pdCcpO1xuICAgIHRoaXMuZWxlbWVudC5zdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgdXNlck5hbWUgPSB0aGlzLmVsZW1lbnQudXNlck5hbWUudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgY29tbWVudENvbnRlbnQgPSB0aGlzLmVsZW1lbnQuY29tbWVudC52YWx1ZS50cmltKCk7XG4gICAgICBjb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnQoZmVhdHVyZXMuaXRlbUlkLCB1c2VyTmFtZSwgY29tbWVudENvbnRlbnQpO1xuICAgICAgQnVpbGRDb21tZW50UG9wVXAuc2F2ZUNvbW1lbnQoY29tbWVudCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QuaW5uZXJUZXh0ID0gJyc7XG4gICAgICB0aGlzLmVsZW1lbnQuZm9ybS5yZXNldCgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEJ1aWxkQ29tbWVudFBvcFVwLmdldENvbW1lbnRzKFxuICAgICAgICAgIGZlYXR1cmVzLml0ZW1JZCxcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QsXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm51bWJlck9mQ29tbWVudHMsXG4gICAgICAgICk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC54QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLngtYnV0dG9uJyk7XG4gICAgdGhpcy5lbGVtZW50LnhCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQucm9vdC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5yb290KTtcbiAgICAgIGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVJvb3QgPSAoKSA9PiB7XG4gICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICByYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgcmV0dXJuIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwieC1idXR0b24gcG9wLXVwLWJ1dHRvbnNcIj48aSBjbGFzcz1cImJpIGJpLXgtbGdcIj48L2k+PC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwicG9rZW1vbiBpbWFnZVwiIGlkID0gJ2ltYWdlLXBva2Vtb24nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGgyIGlkPSdwb2tlbW9uLW5hbWUnPjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1kZXRhaWxzXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5BYmlsaXRpZXM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSAnYWJpbGl0aWVzLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5Gb3Jtczwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9ICdmb3Jtcy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+U3RhdHM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSdzdGF0cy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+d2VpZ2h0PC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0gJ3dlaWdodC1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDMgPlxuICAgICAgICAgICAgICAgIENvbW1lbnRzICg8c3BhbiBpZD0nY29tbWVudENvdW50Jz48L3NwYW4+KVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDx1bCBpZCA9ICdjb21tZW50LWxpc3QnPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGgzPkFkZCBjb21tZW50PC9oMz5cbiAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIGNsYXNzPSdmb3JtJz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGlkPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGNsYXNzPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50XCIgaWQ9XCJjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50XCIgY29scz1cIjMwXCIgcm93cz1cIjEwXCIgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImNvbW1lbnQtcG9wLXVwX3N1Ym1pdFwiIGNsYXNzPVwicG9wLXVwLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgQ29tbWVudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgPC9kaXY+XG4gICAgICAgICAgICBgKS5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2F2ZUNvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHBvc3RDb21tZW50KGNvbW1lbnQpO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbW1lbnRzID0gYXN5bmMgKGlkUG9rZW1vbiwgcGFyZW50LCBjb3VudCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50KGlkUG9rZW1vbik7XG4gICAgICAgIGNvdW50LmlubmVyVGV4dCA9IGNvbW1lbnRzLmxlbmd0aDtcbiAgICAgICAgY29tbWVudHMuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1Db21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICBpdGVtQ29tbWVudC5pbm5lckhUTUwgPSBgJHtjb21tZW50LmNyZWF0aW9uX2RhdGV9ICR7Y29tbWVudC51c2VybmFtZX0gOiAke2NvbW1lbnQuY29tbWVudH1gO1xuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtQ29tbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY291bnQuaW5uZXJIVE1MID0gMDtcbiAgICAgICAgcGFyZW50LmlubmVySFRNTCA9ICc8cD5ObyBjb21tZW50IHlldDwvcD4nO1xuICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IHtcbiAgY29uc3RydWN0b3IoaXRlbUlkLCB1c2VyTmFtZSwgY29tbWVudCkge1xuICAgIHRoaXMuaXRlbUlkID0gaXRlbUlkO1xuICAgIHRoaXMudXNlck5hbWUgPSB1c2VyTmFtZTtcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50O1xuICB9XG59IiwiY29uc3QgZ2V0Q29tbWVudCA9IGFzeW5jIChpZFBva2Vtb24pID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvY29tbWVudHM/aXRlbV9pZD0ke2lkUG9rZW1vbn1gKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGNvbW1lbnRzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9jb21tZW50cycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcbiAgICAgIHtcbiAgICAgICAgaXRlbV9pZDogY29tbWVudC5pdGVtSWQsXG4gICAgICAgIHVzZXJuYW1lOiBjb21tZW50LnVzZXJOYW1lLFxuICAgICAgICBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsXG4gICAgICB9LFxuICAgICksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuICBjb25zdCBtc2cgPSBhd2FpdCByZXNwb25zZTtcbiAgcmV0dXJuIG1zZztcbn07XG5cbmV4cG9ydCB7IGdldENvbW1lbnQsIHBvc3RDb21tZW50IH07XG4iLCJpbXBvcnQgQnVpbGRDb21tZW50UG9wVXAgZnJvbSAnLi9idWlsZENvbW1lbnRQb3BVcC5qcyc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG5cbi8vIERhdGEgZnJvbSBBUElcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EYXRhKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9NicpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YS5yZXN1bHRzO1xufVxuXG4vLyBTcGVjaWZpYyBQb2tlbW9uIGRldGFpbHNcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EZXRhaWxzKHVybCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vLyBIVE1MIGVsZW1lbnRzIGZvciBlYWNoIFBva2Vtb25cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlQb2tlbW9uKCkge1xuICBjb25zdCBwb2tlbW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9uLWxpc3QnKTtcbiAgY29uc3QgcG9rZW1vbkRhdGEgPSBhd2FpdCBnZXRQb2tlbW9uRGF0YSgpO1xuICBsZXQgY291bnQgPSAwO1xuICBwb2tlbW9uRGF0YS5mb3JFYWNoKGFzeW5jIChwb2tlbW9uKSA9PiB7XG4gICAgY29uc3QgZGV0YWlscyA9IGF3YWl0IGdldFBva2Vtb25EZXRhaWxzKHBva2Vtb24udXJsKTtcblxuICAgIGNvbnN0IHBva2Vtb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9rZW1vbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncG9rZW1vbi1pdGVtJyk7XG5cbiAgICBjb25zdCBwb2tlbW9uVGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwb2tlbW9uVGl0bGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBwb2tlbW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHBva2Vtb25UaXRsZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcblxuICAgIGNvbnN0IHBva2Vtb25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHBva2Vtb25JbWFnZS5zcmMgPSBkZXRhaWxzLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcblxuICAgIC8vIExpa2UgQnV0dG9uXG4gICAgY29uc3QgbGlrZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGlrZUljb24udGV4dENvbnRlbnQgPSAn4p2k77iPJztcbiAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdsaWtlLWljb24nKTtcblxuICAgIHBva2Vtb25UaXRsZUNvbnRhaW5lci5hcHBlbmQocG9rZW1vblRpdGxlLCBsaWtlSWNvbik7XG5cbiAgICAvLyBCdXR0b25zIGFuZCBSZXNlcnZhdGlvbiBCdXR0b25zXG4gICAgY29uc3QgY29tbWVudEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbW1lbnRCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgIGNvbW1lbnRCdXR0b24uaWQgPSBgaWRQb2tlbW9uLSR7Y291bnR9YDtcbiAgICBjb25zdCByZXNlcnZhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHJlc2VydmF0aW9uQnV0dG9uLnRleHRDb250ZW50ID0gJ1Jlc2VydmF0aW9ucyc7XG5cbiAgICBwb2tlbW9uRWxlbWVudC5hcHBlbmQocG9rZW1vbkltYWdlLCBwb2tlbW9uVGl0bGVDb250YWluZXIsIGNvbW1lbnRCdXR0b24sIHJlc2VydmF0aW9uQnV0dG9uKTtcbiAgICBwb2tlbW9uTGlzdC5hcHBlbmQocG9rZW1vbkVsZW1lbnQpO1xuICAgIGNvdW50ICs9IDE7XG5cbiAgICBjb21tZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1JZCA9IGUudGFyZ2V0LmlkO1xuICAgICAgY29uc3QgcG9wVXAgPSBuZXcgQnVpbGRDb21tZW50UG9wVXAocG9rZW1vbiwgZGV0YWlscywgeyBpdGVtSWQgfSk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXAuZWxlbWVudC5yb290KTtcbiAgICAgIHBva2Vtb25MaXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gRXhwb3J0IGZ1bmN0aW9uc1xuZXhwb3J0IHsgZ2V0UG9rZW1vbkRhdGEsIGdldFBva2Vtb25EZXRhaWxzLCBkaXNwbGF5UG9rZW1vbiB9O1xuIiwiY29uc3QgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlciA9ICgpID0+IHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpO1xuICBjb25zdCBwb2tlbW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uLWxpc3QnKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpO1xuICBmb290ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gIHBva2Vtb25MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9sb2dvL3Bva2Vtb24tbG9nby5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAydnc7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBwYWRkaW5nOiAwIDR2dztcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5uYXZiYXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB3aWR0aDogOTB2dztcclxuICBwYWRkaW5nOiAwIDF2dztcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBoZWlnaHQ6IDcuNXZ3O1xyXG4gIHRvcDogMDtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4ucG9rZW1vbi1pdGVtIGltZyB7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgZGl2IGltZyB7XHJcbiAgd2lkdGg6IDM1dnc7XHJcbn1cclxuXHJcbi5uYXZiYXIgLmxvZ28gaW1nIHtcclxuICBoZWlnaHQ6IDZ2dztcclxufVxyXG5cclxuLm5hdmJhciBuYXYgdWwge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bCBsaSB7XHJcbiAgd2lkdGg6IDQwJTtcclxufVxyXG5cclxuLm5hdmJhciBuYXYgdWwgbGkge1xyXG4gIG1hcmdpbjogMCAxdnc7XHJcbn1cclxuXHJcbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogaW5oZXJpdDtcclxufVxyXG5cclxuLmxpc3RzIGE6aG92ZXIge1xyXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xyXG59XHJcblxyXG4ubGlzdHMgYS5hY3RpdmUge1xyXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCBsaSBhOmhvdmVyIHtcclxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcclxufVxyXG5cclxuLm5hdmJhciBuYXYgdWwgbGkgYS5hY3RpdmUge1xyXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xyXG59XHJcblxyXG4ubG9nbyB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xyXG4gIHdpZHRoOiA2dnc7XHJcbiAgaGVpZ2h0OiA2dnc7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBoZWlnaHQ6IDZ2dztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbmZvb3RlciB7XHJcbiAgaGVpZ2h0OiA1dnc7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMC41dnc7XHJcbiAgcGFkZGluZzogMCAxdnc7XHJcbn1cclxuXHJcbi5mb290ZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgd2lkdGg6IDkwdnc7XHJcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAwLjV2dztcclxuICBwYWRkaW5nOiAwIDF2dztcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBoZWlnaHQ6IDV2dztcclxuICBib3R0b206IDA7XHJcbiAgei1pbmRleDogMTAwMDtcclxufVxyXG5cclxuLyogLS0tLS0tLS0tLSBQT0tFTU9OIExJU1QgLS0tLS0tLS0tLSAqL1xyXG5cclxuLnBva2Vtb24tbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiA1dnc7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXZ3O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBwYWRkaW5nLXRvcDogNy41dnc7IC8qIEFkZGVkIHRvIGFjY291bnQgZm9yIHRoZSBuYXZiYXIgKi9cclxufVxyXG5cclxuLnBva2Vtb24taXRlbSB7XHJcbiAgZmxleC1iYXNpczogY2FsYygzMCUgLSAyZW0pO1xyXG4gIG1hcmdpbjogMWVtO1xyXG4gIHBhZGRpbmc6IDJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBoZWlnaHQ6IDUwdmg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgLyogQWRkZWQgdG8gc3BhY2Ugb3V0IHRoZSBlbGVtZW50cyAqL1xyXG59XHJcblxyXG4uY29tbWVudC1idXR0b24sXHJcbi5yZXNlcnZhdGlvbi1idXR0b24ge1xyXG4gIG1hcmdpbjogMC41ZW0gMDtcclxufVxyXG5cclxuLmxpa2UtaWNvbiB7XHJcbiAgZm9udC1zaXplOiAyZW07XHJcbn1cclxuXHJcbi50aXRsZS1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi8qIC0tLS0tLS0tLS0gQ09NTUVOVFMgUE9QIFVQIC0tLS0tLS0tLS0gKi9cclxuXHJcbnNwYW4ge1xyXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cCB7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBtYXJnaW46IDF2aCBhdXRvO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBwYWRkaW5nOiAxdmggM3Z3O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyOiAwLjNyZW0gc29saWQgYmxhY2s7XHJcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4ueC1idXR0b24ge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcclxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogMC41cztcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XHJcbiAgb3BhY2l0eTogMTtcclxuICByaWdodDogMC41cmVtO1xyXG59XHJcblxyXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cC1pbWFnZS1jb250YWluZXIge1xyXG4gIGhlaWdodDogNDV2aDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwIGgyIHtcclxuICBmb250LXNpemU6IDV2dztcclxuICBtYXJnaW46IDAuNXJlbTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwIGgzIHtcclxuICBmb250LXNpemU6IDR2aDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWw6bnRoLWNoaWxkKDEpIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuI2FiaWxpdGllcy1saXN0IGxpLFxyXG4jc3RhdHMtbGlzdCBsaSxcclxuI2Zvcm1zLWxpc3QgbGksXHJcbiN3ZWlnaHQtbGlzdCBsaSB7XHJcbiAgZm9udC1zaXplOiAwLjdyZW07XHJcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNjb21tZW50Q291bnQge1xyXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGgzIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgcm93LWdhcDogMS4zdmg7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0LFxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYSB7XHJcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgYmxhY2s7XHJcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dDpob3ZlcixcclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWE6aG92ZXIge1xyXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkICMyYjI4Mjg7XHJcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xyXG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGJ1dHRvbiB7XHJcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDAuMnJlbSAwLjVyZW07XHJcbn1cclxuXHJcbi5oaWRkZW4ge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFdBQVc7RUFDWCxjQUFjO0VBQ2QsZUFBZTtFQUNmLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsTUFBTTtFQUNOLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5REFBdUQ7RUFDdkQsNEJBQTRCO0VBQzVCLHdCQUF3QjtFQUN4QixVQUFVO0VBQ1YsV0FBVztFQUNYLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QjtFQUM5QixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBLHVDQUF1Qzs7QUFFdkM7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsNkJBQTZCO0VBQzdCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2Isa0JBQWtCLEVBQUUsb0NBQW9DO0FBQzFEOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLFdBQVc7RUFDWCxZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQiw4QkFBOEIsRUFBRSxvQ0FBb0M7QUFDdEU7O0FBRUE7O0VBRUUsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixXQUFXO0FBQ2I7O0FBRUEsMENBQTBDOztBQUUxQztFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUMxQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIscUJBQXFCO0VBQ3JCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QjtFQUM3QixlQUFlO0FBQ2pCOztBQUVBOzs7O0VBSUUsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCOztBQUVBOztFQUVFLDBCQUEwQjtFQUMxQixxQkFBcUI7QUFDdkI7O0FBRUE7O0VBRUUsNEJBQTRCO0VBQzVCLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwJmRpc3BsYXk9c3dhcCcpO1xcclxcblxcclxcbioge1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMCA0dnc7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgcGFkZGluZzogMCAxdnc7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbiAgaGVpZ2h0OiA3LjV2dztcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHotaW5kZXg6IDEwMDA7XFxyXFxufVxcclxcblxcclxcbi5wb2tlbW9uLWl0ZW0gaW1nIHtcXHJcXG4gIG1heC13aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xcclxcbiAgd2lkdGg6IDM1dnc7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgLmxvZ28gaW1nIHtcXHJcXG4gIGhlaWdodDogNnZ3O1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIG5hdiB1bCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsIGxpIHtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIHtcXHJcXG4gIG1hcmdpbjogMCAxdnc7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5saXN0cyBhOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcclxcbn1cXHJcXG5cXHJcXG4ubGlzdHMgYS5hY3RpdmUge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGE6aG92ZXIge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGEuYWN0aXZlIHtcXHJcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcclxcbn1cXHJcXG5cXHJcXG4ubG9nbyB7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vYXNzZXRzL2xvZ28vcG9rZW1vbi1sb2dvLnBuZycpO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXHJcXG4gIHdpZHRoOiA2dnc7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgaGVpZ2h0OiA1dnc7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMC41dnc7XFxyXFxuICBwYWRkaW5nOiAwIDF2dztcXHJcXG59XFxyXFxuXFxyXFxuLmZvb3RlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAwLjV2dztcXHJcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGhlaWdodDogNXZ3O1xcclxcbiAgYm90dG9tOiAwO1xcclxcbiAgei1pbmRleDogMTAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tLS0tLS0tLSBQT0tFTU9OIExJU1QgLS0tLS0tLS0tLSAqL1xcclxcblxcclxcbi5wb2tlbW9uLWxpc3Qge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIG1hcmdpbi10b3A6IDV2dztcXHJcXG4gIG1hcmdpbi1ib3R0b206IDV2dztcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHBhZGRpbmctdG9wOiA3LjV2dzsgLyogQWRkZWQgdG8gYWNjb3VudCBmb3IgdGhlIG5hdmJhciAqL1xcclxcbn1cXHJcXG5cXHJcXG4ucG9rZW1vbi1pdGVtIHtcXHJcXG4gIGZsZXgtYmFzaXM6IGNhbGMoMzAlIC0gMmVtKTtcXHJcXG4gIG1hcmdpbjogMWVtO1xcclxcbiAgcGFkZGluZzogMmVtO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgaGVpZ2h0OiA1MHZoO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWJ1dHRvbixcXHJcXG4ucmVzZXJ2YXRpb24tYnV0dG9uIHtcXHJcXG4gIG1hcmdpbjogMC41ZW0gMDtcXHJcXG59XFxyXFxuXFxyXFxuLmxpa2UtaWNvbiB7XFxyXFxuICBmb250LXNpemU6IDJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuc3BhbiB7XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAge1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIG1hcmdpbjogMXZoIGF1dG87XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHBhZGRpbmc6IDF2aCAzdnc7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYm9yZGVyOiAwLjNyZW0gc29saWQgYmxhY2s7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjlyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cCA+ICoge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLngtYnV0dG9uIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcclxcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXHJcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjRyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5wb3AtdXAtYnV0dG9uczpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmctcmlnaHQ6IDFyZW07XFxyXFxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBvcGFjaXR5OiAwO1xcclxcbiAgdHJhbnNpdGlvbjogMC41cztcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XFxyXFxuICBvcGFjaXR5OiAxO1xcclxcbiAgcmlnaHQ6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcC11cC1idXR0b25zOmZvY3VzIHtcXHJcXG4gIGNvbG9yOiByZWQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1pbWFnZS1jb250YWluZXIge1xcclxcbiAgaGVpZ2h0OiA0NXZoO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgaDIge1xcclxcbiAgZm9udC1zaXplOiA1dnc7XFxyXFxuICBtYXJnaW46IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGgzIHtcXHJcXG4gIGZvbnQtc2l6ZTogNHZoO1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsOm50aC1jaGlsZCgxKSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbiNhYmlsaXRpZXMtbGlzdCBsaSxcXHJcXG4jc3RhdHMtbGlzdCBsaSxcXHJcXG4jZm9ybXMtbGlzdCBsaSxcXHJcXG4jd2VpZ2h0LWxpc3QgbGkge1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbW1lbnRDb3VudCB7XFxyXFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcm93LWdhcDogMS4zdmg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0LFxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhIHtcXHJcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIGJsYWNrO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dDpob3ZlcixcXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYTpob3ZlciB7XFxyXFxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcclxcbiAgYmFja2dyb3VuZDogI2Y5ZjdmNztcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gYnV0dG9uIHtcXHJcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXHJcXG4gIHBhZGRpbmc6IDAuMnJlbSAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5oaWRkZW4ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCB7IGRpc3BsYXlQb2tlbW9uIH0gZnJvbSAnLi9tb2R1bGUvcG9rZW1vbi5qcyc7XG5cbi8vIEFob3JhIHB1ZWRlcyB1c2FyIGxhIGZ1bmNpw7NuIGRpc3BsYXlQb2tlbW9uIGVuIHR1IGluZGV4LmpzXG5kaXNwbGF5UG9rZW1vbigpO1xuIl0sIm5hbWVzIjpbIkNvbW1lbnQiLCJnZXRDb21tZW50IiwicG9zdENvbW1lbnQiLCJoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIiwiQnVpbGRDb21tZW50UG9wVXAiLCJjb25zdHJ1Y3RvciIsInBva2Vtb24iLCJkZXRhaWxzIiwiZmVhdHVyZXMiLCJlbGVtZW50Iiwicm9vdCIsImNyZWF0ZVJvb3QiLCJpbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJzcHJpdGVzIiwiZnJvbnRfZGVmYXVsdCIsInBva2Vtb25OYW1lIiwiaW5uZXJUZXh0IiwibmFtZSIsInBva2Vtb25BYmlsaXRpZXMiLCJhYmlsaXRpZXMiLCJhYmlsaXRpZXNMaXN0IiwiZm9yRWFjaCIsImFiaWxpdHkiLCJpdGVtQWJpbGl0eSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZm9ybUxpc3QiLCJwb2tlbW9uRm9ybSIsImZvcm1zIiwiZm9ybSIsIml0ZW1Gb3JtIiwic3RhdHNMaXN0IiwicG9rZW1vblN0YXRzIiwic3RhdHMiLCJzdGF0IiwiaXRlbVN0YXQiLCJiYXNlX3N0YXQiLCJ3ZWlnaHRMaXN0IiwiaXRlbVdlaWdodCIsIndlaWdodCIsImNvbW1lbnRMaXN0IiwibnVtYmVyT2ZDb21tZW50cyIsImdldENvbW1lbnRzIiwiaXRlbUlkIiwidXNlck5hbWUiLCJjb21tZW50Iiwic3VibWl0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwidHJpbSIsImNvbW1lbnRDb250ZW50Iiwic2F2ZUNvbW1lbnQiLCJyZXNldCIsInNldFRpbWVvdXQiLCJ4QnV0dG9uIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJib2R5IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2hpbGRyZW4iLCJtZXNzYWdlIiwiaWRQb2tlbW9uIiwicGFyZW50IiwiY291bnQiLCJjb21tZW50cyIsImxlbmd0aCIsIml0ZW1Db21tZW50IiwiaW5uZXJIVE1MIiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiZXJyb3IiLCJyZXNwb25zZSIsImZldGNoIiwiY2F0Y2giLCJFcnJvciIsImpzb24iLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJtc2ciLCJjb250YWluZXIiLCJnZXRQb2tlbW9uRGF0YSIsImRhdGEiLCJyZXN1bHRzIiwiZ2V0UG9rZW1vbkRldGFpbHMiLCJ1cmwiLCJkaXNwbGF5UG9rZW1vbiIsInBva2Vtb25MaXN0IiwicG9rZW1vbkRhdGEiLCJwb2tlbW9uRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInBva2Vtb25UaXRsZUNvbnRhaW5lciIsInBva2Vtb25UaXRsZSIsInRleHRDb250ZW50IiwicG9rZW1vbkltYWdlIiwibGlrZUljb24iLCJhcHBlbmQiLCJjb21tZW50QnV0dG9uIiwiaWQiLCJyZXNlcnZhdGlvbkJ1dHRvbiIsInRhcmdldCIsInBvcFVwIiwiZm9vdGVyIiwiaGVhZGVyIiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==