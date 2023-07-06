const getComments = async (count) => {
    try {//It throw error when the pokemon do not have any comment
      const comments = await getComment();
      count.textContent = comments.length;
    } catch (error) {
      count.innerHTML = 0;
    }
  }
  const getComment = async () => {
    return Promise.resolve([
        { creation_date: '2022-01-01', username: 'user1', comment: 'comment1' },
        { creation_date: '2022-01-02', username: 'user2', comment: 'comment2' },
        { creation_date: '2022-01-03', username: 'user3', comment: 'comment3' }
    ])
  };

  
  export default function request(url) {
    return new Promise((resolve, reject) => {
      const userID = parseInt(url.substr('/users/'.length), 10);
      process.nextTick(() =>
        users[userID]
          ? resolve(users[userID])
          : reject({
              error: `User with ${userID} not found.`,
            }),
      );
    });
  }

  export {getComments}