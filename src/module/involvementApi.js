const getComment = async (idPokemon) => {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/comments?item_id=${idPokemon}`)
    .catch((error) => new Error(error));
    const comments = await response.json();
    return comments;
}

const postComment = async (comment) => {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpY2WiQJBmA3ZJO0cpiV/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
     })
    .catch((error) => new Error(error));
    const msg = await response;
    return msg;
  };



export {getComment, postComment}
  
    
