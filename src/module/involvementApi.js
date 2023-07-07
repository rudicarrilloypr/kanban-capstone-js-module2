const getComment = async (idPokemon) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/comments?item_id=${idPokemon}`)
    .catch((error) => new Error(error));
  const comments = await response.json();
  return comments;
};

const postComment = async (comment) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: comment.itemId,
      username: comment.userName,
      comment: comment.comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .catch((error) => new Error(error));
  const msg = await response;
  return msg;
};

const postLike = async (pokemonId) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: pokemonId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .catch((error) => new Error(error));

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

export {
  getComment, postComment, postLike, getLikes,
};
