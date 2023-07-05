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


const buildCommentPop = () => {
  const commentPopUp = document.createElement("div");
  commentPopUp.classList.add("comment-pop-up");
  const xButton = document.createElement('button');
  xButton.classList.add('x-button pop-up-buttons');
  xButton.innerHTML = '<i class="bi bi-x-lg"></i>';
  const imageContainer = document.createElement('di');
  imageContainer.classList.add('comment-pop-up-image-container');
  const image = document.createElement('img');
  image.alt = 'pokemon image';
  image.src = '';
  imageContainer.append(image);
  const pokemonName = document.createElement('h2');
  pokemonName.innerText = '';
  const pokemonDetails = document.createElement('div');
  pokemonDetails.classList.add("comment-pop-up-details");
  const listOfDetails = document.createElement('ul');
  const itemDetail = {};
  for (let i = 0; i++; i < 4) {
    const arrDetails = ['Abilities', 'Forms', 'Stats', 'weight'];
    itemDetail[i] = document.createElement('li');
    itemDetail[i].innerHTML = `${arrDetails[i]} :`;
    listOfDetails.append(itemDetail[i]);
  }
  const commentsBox = document.createElement('div');
  commentsBox.classList.add('comment-pop-up-comments-number-container');
  const commentTitle = document.createElement('h3');
  commentTitle.innerText = `Comments ()`;
  const listOfComments = document.createElement('ul');
  const itemComment = {};
  for (let i = 0; i++; i < 4) {
    const arrDetails = {
      date: '01/02/2023',
      name: ' Mark',
      comment: 'Good best'
    };
    itemComment[i] = document.createElement('li');
    itemComment[i].innerHTML = `${arrDetails.date}, ${arrDetails.name} : ${arrDetails.comment}`;
    listOfComments.append(itemComment[i]);
  }
  commentsBox.appendChild(commentTitle);
  commentsBox.appendChild(listOfComments);
  const formContainer = document.createElement('div');
  const formTitle = document.createElement('h3');
  formTitle.innerText = "Add comment";
  const commentForm = document.createElement('form');
  const inputNameComment = document.createElement('input');
  inputNameComment.type = 'text';
  inputNameComment.placeholder = 'Your name';
  inputNameComment.setAttribute('required', true);
  inputNameComment.id = 'comment-pop-up_input_name';
  const textareaContentComment = document.createElement('textarea');
  textareaContentComment.id = 'comment-pop-up_textarea_content';
  textareaContentComment.cols = 30;
  textareaContentComment.rows = 10;
  textareaContentComment.placeholder = 'Your insights';
  const submitCommentButton = document.createElement('button');
  submitCommentButton.type = 'submit';
  submitCommentButton.id = 'comment-pop-up_submit';
  submitCommentButton.classList.add('pop-up-buttons');
  submitCommentButton.innerText = 'comment';
};
class BuildCommentPopUp {
  constructor(pokemon, details, features) {
    this.element = {};
    this.element.root = BuildCommentPopUp.createRoot();
    this.element.image = this.element.root.querySelector('#image-pokemon');
    this.element.image.src = details.sprites.front_default;
    this.element.pokemonName = this.element.root.querySelector('#pokemon-name');
    this.element.pokemonName = pokemon.name;
    //this contains a collection on <li class="item-detail">
    const pokemonFeatures = this.element.root.getElementsByClassName("item-detail");
    const pokemonAbilities = details.abilities;
    //because we don't know the exact number of abilities of each pokemon
    const arrAbilities = [];
    pokemonAbilities.forEach(ability => {
      arrAbilities.push(ability.ability.name);
    });
    pokemonFeatures[0].innerText += " " + arrAbilities.join(', ');
    //forms
    const pokemonForm = details.forms;
    const arrForms = [];
    pokemonForm.forEach(form => {
      arrForms.push(form.name);
    });
    pokemonFeatures[1].innerText += " " + arrForms.join(', ');
    //stats
    const pokemonStats = details.stats;
    const arrStat = [];
    pokemonStats.forEach(stat => {
      const objStats = {};
      objStats.name = stat.stat.name;
      objStats.score = stat.base_stat;
      arrStat.push(objStats);
    });
    arrStat.forEach(elt => {
      pokemonFeatures[2].innerText += ` ${elt.name} : ${elt.score}, `;
    });
    //weight
    const pokemonWeight = details.weight;
    pokemonFeatures[3].innerText += ` ${pokemonWeight}`;
    this.element.commentList = this.element.root.querySelector('.comment-list');
    BuildCommentPopUp.getComments(features.itemId, this.element.commentList);
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
      form.reset();
    });
    console.log();
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
                <li class = 'item-detail'>Abilities :</li>
                <li class = 'item-detail'>Forms :</li>
                <li class = 'item-detail'>Stats :</li>
                <li class = 'item-detail'>weight :</li>
            </ul>
        </div>
        <div class="comment-pop-up-comments-number-container">
            <h3 >
                Comments (2)
            </h3>
            <ul class = 'comment-list'>
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
  };
  static getComments = async idPokemon => {
    const comments = await (0,_involvementApi_js__WEBPACK_IMPORTED_MODULE_1__.getComment)(idPokemon, container);
    comments.forEach(comment => {
      const itemComment = document.createElement('li');
      itemComment.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
      container.appendChild(itemComment);
    });
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
  constructor(item_id, username, comment) {
    this.item_id = item_id;
    this.username = username;
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
    body: JSON.stringify(comment),
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

const container = document.querySelector(".main");

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
        itemId: itemId
      });
      container.appendChild(popUp.element.root);
      pokemonList.classList.add('hidden');
    });
  });
}

// Export fuctions


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

.navbar .logo img {
  height: 6vw;
}

.navbar nav ul {
  display: flex;
  list-style: none;
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
.hidden {
  display: none;
}

li {
  list-style: none;
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
  height: 60vh;
}

.comment-pop-up-details {
  height: 25vh;
}

.comment-pop-up div img {
  width: 35vw;
}

.comment-pop-up h2 {
  font-size: 4vw;
}

.comment-pop-up-details ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  column-gap: 0.1rem;
  padding: 0;
}

.comment-pop-up-details ul li {
  width: 40%;
}

.comment-pop-up-comments-number-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.comment-pop-up_form_container form textarea
 {
  border: 0.2rem solid black;
  border-radius: 0.3rem;
}

.comment-pop-up_form_container form input:hover,
.comment-pop-up_form_container form textarea:hover
 {
  border: 0.2rem solid #2b2828;
  border-radius: 0.3rem;
  background: #f9f7f7;  
}

.comment-pop-up_form_container form button {
  width: fit-content;
  padding: 0.2rem 0.5rem;
}`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\r\n\r\n* {\r\n  font-family: 'Poppins', sans-serif;\r\n  font-size: 2vw;\r\n  font-weight: 600;\r\n}\r\n\r\nbody {\r\n  box-sizing: border-box;\r\n  padding: 0 4vw;\r\n  margin: 0;\r\n}\r\n\r\n.navbar {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 90vw;\r\n  padding: 0 1vw;\r\n  position: fixed;\r\n  background-color: #fff;\r\n  height: 7.5vw;\r\n  top: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n.pokemon-item img {\r\n  max-width: 100%;\r\n}\r\n\r\n.navbar .logo img {\r\n  height: 6vw;\r\n}\r\n\r\n.navbar nav ul {\r\n  display: flex;\r\n  list-style: none;\r\n}\r\n\r\n.navbar nav ul li {\r\n  margin: 0 1vw;\r\n}\r\n\r\n.navbar nav ul li a {\r\n  text-decoration: none;\r\n  color: inherit;\r\n}\r\n\r\n.lists a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.lists a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a:hover {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.navbar nav ul li a.active {\r\n  color: rgb(36, 94, 180);\r\n}\r\n\r\n.logo {\r\n  background-image: url('./assets/logo/pokemon-logo.png');\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  width: 6vw;\r\n  height: 6vw;\r\n  background-position: center;\r\n}\r\n\r\n.header {\r\n  height: 6vw;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\nfooter {\r\n  height: 5vw;\r\n  display: flex;\r\n  align-items: center;\r\n  border: black solid 0.5vw;\r\n  padding: 0 1vw;\r\n}\r\n\r\n.footer {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  width: 90vw;\r\n  border: black solid 0.5vw;\r\n  padding: 0 1vw;\r\n  position: fixed;\r\n  background-color: #fff;\r\n  height: 5vw;\r\n  bottom: 0;\r\n  z-index: 1000;\r\n}\r\n\r\n/* ---------- POKEMON LIST ---------- */\r\n\r\n.pokemon-list {\r\n  display: flex;\r\n  margin-top: 5vw;\r\n  margin-bottom: 5vw;\r\n  flex-wrap: wrap;\r\n  justify-content: space-around;\r\n  align-content: center;\r\n  height: 100vh;\r\n  padding-top: 7.5vw; /* Added to account for the navbar */\r\n}\r\n\r\n.pokemon-item {\r\n  flex-basis: calc(30% - 2em);\r\n  margin: 1em;\r\n  padding: 2em;\r\n  border: 1px solid black;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  height: 50vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  position: relative;\r\n  justify-content: space-between; /* Added to space out the elements */\r\n}\r\n\r\n.comment-button,\r\n.reservation-button {\r\n  margin: 0.5em 0;\r\n}\r\n\r\n.like-icon {\r\n  font-size: 2em;\r\n}\r\n\r\n.title-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n/* ---------- COMMENTS POP UP ---------- */\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\n.comment-pop-up { \r\n  width: 80%;\r\n  margin: 1vh auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 1vh 3vw;\r\n  align-items: center;\r\n  border: 0.3rem solid black;\r\n  border-radius: 0.9rem;\r\n}\r\n\r\n.comment-pop-up > * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.x-button {\r\n  position: fixed;\r\n  align-self: flex-end;\r\n  font-weight: 900;\r\n  background: none;\r\n  border-radius: 0.4rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.pop-up-buttons:hover {\r\n  background-color: black;\r\n  color: white;\r\n  padding-right: 1rem;\r\n  padding-left: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons::after {\r\n  position: absolute;\r\n  opacity: 0;\r\n  transition: 0.5s;\r\n}\r\n\r\n.pop-up-buttons:hover::after {\r\n  opacity: 1;\r\n  right: 0.5rem;\r\n}\r\n\r\n.pop-up-buttons:focus {\r\n  color: red;\r\n}\r\n\r\n.comment-pop-up-image-container {\r\n  height: 60vh;\r\n}\r\n\r\n.comment-pop-up-details {\r\n  height: 25vh;\r\n}\r\n\r\n.comment-pop-up div img {\r\n  width: 35vw;\r\n}\r\n\r\n.comment-pop-up h2 {\r\n  font-size: 4vw;\r\n}\r\n\r\n.comment-pop-up-details ul {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  flex-wrap: wrap;\r\n  column-gap: 0.1rem;\r\n  padding: 0;\r\n}\r\n\r\n.comment-pop-up-details ul li {\r\n  width: 40%;\r\n}\r\n\r\n.comment-pop-up-comments-number-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.comment-pop-up_form_container h3 {\r\n  text-align: center;\r\n}\r\n\r\n.comment-pop-up_form_container form {\r\n  display: flex;\r\n  flex-direction: column;\r\n  row-gap: 1.3vh;\r\n}\r\n\r\n.comment-pop-up_form_container form input,\r\n.comment-pop-up_form_container form textarea\r\n {\r\n  border: 0.2rem solid black;\r\n  border-radius: 0.3rem;\r\n}\r\n\r\n.comment-pop-up_form_container form input:hover,\r\n.comment-pop-up_form_container form textarea:hover\r\n {\r\n  border: 0.2rem solid #2b2828;\r\n  border-radius: 0.3rem;\r\n  background: #f9f7f7;  \r\n}\r\n\r\n.comment-pop-up_form_container form button {\r\n  width: fit-content;\r\n  padding: 0.2rem 0.5rem;\r\n}"],"sourceRoot":""}]);
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



// Ahora puedes usar la función displayPokemon en tu index.js
(0,_module_pokemon_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemon)();
// const abil = new BuildCommentPopUp()
// const con = document.getElementById('test')
// con.appendChild(abil.element.root)

//const app = await postComment()
// const tel =await getComment("idPokemon-4")
// console.log(tel)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsTUFBTSxhQUFhLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSx5QkFBeUIsT0FBTyxNQUFNLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxZQUFZLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFN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V0NyQkE7Ozs7Ozs7Ozs7Ozs7QUNBcUI7QUFDZ0M7O0FBR3JEO0FBQ0FpSCxrRUFBYyxDQUFDLENBQUM7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQiIsInNvdXJjZXMiOlsid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS9idWlsZENvbW1lbnRQb3BVcC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvY29tbWVudC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvaW52b2x2ZW1lbnRBcGkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tZW50IGZyb20gXCIuL2NvbW1lbnQuanNcIlxyXG5pbXBvcnQgeyBnZXRDb21tZW50LCBwb3N0Q29tbWVudCB9IGZyb20gXCIuL2ludm9sdmVtZW50QXBpLmpzXCJcclxuY29uc3QgYnVpbGRDb21tZW50UG9wID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29tbWVudFBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgY29tbWVudFBvcFVwLmNsYXNzTGlzdC5hZGQoXCJjb21tZW50LXBvcC11cFwiKVxyXG5cclxuICAgIGNvbnN0IHhCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG4gICAgeEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd4LWJ1dHRvbiBwb3AtdXAtYnV0dG9ucycpXHJcbiAgICB4QnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImJpIGJpLXgtbGdcIj48L2k+J1xyXG5cclxuICAgIGNvbnN0IGltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGknKVxyXG4gICAgaW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1wb3AtdXAtaW1hZ2UtY29udGFpbmVyJylcclxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgIGltYWdlLmFsdCA9ICdwb2tlbW9uIGltYWdlJ1xyXG4gICAgaW1hZ2Uuc3JjID0gJydcclxuICAgIGltYWdlQ29udGFpbmVyLmFwcGVuZChpbWFnZSlcclxuXHJcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcclxuICAgIHBva2Vtb25OYW1lLmlubmVyVGV4dCA9ICcnXHJcblxyXG4gICAgY29uc3QgcG9rZW1vbkRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgcG9rZW1vbkRldGFpbHMuY2xhc3NMaXN0LmFkZChcImNvbW1lbnQtcG9wLXVwLWRldGFpbHNcIilcclxuICAgIGNvbnN0IGxpc3RPZkRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXHJcbiAgICBjb25zdCBpdGVtRGV0YWlsID0ge31cclxuICAgIGZvcihsZXQgaSA9IDA7IGkrKztpPDQpIHtcclxuICAgICAgICBjb25zdCBhcnJEZXRhaWxzID0gWydBYmlsaXRpZXMnLCdGb3JtcycsJ1N0YXRzJywnd2VpZ2h0J11cclxuICAgICAgICBpdGVtRGV0YWlsW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxyXG4gICAgICAgIGl0ZW1EZXRhaWxbaV0uaW5uZXJIVE1MID0gYCR7YXJyRGV0YWlsc1tpXX0gOmBcclxuICAgICAgICBsaXN0T2ZEZXRhaWxzLmFwcGVuZChpdGVtRGV0YWlsW2ldKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbW1lbnRzQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGNvbW1lbnRzQm94LmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtcG9wLXVwLWNvbW1lbnRzLW51bWJlci1jb250YWluZXInKVxyXG4gICAgY29uc3QgY29tbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxyXG4gICAgY29tbWVudFRpdGxlLmlubmVyVGV4dCA9IGBDb21tZW50cyAoKWBcclxuICAgIGNvbnN0IGxpc3RPZkNvbW1lbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxyXG4gICAgY29uc3QgaXRlbUNvbW1lbnQgPSB7fVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSsrO2k8NCkge1xyXG4gICAgICAgIGNvbnN0IGFyckRldGFpbHMgPSB7ZGF0ZTonMDEvMDIvMjAyMycsIG5hbWU6JyBNYXJrJywgY29tbWVudDonR29vZCBiZXN0J31cclxuICAgICAgICBpdGVtQ29tbWVudFtpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuICAgICAgICBpdGVtQ29tbWVudFtpXS5pbm5lckhUTUwgPSBgJHthcnJEZXRhaWxzLmRhdGV9LCAke2FyckRldGFpbHMubmFtZX0gOiAke2FyckRldGFpbHMuY29tbWVudH1gXHJcbiAgICAgICAgbGlzdE9mQ29tbWVudHMuYXBwZW5kKGl0ZW1Db21tZW50W2ldKVxyXG4gICAgfVxyXG4gICAgY29tbWVudHNCb3guYXBwZW5kQ2hpbGQoY29tbWVudFRpdGxlKVxyXG4gICAgY29tbWVudHNCb3guYXBwZW5kQ2hpbGQobGlzdE9mQ29tbWVudHMpXHJcblxyXG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBjb25zdCBmb3JtVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXHJcbiAgICBmb3JtVGl0bGUuaW5uZXJUZXh0ID0gXCJBZGQgY29tbWVudFwiXHJcbiAgICBjb25zdCBjb21tZW50Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxyXG4gICAgY29uc3QgaW5wdXROYW1lQ29tbWVudCA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgaW5wdXROYW1lQ29tbWVudC50eXBlID0gJ3RleHQnXHJcbiAgICBpbnB1dE5hbWVDb21tZW50LnBsYWNlaG9sZGVyID0gJ1lvdXIgbmFtZSdcclxuICAgIGlucHV0TmFtZUNvbW1lbnQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsdHJ1ZSlcclxuICAgIGlucHV0TmFtZUNvbW1lbnQuaWQgPSAnY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZSdcclxuICAgIGNvbnN0IHRleHRhcmVhQ29udGVudENvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXHJcbiAgICB0ZXh0YXJlYUNvbnRlbnRDb21tZW50LmlkID0gJ2NvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnQnXHJcbiAgICB0ZXh0YXJlYUNvbnRlbnRDb21tZW50LmNvbHMgPSAzMFxyXG4gICAgdGV4dGFyZWFDb250ZW50Q29tbWVudC5yb3dzID0gMTBcclxuICAgIHRleHRhcmVhQ29udGVudENvbW1lbnQucGxhY2Vob2xkZXIgPSAnWW91ciBpbnNpZ2h0cydcclxuICAgIGNvbnN0IHN1Ym1pdENvbW1lbnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG4gICAgc3VibWl0Q29tbWVudEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCdcclxuICAgIHN1Ym1pdENvbW1lbnRCdXR0b24uaWQgPSAnY29tbWVudC1wb3AtdXBfc3VibWl0J1xyXG4gICAgc3VibWl0Q29tbWVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdwb3AtdXAtYnV0dG9ucycpXHJcbiAgICBzdWJtaXRDb21tZW50QnV0dG9uLmlubmVyVGV4dCA9ICdjb21tZW50JyBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRDb21tZW50UG9wVXAge1xyXG4gICAgY29uc3RydWN0b3IgKHBva2Vtb24sIGRldGFpbHMsIGZlYXR1cmVzKSB7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHt9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnJvb3QgPSBCdWlsZENvbW1lbnRQb3BVcC5jcmVhdGVSb290KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5pbWFnZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZS1wb2tlbW9uJylcclxuICAgICAgICB0aGlzLmVsZW1lbnQuaW1hZ2Uuc3JjID0gZGV0YWlscy5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5wb2tlbW9uTmFtZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9uLW5hbWUnKVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5wb2tlbW9uTmFtZSA9IHBva2Vtb24ubmFtZVxyXG4gICAgICAgIC8vdGhpcyBjb250YWlucyBhIGNvbGxlY3Rpb24gb24gPGxpIGNsYXNzPVwiaXRlbS1kZXRhaWxcIj5cclxuICAgICAgICBjb25zdCBwb2tlbW9uRmVhdHVyZXMgPSB0aGlzLmVsZW1lbnQucm9vdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS1kZXRhaWxcIilcclxuICAgICAgICBjb25zdCBwb2tlbW9uQWJpbGl0aWVzID0gZGV0YWlscy5hYmlsaXRpZXNcclxuICAgICAgICAvL2JlY2F1c2Ugd2UgZG9uJ3Qga25vdyB0aGUgZXhhY3QgbnVtYmVyIG9mIGFiaWxpdGllcyBvZiBlYWNoIHBva2Vtb25cclxuICAgICAgICBjb25zdCBhcnJBYmlsaXRpZXMgPVtdXHJcbiAgICAgICAgcG9rZW1vbkFiaWxpdGllcy5mb3JFYWNoKGFiaWxpdHkgPT4ge1xyXG4gICAgICAgICAgICBhcnJBYmlsaXRpZXMucHVzaChhYmlsaXR5LmFiaWxpdHkubmFtZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBwb2tlbW9uRmVhdHVyZXNbMF0uaW5uZXJUZXh0ICs9XCIgXCIrYXJyQWJpbGl0aWVzLmpvaW4oJywgJylcclxuICAgICAgICAvL2Zvcm1zXHJcbiAgICAgICAgY29uc3QgcG9rZW1vbkZvcm0gPSBkZXRhaWxzLmZvcm1zXHJcbiAgICAgICAgY29uc3QgYXJyRm9ybXMgPVtdXHJcbiAgICAgICAgcG9rZW1vbkZvcm0uZm9yRWFjaChmb3JtID0+IHtcclxuICAgICAgICAgICAgYXJyRm9ybXMucHVzaChmb3JtLm5hbWUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBwb2tlbW9uRmVhdHVyZXNbMV0uaW5uZXJUZXh0ICs9XCIgXCIrYXJyRm9ybXMuam9pbignLCAnKVxyXG4gICAgICAgIC8vc3RhdHNcclxuICAgICAgICBjb25zdCBwb2tlbW9uU3RhdHMgPSBkZXRhaWxzLnN0YXRzXHJcbiAgICAgICAgY29uc3QgYXJyU3RhdCA9IFtdXHJcbiAgICAgICAgcG9rZW1vblN0YXRzLmZvckVhY2goc3RhdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ialN0YXRzID0ge31cclxuICAgICAgICAgICAgb2JqU3RhdHMubmFtZSA9IHN0YXQuc3RhdC5uYW1lXHJcbiAgICAgICAgICAgIG9ialN0YXRzLnNjb3JlID0gc3RhdC5iYXNlX3N0YXRcclxuICAgICAgICAgICAgYXJyU3RhdC5wdXNoKG9ialN0YXRzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYXJyU3RhdC5mb3JFYWNoKGVsdCA9PiB7XHJcbiAgICAgICAgICAgIHBva2Vtb25GZWF0dXJlc1syXS5pbm5lclRleHQgKz1gICR7ZWx0Lm5hbWV9IDogJHtlbHQuc2NvcmV9LCBgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL3dlaWdodFxyXG4gICAgICAgIGNvbnN0IHBva2Vtb25XZWlnaHQgPSBkZXRhaWxzLndlaWdodFxyXG4gICAgICAgIHBva2Vtb25GZWF0dXJlc1szXS5pbm5lclRleHQgKz0gYCAke3Bva2Vtb25XZWlnaHR9YFxyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1saXN0JylcclxuICAgICAgICBCdWlsZENvbW1lbnRQb3BVcC5nZXRDb21tZW50cyhmZWF0dXJlcy5pdGVtSWQsIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdClcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZm9ybSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC51c2VyTmFtZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LXBvcC11cF9pbnB1dF9uYW1lJylcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY29tbWVudCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50JylcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3VibWl0QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3N1Ym1pdCcpXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgY29uc3QgdXNlck5hbWUgPSB0aGlzLmVsZW1lbnQudXNlck5hbWUudmFsdWUudHJpbSgpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRDb250ZW50ID0gdGhpcy5lbGVtZW50LmNvbW1lbnQudmFsdWUudHJpbSgpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudChmZWF0dXJlcy5pdGVtSWQsdXNlck5hbWUsY29tbWVudENvbnRlbnQpXHJcbiAgICAgICAgICAgIEJ1aWxkQ29tbWVudFBvcFVwLnNhdmVDb21tZW50KGNvbW1lbnQpXHJcbiAgICAgICAgICAgIGZvcm0ucmVzZXQoKSAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyAoKVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcmVhdGVSb290ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIHJldHVybiByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cFwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ4LWJ1dHRvbiBwb3AtdXAtYnV0dG9uc1wiPjxpIGNsYXNzPVwiYmkgYmkteC1sZ1wiPjwvaT48L2J1dHRvbj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXAtaW1hZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwicG9rZW1vbiBpbWFnZVwiIGlkID0gJ2ltYWdlLXBva2Vtb24nPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxoMiBpZD0ncG9rZW1vbi1uYW1lJz48L2gyPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+QWJpbGl0aWVzIDo8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz5Gb3JtcyA6PC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+U3RhdHMgOjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3MgPSAnaXRlbS1kZXRhaWwnPndlaWdodCA6PC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8aDMgPlxyXG4gICAgICAgICAgICAgICAgQ29tbWVudHMgKDIpXHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcyA9ICdjb21tZW50LWxpc3QnPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8aDM+QWRkIGNvbW1lbnQ8L2gzPlxyXG4gICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBjbGFzcz0nZm9ybSc+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGlkPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGNsYXNzPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImNvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnRcIiBpZD1cImNvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnRcIiBjb2xzPVwiMzBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHNcIj48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJjb21tZW50LXBvcC11cF9zdWJtaXRcIiBjbGFzcz1cInBvcC11cC1idXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQ29tbWVudFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5jaGlsZHJlblswXTtcclxuICAgICAgfVxyXG4gICAgc3RhdGljICBzYXZlQ29tbWVudCA9IGFzeW5jIChjb21tZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHBvc3RDb21tZW50KGNvbW1lbnQpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMgPSBhc3luYyhpZFBva2Vtb24pID0+IHtcclxuICAgICAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnQoaWRQb2tlbW9uLGNvbnRhaW5lcilcclxuICAgICAgICBjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuICAgICAgICAgICAgaXRlbUNvbW1lbnQuaW5uZXJIVE1MID0gYCR7Y29tbWVudC5jcmVhdGlvbl9kYXRlfSAke2NvbW1lbnQudXNlcm5hbWV9IDogJHtjb21tZW50LmNvbW1lbnR9YFxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbUNvbW1lbnQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpdGVtX2lkLCB1c2VybmFtZSwgY29tbWVudCkge1xyXG4gICAgICAgIHRoaXMuaXRlbV9pZCA9IGl0ZW1faWRcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWVcclxuICAgICAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50XHJcbiAgICB9XHJcbn0iLCJjb25zdCBnZXRDb21tZW50ID0gYXN5bmMgKGlkUG9rZW1vbikgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvY29tbWVudHM/aXRlbV9pZD0ke2lkUG9rZW1vbn1gKVxyXG4gICAgLmNhdGNoKChlcnJvcikgPT4gbmV3IEVycm9yKGVycm9yKSk7XHJcbiAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBjb21tZW50cztcclxufVxyXG5cclxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvY29tbWVudHMnLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb21tZW50KSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xyXG4gICAgY29uc3QgbXNnID0gYXdhaXQgcmVzcG9uc2U7XHJcbiAgICByZXR1cm4gbXNnO1xyXG4gIH07XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7Z2V0Q29tbWVudCwgcG9zdENvbW1lbnR9XHJcbiAgXHJcbiAgICBcclxuIiwiaW1wb3J0IEJ1aWxkQ29tbWVudFBvcFVwIGZyb20gXCIuL2J1aWxkQ29tbWVudFBvcFVwLmpzXCI7XHJcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKVxyXG5cclxuLy8gRGF0YSBmcm9tIEFQSVxyXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uRGF0YSgpIHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9NicpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgcmV0dXJuIGRhdGEucmVzdWx0cztcclxufVxyXG5cclxuLy8gU3BlY2lmaWMgUG9rZW1vbiBkZXRhaWxzXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25EZXRhaWxzKHVybCkge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vLyBIVE1MIGVsZW1lbnRzIGZvciBlYWNoIFBva2Vtb25cclxuYXN5bmMgZnVuY3Rpb24gZGlzcGxheVBva2Vtb24oKSB7XHJcbiAgY29uc3QgcG9rZW1vbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbi1saXN0Jyk7XHJcbiAgY29uc3QgcG9rZW1vbkRhdGEgPSBhd2FpdCBnZXRQb2tlbW9uRGF0YSgpO1xyXG4gIGxldCBjb3VudCA9IDBcclxuICBwb2tlbW9uRGF0YS5mb3JFYWNoKGFzeW5jIChwb2tlbW9uKSA9PiB7XHJcbiAgICBcclxuICAgIGNvbnN0IGRldGFpbHMgPSBhd2FpdCBnZXRQb2tlbW9uRGV0YWlscyhwb2tlbW9uLnVybCk7XHJcbiBcclxuICAgIGNvbnN0IHBva2Vtb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwb2tlbW9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwb2tlbW9uLWl0ZW0nKTtcclxuXHJcbiAgICBjb25zdCBwb2tlbW9uVGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHBva2Vtb25UaXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBwb2tlbW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgcG9rZW1vblRpdGxlLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xyXG5cclxuICAgIGNvbnN0IHBva2Vtb25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgcG9rZW1vbkltYWdlLnNyYyA9IGRldGFpbHMuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xyXG5cclxuICAgIC8vIExpa2UgQnV0dG9uXHJcbiAgICBjb25zdCBsaWtlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGxpa2VJY29uLnRleHRDb250ZW50ID0gJ+KdpO+4jyc7XHJcbiAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdsaWtlLWljb24nKTtcclxuXHJcbiAgICBwb2tlbW9uVGl0bGVDb250YWluZXIuYXBwZW5kKHBva2Vtb25UaXRsZSwgbGlrZUljb24pO1xyXG5cclxuICAgIC8vIEJ1dHRvbnMgYW5kIFJlc2VydmF0aW9uIEJ1dHRvbnNcclxuICAgIGNvbnN0IGNvbW1lbnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbW1lbnRCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xyXG4gICAgY29tbWVudEJ1dHRvbi5pZCA9IGBpZFBva2Vtb24tJHtjb3VudH1gXHJcbiAgICBjb25zdCByZXNlcnZhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgcmVzZXJ2YXRpb25CdXR0b24udGV4dENvbnRlbnQgPSAnUmVzZXJ2YXRpb25zJztcclxuXHJcbiAgICBwb2tlbW9uRWxlbWVudC5hcHBlbmQocG9rZW1vbkltYWdlLCBwb2tlbW9uVGl0bGVDb250YWluZXIsIGNvbW1lbnRCdXR0b24sIHJlc2VydmF0aW9uQnV0dG9uKTtcclxuICAgIHBva2Vtb25MaXN0LmFwcGVuZChwb2tlbW9uRWxlbWVudCk7XHJcbiAgICBjb3VudCs9MVxyXG5cclxuICAgIGNvbW1lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgY29uc3QgaXRlbUlkID0gZS50YXJnZXQuaWRcclxuICAgICAgY29uc3QgcG9wVXAgPSBuZXcgQnVpbGRDb21tZW50UG9wVXAocG9rZW1vbixkZXRhaWxzLHtpdGVtSWQ6aXRlbUlkfSlcclxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcFVwLmVsZW1lbnQucm9vdClcclxuICAgICAgcG9rZW1vbkxpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBFeHBvcnQgZnVjdGlvbnNcclxuZXhwb3J0IHsgZ2V0UG9rZW1vbkRhdGEsIGdldFBva2Vtb25EZXRhaWxzLCBkaXNwbGF5UG9rZW1vbiB9O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvbG9nby9wb2tlbW9uLWxvZ28ucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDQwMDswLDUwMDswLDYwMDswLDcwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcclxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMnZ3O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgcGFkZGluZzogMCA0dnc7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4ubmF2YmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDkwdnc7XHJcbiAgcGFkZGluZzogMCAxdnc7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgaGVpZ2h0OiA3LjV2dztcclxuICB0b3A6IDA7XHJcbiAgei1pbmRleDogMTAwMDtcclxufVxyXG5cclxuLnBva2Vtb24taXRlbSBpbWcge1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm5hdmJhciAubG9nbyBpbWcge1xyXG4gIGhlaWdodDogNnZ3O1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCBsaSB7XHJcbiAgbWFyZ2luOiAwIDF2dztcclxufVxyXG5cclxuLm5hdmJhciBuYXYgdWwgbGkgYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiBpbmhlcml0O1xyXG59XHJcblxyXG4ubGlzdHMgYTpob3ZlciB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5saXN0cyBhLmFjdGl2ZSB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5uYXZiYXIgbmF2IHVsIGxpIGE6aG92ZXIge1xyXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xyXG59XHJcblxyXG4ubmF2YmFyIG5hdiB1bCBsaSBhLmFjdGl2ZSB7XHJcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XHJcbn1cclxuXHJcbi5sb2dvIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XHJcbiAgd2lkdGg6IDZ2dztcclxuICBoZWlnaHQ6IDZ2dztcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5oZWFkZXIge1xyXG4gIGhlaWdodDogNnZ3O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuZm9vdGVyIHtcclxuICBoZWlnaHQ6IDV2dztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAwLjV2dztcclxuICBwYWRkaW5nOiAwIDF2dztcclxufVxyXG5cclxuLmZvb3RlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICB3aWR0aDogOTB2dztcclxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDAuNXZ3O1xyXG4gIHBhZGRpbmc6IDAgMXZ3O1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGhlaWdodDogNXZ3O1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4vKiAtLS0tLS0tLS0tIFBPS0VNT04gTElTVCAtLS0tLS0tLS0tICovXHJcblxyXG4ucG9rZW1vbi1saXN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbi10b3A6IDV2dztcclxuICBtYXJnaW4tYm90dG9tOiA1dnc7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHBhZGRpbmctdG9wOiA3LjV2dzsgLyogQWRkZWQgdG8gYWNjb3VudCBmb3IgdGhlIG5hdmJhciAqL1xyXG59XHJcblxyXG4ucG9rZW1vbi1pdGVtIHtcclxuICBmbGV4LWJhc2lzOiBjYWxjKDMwJSAtIDJlbSk7XHJcbiAgbWFyZ2luOiAxZW07XHJcbiAgcGFkZGluZzogMmVtO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIGhlaWdodDogNTB2aDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXHJcbn1cclxuXHJcbi5jb21tZW50LWJ1dHRvbixcclxuLnJlc2VydmF0aW9uLWJ1dHRvbiB7XHJcbiAgbWFyZ2luOiAwLjVlbSAwO1xyXG59XHJcblxyXG4ubGlrZS1pY29uIHtcclxuICBmb250LXNpemU6IDJlbTtcclxufVxyXG5cclxuLnRpdGxlLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLyogLS0tLS0tLS0tLSBDT01NRU5UUyBQT1AgVVAgLS0tLS0tLS0tLSAqL1xyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG5saSB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwIHsgXHJcbiAgd2lkdGg6IDgwJTtcclxuICBtYXJnaW46IDF2aCBhdXRvO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBwYWRkaW5nOiAxdmggM3Z3O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyOiAwLjNyZW0gc29saWQgYmxhY2s7XHJcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4ueC1idXR0b24ge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcclxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOjphZnRlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogMC41cztcclxufVxyXG5cclxuLnBvcC11cC1idXR0b25zOmhvdmVyOjphZnRlciB7XHJcbiAgb3BhY2l0eTogMTtcclxuICByaWdodDogMC41cmVtO1xyXG59XHJcblxyXG4ucG9wLXVwLWJ1dHRvbnM6Zm9jdXMge1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cC1pbWFnZS1jb250YWluZXIge1xyXG4gIGhlaWdodDogNjB2aDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMge1xyXG4gIGhlaWdodDogMjV2aDtcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwIGRpdiBpbWcge1xyXG4gIHdpZHRoOiAzNXZ3O1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAgaDIge1xyXG4gIGZvbnQtc2l6ZTogNHZ3O1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgY29sdW1uLWdhcDogMC4xcmVtO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsIGxpIHtcclxuICB3aWR0aDogNDAlO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHJvdy1nYXA6IDEuM3ZoO1xyXG59XHJcblxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dCxcclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWFcclxuIHtcclxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XHJcbn1cclxuXHJcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0OmhvdmVyLFxyXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYTpob3ZlclxyXG4ge1xyXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkICMyYjI4Mjg7XHJcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xyXG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7ICBcclxufVxyXG5cclxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gYnV0dG9uIHtcclxuICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgcGFkZGluZzogMC4ycmVtIDAuNXJlbTtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLGtDQUFrQztFQUNsQyxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxTQUFTO0FBQ1g7O0FB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Ozs7RUFHRSwwQkFBMEI7RUFDMUIscUJBQXFCO0FBQ3ZCOztBQUVBOzs7RUFHRSw0QkFBNEI7RUFDNUIscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDAmZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAydnc7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBwYWRkaW5nOiAwIDR2dztcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgd2lkdGg6IDkwdnc7XFxyXFxuICBwYWRkaW5nOiAwIDF2dztcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBoZWlnaHQ6IDcuNXZ3O1xcclxcbiAgdG9wOiAwO1xcclxcbiAgei1pbmRleDogMTAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLnBva2Vtb24taXRlbSBpbWcge1xcclxcbiAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIC5sb2dvIGltZyB7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciBuYXYgdWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIHtcXHJcXG4gIG1hcmdpbjogMCAxdnc7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5saXN0cyBhOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcclxcbn1cXHJcXG5cXHJcXG4ubGlzdHMgYS5hY3RpdmUge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGE6aG92ZXIge1xcclxcbiAgY29sb3I6IHJnYigzNiwgOTQsIDE4MCk7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgbmF2IHVsIGxpIGEuYWN0aXZlIHtcXHJcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcclxcbn1cXHJcXG5cXHJcXG4ubG9nbyB7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vYXNzZXRzL2xvZ28vcG9rZW1vbi1sb2dvLnBuZycpO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXHJcXG4gIHdpZHRoOiA2dnc7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICBoZWlnaHQ6IDZ2dztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgaGVpZ2h0OiA1dnc7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMC41dnc7XFxyXFxuICBwYWRkaW5nOiAwIDF2dztcXHJcXG59XFxyXFxuXFxyXFxuLmZvb3RlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAwLjV2dztcXHJcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGhlaWdodDogNXZ3O1xcclxcbiAgYm90dG9tOiAwO1xcclxcbiAgei1pbmRleDogMTAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tLS0tLS0tLSBQT0tFTU9OIExJU1QgLS0tLS0tLS0tLSAqL1xcclxcblxcclxcbi5wb2tlbW9uLWxpc3Qge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIG1hcmdpbi10b3A6IDV2dztcXHJcXG4gIG1hcmdpbi1ib3R0b206IDV2dztcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHBhZGRpbmctdG9wOiA3LjV2dzsgLyogQWRkZWQgdG8gYWNjb3VudCBmb3IgdGhlIG5hdmJhciAqL1xcclxcbn1cXHJcXG5cXHJcXG4ucG9rZW1vbi1pdGVtIHtcXHJcXG4gIGZsZXgtYmFzaXM6IGNhbGMoMzAlIC0gMmVtKTtcXHJcXG4gIG1hcmdpbjogMWVtO1xcclxcbiAgcGFkZGluZzogMmVtO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgaGVpZ2h0OiA1MHZoO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWJ1dHRvbixcXHJcXG4ucmVzZXJ2YXRpb24tYnV0dG9uIHtcXHJcXG4gIG1hcmdpbjogMC41ZW0gMDtcXHJcXG59XFxyXFxuXFxyXFxuLmxpa2UtaWNvbiB7XFxyXFxuICBmb250LXNpemU6IDJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tIENPTU1FTlRTIFBPUCBVUCAtLS0tLS0tLS0tICovXFxyXFxuLmhpZGRlbiB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5saSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgeyBcXHJcXG4gIHdpZHRoOiA4MCU7XFxyXFxuICBtYXJnaW46IDF2aCBhdXRvO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBwYWRkaW5nOiAxdmggM3Z3O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJvcmRlcjogMC4zcmVtIHNvbGlkIGJsYWNrO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi54LWJ1dHRvbiB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxyXFxuICBiYWNrZ3JvdW5kOiBub25lO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xcclxcbiAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5wb3AtdXAtYnV0dG9uczo6YWZ0ZXIge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgb3BhY2l0eTogMDtcXHJcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxyXFxufVxcclxcblxcclxcbi5wb3AtdXAtYnV0dG9uczpob3Zlcjo6YWZ0ZXIge1xcclxcbiAgb3BhY2l0eTogMTtcXHJcXG4gIHJpZ2h0OiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5wb3AtdXAtYnV0dG9uczpmb2N1cyB7XFxyXFxuICBjb2xvcjogcmVkO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAtaW1hZ2UtY29udGFpbmVyIHtcXHJcXG4gIGhlaWdodDogNjB2aDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMge1xcclxcbiAgaGVpZ2h0OiAyNXZoO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAgZGl2IGltZyB7XFxyXFxuICB3aWR0aDogMzV2dztcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtcG9wLXVwIGgyIHtcXHJcXG4gIGZvbnQtc2l6ZTogNHZ3O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICBjb2x1bW4tZ2FwOiAwLjFyZW07XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bCBsaSB7XFxyXFxuICB3aWR0aDogNDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcm93LWdhcDogMS4zdmg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0LFxcclxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhXFxyXFxuIHtcXHJcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIGJsYWNrO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dDpob3ZlcixcXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYTpob3ZlclxcclxcbiB7XFxyXFxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcclxcbiAgYmFja2dyb3VuZDogI2Y5ZjdmNzsgIFxcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBidXR0b24ge1xcclxcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogMC4ycmVtIDAuNXJlbTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcclxuaW1wb3J0IHsgZGlzcGxheVBva2Vtb24gfSBmcm9tICcuL21vZHVsZS9wb2tlbW9uLmpzJztcclxuXHJcblxyXG4vLyBBaG9yYSBwdWVkZXMgdXNhciBsYSBmdW5jacOzbiBkaXNwbGF5UG9rZW1vbiBlbiB0dSBpbmRleC5qc1xyXG5kaXNwbGF5UG9rZW1vbigpO1xyXG4vLyBjb25zdCBhYmlsID0gbmV3IEJ1aWxkQ29tbWVudFBvcFVwKClcclxuLy8gY29uc3QgY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxyXG4vLyBjb24uYXBwZW5kQ2hpbGQoYWJpbC5lbGVtZW50LnJvb3QpXHJcblxyXG4vL2NvbnN0IGFwcCA9IGF3YWl0IHBvc3RDb21tZW50KClcclxuLy8gY29uc3QgdGVsID1hd2FpdCBnZXRDb21tZW50KFwiaWRQb2tlbW9uLTRcIilcclxuLy8gY29uc29sZS5sb2codGVsKVxyXG4iXSwibmFtZXMiOlsiQ29tbWVudCIsImdldENvbW1lbnQiLCJwb3N0Q29tbWVudCIsImJ1aWxkQ29tbWVudFBvcCIsImNvbW1lbnRQb3BVcCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInhCdXR0b24iLCJpbm5lckhUTUwiLCJpbWFnZUNvbnRhaW5lciIsImltYWdlIiwiYWx0Iiwic3JjIiwiYXBwZW5kIiwicG9rZW1vbk5hbWUiLCJpbm5lclRleHQiLCJwb2tlbW9uRGV0YWlscyIsImxpc3RPZkRldGFpbHMiLCJpdGVtRGV0YWlsIiwiaSIsImFyckRldGFpbHMiLCJjb21tZW50c0JveCIsImNvbW1lbnRUaXRsZSIsImxpc3RPZkNvbW1lbnRzIiwiaXRlbUNvbW1lbnQiLCJkYXRlIiwibmFtZSIsImNvbW1lbnQiLCJhcHBlbmRDaGlsZCIsImZvcm1Db250YWluZXIiLCJmb3JtVGl0bGUiLCJjb21tZW50Rm9ybSIsImlucHV0TmFtZUNvbW1lbnQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJzZXRBdHRyaWJ1dGUiLCJpZCIsInRleHRhcmVhQ29udGVudENvbW1lbnQiLCJjb2xzIiwicm93cyIsInN1Ym1pdENvbW1lbnRCdXR0b24iLCJCdWlsZENvbW1lbnRQb3BVcCIsImNvbnN0cnVjdG9yIiwicG9rZW1vbiIsImRldGFpbHMiLCJmZWF0dXJlcyIsImVsZW1lbnQiLCJyb290IiwiY3JlYXRlUm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJzcHJpdGVzIiwiZnJvbnRfZGVmYXVsdCIsInBva2Vtb25GZWF0dXJlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJwb2tlbW9uQWJpbGl0aWVzIiwiYWJpbGl0aWVzIiwiYXJyQWJpbGl0aWVzIiwiZm9yRWFjaCIsImFiaWxpdHkiLCJwdXNoIiwiam9pbiIsInBva2Vtb25Gb3JtIiwiZm9ybXMiLCJhcnJGb3JtcyIsImZvcm0iLCJwb2tlbW9uU3RhdHMiLCJzdGF0cyIsImFyclN0YXQiLCJzdGF0Iiwib2JqU3RhdHMiLCJzY29yZSIsImJhc2Vfc3RhdCIsImVsdCIsInBva2Vtb25XZWlnaHQiLCJ3ZWlnaHQiLCJjb21tZW50TGlzdCIsImdldENvbW1lbnRzIiwiaXRlbUlkIiwidXNlck5hbWUiLCJzdWJtaXRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJ0cmltIiwiY29tbWVudENvbnRlbnQiLCJzYXZlQ29tbWVudCIsInJlc2V0IiwiY29uc29sZSIsImxvZyIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlIiwiYm9keSIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsImNoaWxkcmVuIiwibWVzc2FnZSIsImlkUG9rZW1vbiIsImNvbW1lbnRzIiwiY29udGFpbmVyIiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiaXRlbV9pZCIsInJlc3BvbnNlIiwiZmV0Y2giLCJjYXRjaCIsImVycm9yIiwiRXJyb3IiLCJqc29uIiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJtc2ciLCJnZXRQb2tlbW9uRGF0YSIsImRhdGEiLCJyZXN1bHRzIiwiZ2V0UG9rZW1vbkRldGFpbHMiLCJ1cmwiLCJkaXNwbGF5UG9rZW1vbiIsInBva2Vtb25MaXN0IiwicG9rZW1vbkRhdGEiLCJjb3VudCIsInBva2Vtb25FbGVtZW50IiwicG9rZW1vblRpdGxlQ29udGFpbmVyIiwicG9rZW1vblRpdGxlIiwidGV4dENvbnRlbnQiLCJwb2tlbW9uSW1hZ2UiLCJsaWtlSWNvbiIsImNvbW1lbnRCdXR0b24iLCJyZXNlcnZhdGlvbkJ1dHRvbiIsInRhcmdldCIsInBvcFVwIl0sInNvdXJjZVJvb3QiOiIifQ==