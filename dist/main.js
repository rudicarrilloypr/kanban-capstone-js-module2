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
    commentButton.id = `idPokemon-${count}`;
    pokemonElement.append(pokemonImage, pokemonTitleContainer, commentButton);
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
  });
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
const updatePokemonCounter = () => {
  const pokemonElements = document.querySelectorAll('.pokemon-item');
  const pokemonCounterElement = document.querySelector('#pokemon-counter');
  if (pokemonCounterElement) {
    pokemonCounterElement.textContent = pokemonElements.length;
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
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');\n\n* {\n  font-family: 'Poppins', sans-serif;\n  font-size: 2vw;\n  font-weight: 600;\n}\n\nbody {\n  box-sizing: border-box;\n  padding: 0 4vw;\n  margin: 0;\n}\n\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 90vw;\n  padding: 0 1vw;\n  position: fixed;\n  background-color: #fff;\n  height: 7.5vw;\n  top: 0;\n  z-index: 1000;\n}\n\n.pokemon-item img {\n  max-width: 100%;\n}\n\n.comment-pop-up div img {\n  width: 35vw;\n}\n\n.navbar .logo img {\n  height: 6vw;\n}\n\n.navbar nav ul {\n  display: flex;\n  list-style: none;\n}\n\n.comment-pop-up li {\n  list-style: none;\n}\n\n.comment-pop-up-details ul li {\n  width: 40%;\n}\n\n.navbar nav ul li {\n  margin: 0 1vw;\n}\n\n.navbar nav ul li a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.lists a:hover {\n  color: rgb(36, 94, 180);\n}\n\n.lists a.active {\n  color: rgb(36, 94, 180);\n}\n\n.navbar nav ul li a:hover {\n  color: rgb(36, 94, 180);\n}\n\n.navbar nav ul li a.active {\n  color: rgb(36, 94, 180);\n}\n\n.logo {\n  background-image: url('./assets/logo/pokemon-logo.png');\n  background-repeat: no-repeat;\n  background-size: contain;\n  width: 6vw;\n  height: 6vw;\n  background-position: center;\n}\n\n.header {\n  height: 6vw;\n  display: flex;\n  align-items: center;\n}\n\nfooter {\n  height: 5vw;\n  display: flex;\n  align-items: center;\n  border: black solid 0.5vw;\n  padding: 0 1vw;\n}\n\n.footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 90vw;\n  border: black solid 0.5vw;\n  padding: 0 1vw;\n  position: fixed;\n  background-color: #fff;\n  height: 5vw;\n  bottom: 0;\n  z-index: 1000;\n}\n\n/* ---------- POKEMON LIST ---------- */\n\n.pokemon-list {\n  display: flex;\n  margin-top: 5vw;\n  margin-bottom: 5vw;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-content: center;\n  height: 100vh;\n  padding-top: 7.5vw; /* Added to account for the navbar */\n}\n\n.pokemon-item {\n  flex-basis: calc(30% - 2em);\n  margin: 1em;\n  padding: 2em;\n  border: 1px solid black;\n  text-align: center;\n  box-sizing: border-box;\n  height: 50vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  justify-content: space-between; /* Added to space out the elements */\n}\n\n.comment-button,\n.reservation-button {\n  margin: 0.5em 0;\n}\n\n.like-icon {\n  font-size: 2em;\n}\n\n.title-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n\n/* ---------- COMMENTS POP UP ---------- */\n\nspan {\n  font-weight: 900;\n}\n\n.comment-pop-up {\n  width: 80%;\n  margin: 1vh auto;\n  display: flex;\n  flex-direction: column;\n  padding: 1vh 3vw;\n  align-items: center;\n  border: 0.3rem solid black;\n  border-radius: 0.9rem;\n}\n\n.comment-pop-up > * {\n  box-sizing: border-box;\n}\n\n.x-button {\n  align-self: flex-end;\n  font-weight: 900;\n  background: none;\n  border-radius: 0.4rem;\n  cursor: pointer;\n}\n\n.pop-up-buttons:hover {\n  background-color: black;\n  color: white;\n  padding-right: 1rem;\n  padding-left: 0.5rem;\n}\n\n.pop-up-buttons::after {\n  position: absolute;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.pop-up-buttons:hover::after {\n  opacity: 1;\n  right: 0.5rem;\n}\n\n.pop-up-buttons:focus {\n  color: red;\n}\n\n.comment-pop-up h2 {\n  font-size: 5vw;\n  margin: 0.5rem;\n}\n\n.comment-pop-up h3 {\n  font-size: 4vh;\n  margin: 0 auto;\n}\n\n.comment-pop-up-details ul:nth-child(1) {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n}\n\n#abilities-list li,\n#stats-list li,\n#forms-list li,\n#weight-list li {\n  font-size: 0.7rem;\n  width: fit-content;\n}\n\n.comment-pop-up-comments-number-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#commentCount {\n  font-size: inherit;\n}\n\n.comment-pop-up_form_container h3 {\n  text-align: center;\n}\n\n.comment-pop-up_form_container form {\n  display: flex;\n  flex-direction: column;\n  row-gap: 1.3vh;\n}\n\n.comment-pop-up_form_container form input,\n.comment-pop-up_form_container form textarea {\n  border: 0.2rem solid black;\n  border-radius: 0.3rem;\n}\n\n.comment-pop-up_form_container form input:hover,\n.comment-pop-up_form_container form textarea:hover {\n  border: 0.2rem solid #2b2828;\n  border-radius: 0.3rem;\n  background: #f9f7f7;\n}\n\n.comment-pop-up_form_container form button {\n  width: fit-content;\n  padding: 0.2rem 0.5rem;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
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




// Ahora puedes usar la función displayPokemon y updatePokemonCounter en tu index.js
(0,_module_pokemon_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemon)().then(() => (0,_module_pokemonCounter_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsTUFBTSxhQUFhLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSx5QkFBeUIsT0FBTyxNQUFNLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxhQUFhLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLFFBQVEsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLE1BQU0s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bGUyLy4vc3JjL21vZHVsZS9idWlsZENvbW1lbnRQb3BVcC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvY29tbWVudC5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9tb2R1bGUvaW52b2x2ZW1lbnRBcGkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvbW9kdWxlL3Bva2Vtb25Db3VudGVyLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL21vZHVsZS92aWV3RnVuY3Rpb25zLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FuYmFuLWNhcHN0b25lLWpzLW1vZHVsZTIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2thbmJhbi1jYXBzdG9uZS1qcy1tb2R1bGUyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9rYW5iYW4tY2Fwc3RvbmUtanMtbW9kdWxlMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWVudCBmcm9tICcuL2NvbW1lbnQuanMnO1xuaW1wb3J0IHsgZ2V0Q29tbWVudCwgcG9zdENvbW1lbnQgfSBmcm9tICcuL2ludm9sdmVtZW50QXBpLmpzJztcbmltcG9ydCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyIGZyb20gJy4vdmlld0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1aWxkQ29tbWVudFBvcFVwIHtcbiAgY29uc3RydWN0b3IocG9rZW1vbiwgZGV0YWlscywgZmVhdHVyZXMpIHtcbiAgICBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyKCk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSB7fTtcbiAgICB0aGlzLmVsZW1lbnQucm9vdCA9IEJ1aWxkQ29tbWVudFBvcFVwLmNyZWF0ZVJvb3QoKTtcblxuICAgIHRoaXMuZWxlbWVudC5pbWFnZSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZS1wb2tlbW9uJyk7XG4gICAgdGhpcy5lbGVtZW50LmltYWdlLnNyYyA9IGRldGFpbHMuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuXG4gICAgdGhpcy5lbGVtZW50LnBva2Vtb25OYW1lID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3Bva2Vtb24tbmFtZScpO1xuICAgIHRoaXMuZWxlbWVudC5wb2tlbW9uTmFtZS5pbm5lclRleHQgPSBwb2tlbW9uLm5hbWU7XG5cbiAgICBjb25zdCBwb2tlbW9uQWJpbGl0aWVzID0gZGV0YWlscy5hYmlsaXRpZXM7XG4gICAgLy8gYmVjYXVzZSB3ZSBkb24ndCBrbm93IHRoZSBleGFjdCBudW1iZXIgb2YgYWJpbGl0aWVzIG9mIGVhY2ggcG9rZW1vblxuICAgIHRoaXMuZWxlbWVudC5hYmlsaXRpZXNMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2FiaWxpdGllcy1saXN0Jyk7XG4gICAgcG9rZW1vbkFiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5KSA9PiB7XG4gICAgICBjb25zdCBpdGVtQWJpbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtQWJpbGl0eS5pbm5lclRleHQgPSBhYmlsaXR5LmFiaWxpdHkubmFtZTtcbiAgICAgIHRoaXMuZWxlbWVudC5hYmlsaXRpZXNMaXN0LmFwcGVuZENoaWxkKGl0ZW1BYmlsaXR5KTtcbiAgICB9KTtcbiAgICAvLyBmb3Jtc1xuICAgIHRoaXMuZWxlbWVudC5mb3JtTGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNmb3Jtcy1saXN0Jyk7XG4gICAgY29uc3QgcG9rZW1vbkZvcm0gPSBkZXRhaWxzLmZvcm1zO1xuICAgIHBva2Vtb25Gb3JtLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGl0ZW1Gb3JtLmlubmVyVGV4dCA9IGZvcm0ubmFtZTtcbiAgICAgIHRoaXMuZWxlbWVudC5mb3JtTGlzdC5hcHBlbmRDaGlsZChpdGVtRm9ybSk7XG4gICAgfSk7XG4gICAgLy8gc3RhdHNcbiAgICB0aGlzLmVsZW1lbnQuc3RhdHNMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3N0YXRzLWxpc3QnKTtcbiAgICBjb25zdCBwb2tlbW9uU3RhdHMgPSBkZXRhaWxzLnN0YXRzO1xuICAgIHBva2Vtb25TdGF0cy5mb3JFYWNoKChzdGF0KSA9PiB7XG4gICAgICBjb25zdCBpdGVtU3RhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpdGVtU3RhdC5pbm5lclRleHQgPSBgJHtzdGF0LnN0YXQubmFtZX0gOiAke3N0YXQuYmFzZV9zdGF0fWA7XG4gICAgICB0aGlzLmVsZW1lbnQuc3RhdHNMaXN0LmFwcGVuZENoaWxkKGl0ZW1TdGF0KTtcbiAgICB9KTtcblxuICAgIC8vIHdlaWdodFxuICAgIHRoaXMuZWxlbWVudC53ZWlnaHRMaXN0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI3dlaWdodC1saXN0Jyk7XG4gICAgY29uc3QgaXRlbVdlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaXRlbVdlaWdodC5pbm5lclRleHQgPSBkZXRhaWxzLndlaWdodDtcbiAgICB0aGlzLmVsZW1lbnQud2VpZ2h0TGlzdC5hcHBlbmRDaGlsZChpdGVtV2VpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LWxpc3QnKTtcbiAgICB0aGlzLmVsZW1lbnQubnVtYmVyT2ZDb21tZW50cyA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50Q291bnQnKTtcbiAgICBCdWlsZENvbW1lbnRQb3BVcC5nZXRDb21tZW50cyhcbiAgICAgIGZlYXR1cmVzLml0ZW1JZCxcbiAgICAgIHRoaXMuZWxlbWVudC5jb21tZW50TGlzdCxcbiAgICAgIHRoaXMuZWxlbWVudC5udW1iZXJPZkNvbW1lbnRzLFxuICAgICk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZm9ybSA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgICB0aGlzLmVsZW1lbnQudXNlck5hbWUgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZScpO1xuICAgIHRoaXMuZWxlbWVudC5jb21tZW50ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3RleHRhcmVhX2NvbnRlbnQnKTtcbiAgICB0aGlzLmVsZW1lbnQuc3VibWl0QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtcG9wLXVwX3N1Ym1pdCcpO1xuICAgIHRoaXMuZWxlbWVudC5zdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgdXNlck5hbWUgPSB0aGlzLmVsZW1lbnQudXNlck5hbWUudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgY29tbWVudENvbnRlbnQgPSB0aGlzLmVsZW1lbnQuY29tbWVudC52YWx1ZS50cmltKCk7XG4gICAgICBjb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnQoZmVhdHVyZXMuaXRlbUlkLCB1c2VyTmFtZSwgY29tbWVudENvbnRlbnQpO1xuICAgICAgQnVpbGRDb21tZW50UG9wVXAuc2F2ZUNvbW1lbnQoY29tbWVudCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QuaW5uZXJUZXh0ID0gJyc7XG4gICAgICB0aGlzLmVsZW1lbnQuZm9ybS5yZXNldCgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEJ1aWxkQ29tbWVudFBvcFVwLmdldENvbW1lbnRzKFxuICAgICAgICAgIGZlYXR1cmVzLml0ZW1JZCxcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY29tbWVudExpc3QsXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm51bWJlck9mQ29tbWVudHMsXG4gICAgICAgICk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC54QnV0dG9uID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLngtYnV0dG9uJyk7XG4gICAgdGhpcy5lbGVtZW50LnhCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQucm9vdC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5yb290KTtcbiAgICAgIGhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVJvb3QgPSAoKSA9PiB7XG4gICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICByYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgcmV0dXJuIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwieC1idXR0b24gcG9wLXVwLWJ1dHRvbnNcIj48aSBjbGFzcz1cImJpIGJpLXgtbGdcIj48L2k+PC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwicG9rZW1vbiBpbWFnZVwiIGlkID0gJ2ltYWdlLXBva2Vtb24nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGgyIGlkPSdwb2tlbW9uLW5hbWUnPjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1kZXRhaWxzXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5BYmlsaXRpZXM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSAnYWJpbGl0aWVzLWxpc3QnPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gJ2l0ZW0tZGV0YWlsJz48c3Bhbj5Gb3Jtczwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9ICdmb3Jtcy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+U3RhdHM8L3NwYW4+IDpcbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPSdzdGF0cy1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9ICdpdGVtLWRldGFpbCc+PHNwYW4+d2VpZ2h0PC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD0gJ3dlaWdodC1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDMgPlxuICAgICAgICAgICAgICAgIENvbW1lbnRzICg8c3BhbiBpZD0nY29tbWVudENvdW50Jz48L3NwYW4+KVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDx1bCBpZCA9ICdjb21tZW50LWxpc3QnPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGgzPkFkZCBjb21tZW50PC9oMz5cbiAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIGNsYXNzPSdmb3JtJz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGlkPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIGNsYXNzPVwiY29tbWVudC1wb3AtdXBfaW5wdXRfbmFtZVwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50XCIgaWQ9XCJjb21tZW50LXBvcC11cF90ZXh0YXJlYV9jb250ZW50XCIgY29scz1cIjMwXCIgcm93cz1cIjEwXCIgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImNvbW1lbnQtcG9wLXVwX3N1Ym1pdFwiIGNsYXNzPVwicG9wLXVwLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgQ29tbWVudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgPC9kaXY+XG4gICAgICAgICAgICBgKS5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2F2ZUNvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHBvc3RDb21tZW50KGNvbW1lbnQpO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbW1lbnRzID0gYXN5bmMgKGlkUG9rZW1vbiwgcGFyZW50LCBjb3VudCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50KGlkUG9rZW1vbik7XG4gICAgICAgIGNvdW50LmlubmVyVGV4dCA9IGNvbW1lbnRzLmxlbmd0aDtcbiAgICAgICAgY29tbWVudHMuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1Db21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICBpdGVtQ29tbWVudC5pbm5lckhUTUwgPSBgJHtjb21tZW50LmNyZWF0aW9uX2RhdGV9ICR7Y29tbWVudC51c2VybmFtZX0gOiAke2NvbW1lbnQuY29tbWVudH1gO1xuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtQ29tbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY291bnQuaW5uZXJIVE1MID0gMDtcbiAgICAgICAgcGFyZW50LmlubmVySFRNTCA9ICc8cD5ObyBjb21tZW50IHlldDwvcD4nO1xuICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IHtcbiAgY29uc3RydWN0b3IoaXRlbUlkLCB1c2VyTmFtZSwgY29tbWVudCkge1xuICAgIHRoaXMuaXRlbUlkID0gaXRlbUlkO1xuICAgIHRoaXMudXNlck5hbWUgPSB1c2VyTmFtZTtcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50O1xuICB9XG59IiwiY29uc3QgZ2V0Q29tbWVudCA9IGFzeW5jIChpZFBva2Vtb24pID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvY29tbWVudHM/aXRlbV9pZD0ke2lkUG9rZW1vbn1gKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IG5ldyBFcnJvcihlcnJvcikpO1xuICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGNvbW1lbnRzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9PcFkyV2lRSkJtQTNaSk8wY3BpVi9jb21tZW50cycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBjb21tZW50Lml0ZW1JZCxcbiAgICAgIHVzZXJuYW1lOiBjb21tZW50LnVzZXJOYW1lLFxuICAgICAgY29tbWVudDogY29tbWVudC5jb21tZW50LFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBuZXcgRXJyb3IoZXJyb3IpKTtcbiAgY29uc3QgbXNnID0gYXdhaXQgcmVzcG9uc2U7XG4gIHJldHVybiBtc2c7XG59O1xuXG5jb25zdCBwb3N0TGlrZSA9IGFzeW5jIChwb2tlbW9uSWQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvbGlrZXMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogcG9rZW1vbklkLFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBuZXcgRXJyb3IoZXJyb3IpKTtcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgbGlrZXM7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvT3BZMldpUUpCbUEzWkpPMGNwaVYvbGlrZXMnKTtcblxuICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGlzIG9rXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGlzIG5vdCBlbXB0eVxuICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSA9PT0gJzAnIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XG4gICAgICBsaWtlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWtlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGlrZXMgPSBbXTtcbiAgfVxuICByZXR1cm4gbGlrZXM7XG59O1xuXG5leHBvcnQge1xuICBnZXRDb21tZW50LCBwb3N0Q29tbWVudCwgcG9zdExpa2UsIGdldExpa2VzLFxufTtcbiIsImltcG9ydCBCdWlsZENvbW1lbnRQb3BVcCBmcm9tICcuL2J1aWxkQ29tbWVudFBvcFVwLmpzJztcbmltcG9ydCB7IHBvc3RMaWtlLCBnZXRMaWtlcyB9IGZyb20gJy4vaW52b2x2ZW1lbnRBcGkuanMnO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuXG4vLyBEYXRhIGZyb20gQVBJXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uRGF0YSgpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uP2xpbWl0PTYnKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGEucmVzdWx0cztcbn1cblxuLy8gU3BlY2lmaWMgUG9rZW1vbiBkZXRhaWxzXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uRGV0YWlscyh1cmwpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLy8gSFRNTCBlbGVtZW50cyBmb3IgZWFjaCBQb2tlbW9uXG5hc3luYyBmdW5jdGlvbiBkaXNwbGF5UG9rZW1vbigpIHtcbiAgY29uc3QgcG9rZW1vbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbi1saXN0Jyk7XG4gIGNvbnN0IHBva2Vtb25EYXRhID0gYXdhaXQgZ2V0UG9rZW1vbkRhdGEoKTtcblxuICAvLyBHZXQgdGhlIGxpc3Qgb2YgbGlrZXMgZnJvbSB0aGUgQVBJXG4gIGNvbnN0IGxpa2VzRGF0YSA9IGF3YWl0IGdldExpa2VzKCk7XG5cbiAgbGV0IGNvdW50ID0gMDtcbiAgcG9rZW1vbkRhdGEuZm9yRWFjaChhc3luYyAocG9rZW1vbikgPT4ge1xuICAgIGNvbnN0IGRldGFpbHMgPSBhd2FpdCBnZXRQb2tlbW9uRGV0YWlscyhwb2tlbW9uLnVybCk7XG5cbiAgICBjb25zdCBwb2tlbW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBva2Vtb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bva2Vtb24taXRlbScpO1xuXG4gICAgY29uc3QgcG9rZW1vblRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9rZW1vblRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgcG9rZW1vblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwb2tlbW9uVGl0bGUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG5cbiAgICBjb25zdCBwb2tlbW9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBwb2tlbW9uSW1hZ2Uuc3JjID0gZGV0YWlscy5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG5cbiAgICAvLyBMaWtlIEJ1dHRvblxuICAgIGNvbnN0IGxpa2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGxpa2VJY29uLmNsYXNzTGlzdC5hZGQoJ2xpa2UtaWNvbicsICdmYXInLCAnZmEtaGVhcnQnKTtcblxuICAgIC8vIENyZWF0ZSBhIHNwYW4gdG8gaG9sZCB0aGUgbGlrZXMgY291bnRcbiAgICBjb25zdCBsaWtlc0NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxpa2VzQ291bnQuY2xhc3NMaXN0LmFkZCgnbGlrZXMtY291bnQnKTtcblxuICAgIC8vIENoZWNrIGlmIHRoaXMgcG9rZW1vbiBpcyBpbiB0aGUgbGlzdCBvZiBsaWtlc1xuICAgIGNvbnN0IGxpa2VPYmogPSBsaWtlc0RhdGEuZmluZCgob2JqKSA9PiBvYmouaXRlbV9pZCA9PT0gcG9rZW1vbi5uYW1lKTtcbiAgICBpZiAobGlrZU9iaikge1xuICAgICAgbGlrZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFyJyk7XG4gICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTsgLy8gZmlsbGVkIGhlYXJ0XG4gICAgICBsaWtlc0NvdW50LnRleHRDb250ZW50ID0gbGlrZU9iai5saWtlczsgLy8gdXBkYXRlIGxpa2VzIGNvdW50XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb2tlbW9uVGl0bGVDb250YWluZXIuYXBwZW5kKHBva2Vtb25UaXRsZSwgbGlrZUljb24sIGxpa2VzQ291bnQpOyAvLyBhcHBlbmQgbGlrZXMgY291bnQgdG8gY29udGFpbmVyXG5cbiAgICAvLyBCdXR0b25zIGFuZCBSZXNlcnZhdGlvbiBCdXR0b25zXG4gICAgY29uc3QgY29tbWVudEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbW1lbnRCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgIGNvbW1lbnRCdXR0b24uaWQgPSBgaWRQb2tlbW9uLSR7Y291bnR9YDtcblxuICAgIHBva2Vtb25FbGVtZW50LmFwcGVuZChwb2tlbW9uSW1hZ2UsIHBva2Vtb25UaXRsZUNvbnRhaW5lciwgY29tbWVudEJ1dHRvbik7XG4gICAgcG9rZW1vbkxpc3QuYXBwZW5kKHBva2Vtb25FbGVtZW50KTtcbiAgICBjb3VudCArPSAxO1xuXG4gICAgY29tbWVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBpdGVtSWQgPSBlLnRhcmdldC5pZDtcbiAgICAgIGNvbnN0IHBvcFVwID0gbmV3IEJ1aWxkQ29tbWVudFBvcFVwKHBva2Vtb24sIGRldGFpbHMsIHsgaXRlbUlkIH0pO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcFVwLmVsZW1lbnQucm9vdCk7XG4gICAgICBwb2tlbW9uTGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50IGxpc3RlbmVyIGZvciB0aGUgbGlrZSBidXR0b25cbiAgICBsaWtlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChsaWtlSWNvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhcicpKSB7XG4gICAgICAgIC8vIFBvc3QgdGhlIGxpa2UgdG8gdGhlIEFQSVxuICAgICAgICBhd2FpdCBwb3N0TGlrZShwb2tlbW9uLm5hbWUpO1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGljb24gdG8gZmlsbGVkXG4gICAgICAgIGxpa2VJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgLy8gSW5jcmVtZW50IHRoZSBsaWtlcyBjb3VudFxuICAgICAgICBsaWtlc0NvdW50LnRleHRDb250ZW50ID0gTnVtYmVyKGxpa2VzQ291bnQudGV4dENvbnRlbnQpICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgaWNvbiB0byBlbXB0eVxuICAgICAgICBsaWtlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXMnKTtcbiAgICAgICAgbGlrZUljb24uY2xhc3NMaXN0LmFkZCgnZmFyJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBFeHBvcnQgZnVuY3Rpb25zXG5leHBvcnQgeyBnZXRQb2tlbW9uRGF0YSwgZ2V0UG9rZW1vbkRldGFpbHMsIGRpc3BsYXlQb2tlbW9uIH07XG4iLCJjb25zdCB1cGRhdGVQb2tlbW9uQ291bnRlciA9ICgpID0+IHtcbiAgY29uc3QgcG9rZW1vbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBva2Vtb24taXRlbScpO1xuICBjb25zdCBwb2tlbW9uQ291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbi1jb3VudGVyJyk7XG5cbiAgaWYgKHBva2Vtb25Db3VudGVyRWxlbWVudCkge1xuICAgIHBva2Vtb25Db3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IHBva2Vtb25FbGVtZW50cy5sZW5ndGg7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZVBva2Vtb25Db3VudGVyO1xuIiwiY29uc3QgaGlkZU9yRGlzcGxheUhlYWRlckFuZEZvb3RlciA9ICgpID0+IHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpO1xuICBjb25zdCBwb2tlbW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uLWxpc3QnKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpO1xuICBmb290ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gIHBva2Vtb25MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoaWRlT3JEaXNwbGF5SGVhZGVyQW5kRm9vdGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9sb2dvL3Bva2Vtb24tbG9nby5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDJ2dztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuYm9keSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDAgNHZ3O1xuICBtYXJnaW46IDA7XG59XG5cbi5uYXZiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDkwdnc7XG4gIHBhZGRpbmc6IDAgMXZ3O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGhlaWdodDogNy41dnc7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTAwMDtcbn1cblxuLnBva2Vtb24taXRlbSBpbWcge1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi5jb21tZW50LXBvcC11cCBkaXYgaW1nIHtcbiAgd2lkdGg6IDM1dnc7XG59XG5cbi5uYXZiYXIgLmxvZ28gaW1nIHtcbiAgaGVpZ2h0OiA2dnc7XG59XG5cbi5uYXZiYXIgbmF2IHVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLmNvbW1lbnQtcG9wLXVwIGxpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLmNvbW1lbnQtcG9wLXVwLWRldGFpbHMgdWwgbGkge1xuICB3aWR0aDogNDAlO1xufVxuXG4ubmF2YmFyIG5hdiB1bCBsaSB7XG4gIG1hcmdpbjogMCAxdnc7XG59XG5cbi5uYXZiYXIgbmF2IHVsIGxpIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG4ubGlzdHMgYTpob3ZlciB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubGlzdHMgYS5hY3RpdmUge1xuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcbn1cblxuLm5hdmJhciBuYXYgdWwgbGkgYTpob3ZlciB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubmF2YmFyIG5hdiB1bCBsaSBhLmFjdGl2ZSB7XG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xufVxuXG4ubG9nbyB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICB3aWR0aDogNnZ3O1xuICBoZWlnaHQ6IDZ2dztcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xufVxuXG4uaGVhZGVyIHtcbiAgaGVpZ2h0OiA2dnc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmZvb3RlciB7XG4gIGhlaWdodDogNXZ3O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IGJsYWNrIHNvbGlkIDAuNXZ3O1xuICBwYWRkaW5nOiAwIDF2dztcbn1cblxuLmZvb3RlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDkwdnc7XG4gIGJvcmRlcjogYmxhY2sgc29saWQgMC41dnc7XG4gIHBhZGRpbmc6IDAgMXZ3O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGhlaWdodDogNXZ3O1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IDEwMDA7XG59XG5cbi8qIC0tLS0tLS0tLS0gUE9LRU1PTiBMSVNUIC0tLS0tLS0tLS0gKi9cblxuLnBva2Vtb24tbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi10b3A6IDV2dztcbiAgbWFyZ2luLWJvdHRvbTogNXZ3O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmctdG9wOiA3LjV2dzsgLyogQWRkZWQgdG8gYWNjb3VudCBmb3IgdGhlIG5hdmJhciAqL1xufVxuXG4ucG9rZW1vbi1pdGVtIHtcbiAgZmxleC1iYXNpczogY2FsYygzMCUgLSAyZW0pO1xuICBtYXJnaW46IDFlbTtcbiAgcGFkZGluZzogMmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBoZWlnaHQ6IDUwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiBBZGRlZCB0byBzcGFjZSBvdXQgdGhlIGVsZW1lbnRzICovXG59XG5cbi5jb21tZW50LWJ1dHRvbixcbi5yZXNlcnZhdGlvbi1idXR0b24ge1xuICBtYXJnaW46IDAuNWVtIDA7XG59XG5cbi5saWtlLWljb24ge1xuICBmb250LXNpemU6IDJlbTtcbn1cblxuLnRpdGxlLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi8qIC0tLS0tLS0tLS0gQ09NTUVOVFMgUE9QIFVQIC0tLS0tLS0tLS0gKi9cblxuc3BhbiB7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG59XG5cbi5jb21tZW50LXBvcC11cCB7XG4gIHdpZHRoOiA4MCU7XG4gIG1hcmdpbjogMXZoIGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDF2aCAzdnc7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMC4zcmVtIHNvbGlkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAwLjlyZW07XG59XG5cbi5jb21tZW50LXBvcC11cCA+ICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4ueC1idXR0b24ge1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wb3AtdXAtYnV0dG9uczpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmctcmlnaHQ6IDFyZW07XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuXG4ucG9wLXVwLWJ1dHRvbnM6OmFmdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiAwLjVzO1xufVxuXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXI6OmFmdGVyIHtcbiAgb3BhY2l0eTogMTtcbiAgcmlnaHQ6IDAuNXJlbTtcbn1cblxuLnBvcC11cC1idXR0b25zOmZvY3VzIHtcbiAgY29sb3I6IHJlZDtcbn1cblxuLmNvbW1lbnQtcG9wLXVwIGgyIHtcbiAgZm9udC1zaXplOiA1dnc7XG4gIG1hcmdpbjogMC41cmVtO1xufVxuXG4uY29tbWVudC1wb3AtdXAgaDMge1xuICBmb250LXNpemU6IDR2aDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsOm50aC1jaGlsZCgxKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbiNhYmlsaXRpZXMtbGlzdCBsaSxcbiNzdGF0cy1saXN0IGxpLFxuI2Zvcm1zLWxpc3QgbGksXG4jd2VpZ2h0LWxpc3QgbGkge1xuICBmb250LXNpemU6IDAuN3JlbTtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuXG4uY29tbWVudC1wb3AtdXAtY29tbWVudHMtbnVtYmVyLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNjb21tZW50Q291bnQge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAxLjN2aDtcbn1cblxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gaW5wdXQsXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYSB7XG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0OmhvdmVyLFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gdGV4dGFyZWE6aG92ZXIge1xuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XG4gIGJhY2tncm91bmQ6ICNmOWY3Zjc7XG59XG5cbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGJ1dHRvbiB7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgcGFkZGluZzogMC4ycmVtIDAuNXJlbTtcbn1cblxuLmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLGNBQWM7RUFDZCxlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixNQUFNO0VBQ04sYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlEQUF1RDtFQUN2RCw0QkFBNEI7RUFDNUIsd0JBQXdCO0VBQ3hCLFVBQVU7RUFDVixXQUFXO0VBQ1gsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsY0FBYztFQUNkLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFNBQVM7RUFDVCxhQUFhO0FBQ2Y7O0FBRUEsdUNBQXVDOztBQUV2QztFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZiw2QkFBNkI7RUFDN0IscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixrQkFBa0IsRUFBRSxvQ0FBb0M7QUFDMUQ7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsV0FBVztFQUNYLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLDhCQUE4QixFQUFFLG9DQUFvQztBQUN0RTs7QUFFQTs7RUFFRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjs7QUFFQSwwQ0FBMEM7O0FBRTFDO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsY0FBYztFQUNkLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsZUFBZTtBQUNqQjs7QUFFQTs7OztFQUlFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjs7QUFFQTs7RUFFRSwwQkFBMEI7RUFDMUIscUJBQXFCO0FBQ3ZCOztBQUVBOztFQUVFLDRCQUE0QjtFQUM1QixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDQwMDswLDUwMDswLDYwMDswLDcwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG4qIHtcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDJ2dztcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxufVxcblxcbmJvZHkge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDAgNHZ3O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4ubmF2YmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogOTB2dztcXG4gIHBhZGRpbmc6IDAgMXZ3O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNy41dnc7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiAxMDAwO1xcbn1cXG5cXG4ucG9rZW1vbi1pdGVtIGltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jb21tZW50LXBvcC11cCBkaXYgaW1nIHtcXG4gIHdpZHRoOiAzNXZ3O1xcbn1cXG5cXG4ubmF2YmFyIC5sb2dvIGltZyB7XFxuICBoZWlnaHQ6IDZ2dztcXG59XFxuXFxuLm5hdmJhciBuYXYgdWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi5jb21tZW50LXBvcC11cCBsaSB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAtZGV0YWlscyB1bCBsaSB7XFxuICB3aWR0aDogNDAlO1xcbn1cXG5cXG4ubmF2YmFyIG5hdiB1bCBsaSB7XFxuICBtYXJnaW46IDAgMXZ3O1xcbn1cXG5cXG4ubmF2YmFyIG5hdiB1bCBsaSBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4ubGlzdHMgYTpob3ZlciB7XFxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcXG59XFxuXFxuLmxpc3RzIGEuYWN0aXZlIHtcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcbn1cXG5cXG4ubmF2YmFyIG5hdiB1bCBsaSBhOmhvdmVyIHtcXG4gIGNvbG9yOiByZ2IoMzYsIDk0LCAxODApO1xcbn1cXG5cXG4ubmF2YmFyIG5hdiB1bCBsaSBhLmFjdGl2ZSB7XFxuICBjb2xvcjogcmdiKDM2LCA5NCwgMTgwKTtcXG59XFxuXFxuLmxvZ28ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2Fzc2V0cy9sb2dvL3Bva2Vtb24tbG9nby5wbmcnKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICB3aWR0aDogNnZ3O1xcbiAgaGVpZ2h0OiA2dnc7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgaGVpZ2h0OiA2dnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogNXZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDAuNXZ3O1xcbiAgcGFkZGluZzogMCAxdnc7XFxufVxcblxcbi5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogOTB2dztcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMC41dnc7XFxuICBwYWRkaW5nOiAwIDF2dztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBoZWlnaHQ6IDV2dztcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IDEwMDA7XFxufVxcblxcbi8qIC0tLS0tLS0tLS0gUE9LRU1PTiBMSVNUIC0tLS0tLS0tLS0gKi9cXG5cXG4ucG9rZW1vbi1saXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tdG9wOiA1dnc7XFxuICBtYXJnaW4tYm90dG9tOiA1dnc7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBwYWRkaW5nLXRvcDogNy41dnc7IC8qIEFkZGVkIHRvIGFjY291bnQgZm9yIHRoZSBuYXZiYXIgKi9cXG59XFxuXFxuLnBva2Vtb24taXRlbSB7XFxuICBmbGV4LWJhc2lzOiBjYWxjKDMwJSAtIDJlbSk7XFxuICBtYXJnaW46IDFlbTtcXG4gIHBhZGRpbmc6IDJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGhlaWdodDogNTB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgLyogQWRkZWQgdG8gc3BhY2Ugb3V0IHRoZSBlbGVtZW50cyAqL1xcbn1cXG5cXG4uY29tbWVudC1idXR0b24sXFxuLnJlc2VydmF0aW9uLWJ1dHRvbiB7XFxuICBtYXJnaW46IDAuNWVtIDA7XFxufVxcblxcbi5saWtlLWljb24ge1xcbiAgZm9udC1zaXplOiAyZW07XFxufVxcblxcbi50aXRsZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLyogLS0tLS0tLS0tLSBDT01NRU5UUyBQT1AgVVAgLS0tLS0tLS0tLSAqL1xcblxcbnNwYW4ge1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwIHtcXG4gIHdpZHRoOiA4MCU7XFxuICBtYXJnaW46IDF2aCBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAxdmggM3Z3O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogMC4zcmVtIHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAgPiAqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi54LWJ1dHRvbiB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucG9wLXVwLWJ1dHRvbnM6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xcbiAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5wb3AtdXAtYnV0dG9uczo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxufVxcblxcbi5wb3AtdXAtYnV0dG9uczpob3Zlcjo6YWZ0ZXIge1xcbiAgb3BhY2l0eTogMTtcXG4gIHJpZ2h0OiAwLjVyZW07XFxufVxcblxcbi5wb3AtdXAtYnV0dG9uczpmb2N1cyB7XFxuICBjb2xvcjogcmVkO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXAgaDIge1xcbiAgZm9udC1zaXplOiA1dnc7XFxuICBtYXJnaW46IDAuNXJlbTtcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwIGgzIHtcXG4gIGZvbnQtc2l6ZTogNHZoO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbi5jb21tZW50LXBvcC11cC1kZXRhaWxzIHVsOm50aC1jaGlsZCgxKSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbiNhYmlsaXRpZXMtbGlzdCBsaSxcXG4jc3RhdHMtbGlzdCBsaSxcXG4jZm9ybXMtbGlzdCBsaSxcXG4jd2VpZ2h0LWxpc3QgbGkge1xcbiAgZm9udC1zaXplOiAwLjdyZW07XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi5jb21tZW50LXBvcC11cC1jb21tZW50cy1udW1iZXItY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2NvbW1lbnRDb3VudCB7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxufVxcblxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBoMyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMS4zdmg7XFxufVxcblxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIGlucHV0LFxcbi5jb21tZW50LXBvcC11cF9mb3JtX2NvbnRhaW5lciBmb3JtIHRleHRhcmVhIHtcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbn1cXG5cXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSBpbnB1dDpob3ZlcixcXG4uY29tbWVudC1wb3AtdXBfZm9ybV9jb250YWluZXIgZm9ybSB0ZXh0YXJlYTpob3ZlciB7XFxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCAjMmIyODI4O1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgYmFja2dyb3VuZDogI2Y5ZjdmNztcXG59XFxuXFxuLmNvbW1lbnQtcG9wLXVwX2Zvcm1fY29udGFpbmVyIGZvcm0gYnV0dG9uIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDAuMnJlbSAwLjVyZW07XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCB7IGRpc3BsYXlQb2tlbW9uIH0gZnJvbSAnLi9tb2R1bGUvcG9rZW1vbi5qcyc7XG5pbXBvcnQgdXBkYXRlUG9rZW1vbkNvdW50ZXIgZnJvbSAnLi9tb2R1bGUvcG9rZW1vbkNvdW50ZXIuanMnO1xuXG4vLyBBaG9yYSBwdWVkZXMgdXNhciBsYSBmdW5jacOzbiBkaXNwbGF5UG9rZW1vbiB5IHVwZGF0ZVBva2Vtb25Db3VudGVyIGVuIHR1IGluZGV4LmpzXG5kaXNwbGF5UG9rZW1vbigpLnRoZW4oKCkgPT4gdXBkYXRlUG9rZW1vbkNvdW50ZXIoKSk7XG4iXSwibmFtZXMiOlsiQ29tbWVudCIsImdldENvbW1lbnQiLCJwb3N0Q29tbWVudCIsImhpZGVPckRpc3BsYXlIZWFkZXJBbmRGb290ZXIiLCJCdWlsZENvbW1lbnRQb3BVcCIsImNvbnN0cnVjdG9yIiwicG9rZW1vbiIsImRldGFpbHMiLCJmZWF0dXJlcyIsImVsZW1lbnQiLCJyb290IiwiY3JlYXRlUm9vdCIsImltYWdlIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInNwcml0ZXMiLCJmcm9udF9kZWZhdWx0IiwicG9rZW1vbk5hbWUiLCJpbm5lclRleHQiLCJuYW1lIiwicG9rZW1vbkFiaWxpdGllcyIsImFiaWxpdGllcyIsImFiaWxpdGllc0xpc3QiLCJmb3JFYWNoIiwiYWJpbGl0eSIsIml0ZW1BYmlsaXR5IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJmb3JtTGlzdCIsInBva2Vtb25Gb3JtIiwiZm9ybXMiLCJmb3JtIiwiaXRlbUZvcm0iLCJzdGF0c0xpc3QiLCJwb2tlbW9uU3RhdHMiLCJzdGF0cyIsInN0YXQiLCJpdGVtU3RhdCIsImJhc2Vfc3RhdCIsIndlaWdodExpc3QiLCJpdGVtV2VpZ2h0Iiwid2VpZ2h0IiwiY29tbWVudExpc3QiLCJudW1iZXJPZkNvbW1lbnRzIiwiZ2V0Q29tbWVudHMiLCJpdGVtSWQiLCJ1c2VyTmFtZSIsImNvbW1lbnQiLCJzdWJtaXRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJ0cmltIiwiY29tbWVudENvbnRlbnQiLCJzYXZlQ29tbWVudCIsInJlc2V0Iiwic2V0VGltZW91dCIsInhCdXR0b24iLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZSIsImJvZHkiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJjaGlsZHJlbiIsIm1lc3NhZ2UiLCJpZFBva2Vtb24iLCJwYXJlbnQiLCJjb3VudCIsImNvbW1lbnRzIiwibGVuZ3RoIiwiaXRlbUNvbW1lbnQiLCJpbm5lckhUTUwiLCJjcmVhdGlvbl9kYXRlIiwidXNlcm5hbWUiLCJlcnJvciIsInJlc3BvbnNlIiwiZmV0Y2giLCJjYXRjaCIsIkVycm9yIiwianNvbiIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJpdGVtX2lkIiwiaGVhZGVycyIsIm1zZyIsInBvc3RMaWtlIiwicG9rZW1vbklkIiwicmVzdWx0IiwiZ2V0TGlrZXMiLCJsaWtlcyIsIm9rIiwic3RhdHVzIiwiZ2V0IiwiY29udGFpbmVyIiwiZ2V0UG9rZW1vbkRhdGEiLCJkYXRhIiwicmVzdWx0cyIsImdldFBva2Vtb25EZXRhaWxzIiwidXJsIiwiZGlzcGxheVBva2Vtb24iLCJwb2tlbW9uTGlzdCIsInBva2Vtb25EYXRhIiwibGlrZXNEYXRhIiwicG9rZW1vbkVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwb2tlbW9uVGl0bGVDb250YWluZXIiLCJwb2tlbW9uVGl0bGUiLCJ0ZXh0Q29udGVudCIsInBva2Vtb25JbWFnZSIsImxpa2VJY29uIiwibGlrZXNDb3VudCIsImxpa2VPYmoiLCJmaW5kIiwib2JqIiwicmVtb3ZlIiwiYXBwZW5kIiwiY29tbWVudEJ1dHRvbiIsImlkIiwidGFyZ2V0IiwicG9wVXAiLCJjb250YWlucyIsIk51bWJlciIsInVwZGF0ZVBva2Vtb25Db3VudGVyIiwicG9rZW1vbkVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInBva2Vtb25Db3VudGVyRWxlbWVudCIsImZvb3RlciIsImhlYWRlciIsInRvZ2dsZSIsInRoZW4iXSwic291cmNlUm9vdCI6IiJ9