import Comment from './comment.js';
import { getComment, postComment } from './involvementApi.js';
import hideOrDisplayHeaderAndFooter from './viewFunctions.js';

export default class BuildCommentPopUp {
  constructor(pokemon, details, features) {
    hideOrDisplayHeaderAndFooter();

    this.element = {};
    this.element.root = BuildCommentPopUp.createRoot();
    //pokemon image
    this.element.image = this.element.root.querySelector('#image-pokemon');
    this.element.image.src = details.sprites.front_default;
    //pokemon name, the title on the pop-up
    this.element.pokemonName = this.element.root.querySelector('#pokemon-name');
    this.element.pokemonName.innerText = pokemon.name;
    //!List of Pokemon's Features
    const pokemonAbilities = details.abilities;
    // 1) abilities : Because we don't know the exact number of abilities of each pokemon
    this.element.abilitiesList = this.element.root.querySelector('#abilities-list');
    pokemonAbilities.forEach((ability) => {
      const itemAbility = document.createElement('li');
      itemAbility.innerText = ability.ability.name;
      this.element.abilitiesList.appendChild(itemAbility);
    });
    // 2) Forms
    this.element.formList = this.element.root.querySelector('#forms-list');
    const pokemonForm = details.forms;
    pokemonForm.forEach((form) => {
      const itemForm = document.createElement('li');
      itemForm.innerText = form.name;
      this.element.formList.appendChild(itemForm);
    });
    // 3) Stats
    this.element.statsList = this.element.root.querySelector('#stats-list');
    const pokemonStats = details.stats;
    pokemonStats.forEach((stat) => {
      const itemStat = document.createElement('li');
      itemStat.innerText = `${stat.stat.name} : ${stat.base_stat}`;
      this.element.statsList.appendChild(itemStat);
    });

    // 4) Weight
    this.element.weightList = this.element.root.querySelector('#weight-list');
    const itemWeight = document.createElement('li');
    itemWeight.innerText = details.weight;
    this.element.weightList.appendChild(itemWeight);
    //!Comment list
    this.element.commentList = this.element.root.querySelector('#comment-list');
    this.element.numberOfComments = this.element.root.querySelector('#commentCount');
    BuildCommentPopUp.getComments(
      features.itemId, //Use a obj as parameter in case we can need others parameters in futur
      this.element.commentList,
      this.element.numberOfComments,
    );
    //!Form
    this.element.form = this.element.root.querySelector('form');
    this.element.userName = this.element.root.querySelector('#comment-pop-up_input_name');
    this.element.comment = this.element.root.querySelector('#comment-pop-up_textarea_content');
    this.element.submitButton = this.element.root.querySelector('#comment-pop-up_submit');
    //On submit
    this.element.submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userName = this.element.userName.value.trim();
      const commentContent = this.element.comment.value.trim();
      const comment = new Comment(features.itemId, userName, commentContent);
      BuildCommentPopUp.saveComment(comment);
      this.element.commentList.innerText = ''//Empty the comments container
      this.element.form.reset();
      setTimeout(() => {//Waiting as the POST method is finishing to save the new comment
        BuildCommentPopUp.getComments(//before do GET it.
          features.itemId,//It's should be better to use a callback function lol
          this.element.commentList,
          this.element.numberOfComments,
        );
      }, 1000);
    });
    //!Call of the x-button
    this.element.xButton = this.element.root.querySelector('.x-button');
    this.element.xButton.addEventListener('click', () => {
      this.element.root.parentElement.removeChild(this.element.root);
      hideOrDisplayHeaderAndFooter();
    });
  }
    //!Create the layout of the pop-up
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
    }
    //Did this because we need a async function to use the await keyword
    static saveComment = async (comment) => {
      const message = await postComment(comment);
      return message;
    }

    static getComments = async (idPokemon, parent, count) => {
      try {//It throw error when the pokemon do not have any comment
        const comments = await getComment(idPokemon);
        count.innerText = comments.length;
        comments.forEach((comment) => {
          const itemComment = document.createElement('li');
          itemComment.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
          parent.appendChild(itemComment);
        });
      } catch (error) {
        count.innerHTML = 0;
        parent.innerHTML = '<p>No comment yet</p>';
      }
    }
}