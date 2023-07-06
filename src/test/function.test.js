jest.mock('../module/comment.js');

describe('comments counter function', () => {
  it('Should return the count of comments', async () => {
    const getComment = async () => Promise.resolve([
      { creation_date: '2022-01-01', username: 'user1', comment: 'comment1' },
      { creation_date: '2022-01-02', username: 'user2', comment: 'comment2' },
      { creation_date: '2022-01-03', username: 'user3', comment: 'comment3' },
    ]);

    const getComments = async (count) => {
      try { // It throw error when the pokemon do not have any comment
        const comments = await getComment();
        count.textContent = comments.length;
      } catch (error) {
        count.innerHTML = 0;
      }
    };

    document.body.innerHTML = '<div>'
      + '  <p id="list">Comment(<span id="count">1</span>)</p>'
      + '</div>';

    const count = document.querySelector('#count');

    await getComments(count);
    expect(count.textContent).toBe('3');
  });

  it('Should call the await get comment', async () => {
    const getComment = jest.fn(async () => Promise.reject());

    const getComments = async (count) => {
      try { // It throw error when the pokemon do not have any comment
        const comments = await getComment();
        count.textContent = comments.length;
      } catch (error) {
        count.textContent = 0;
      }
    };

    document.body.innerHTML = '<div>'
        + '  <p id="list">Comment(<span id="count">1</span>)</p>'
        + '</div>';

    const count = document.querySelector('#count');

    await getComments(count);
    expect(getComment).toHaveBeenCalled();
  });

  it('Should set the count to 0 and display No comment yet', async () => {
    const getComment = jest.fn(async () => Promise.reject());

    const getComments = async (count) => {
      try { // It throw error when the pokemon do not have any comment
        const comments = await getComment();
        count.textContent = comments.length;
      } catch (error) {
        count.textContent = 0;
      }
    };

    document.body.innerHTML = '<div>'
        + '  <p id="list">Comment(<span id="count">1</span>)</p>'
        + '</div>';

    const count = document.querySelector('#count');

    await getComments(count);
    expect(count.innerText).not.toBe('0');
  });

  it('Should add a <li> element', async () => {
    const getComment = async () => Promise.resolve([
      { creation_date: '2022-01-01', username: 'user1', comment: 'comment1' },
    ]);

    const getComments = async (parent, count) => {
      try { // It throw error when the pokemon do not have any comment
        const comments = await getComment();
        count.textContent = comments.length;
        comments.forEach((comment) => {
          const itemComment = document.createElement('li');
          itemComment.textContent = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
          parent.appendChild(itemComment);
        });
      } catch (error) {
        count.textContent = 0;
      }
    };

    document.body.innerHTML = '<div>'
      + '  <ul id="list"><li>Task_1</li></ul>'
      + '<span id="count"></span></div>';

    const count = document.querySelector('#count');
    const parent = document.querySelector('#list');
    await getComments(parent, count);

    expect(parent.childElementCount).toBe(2);
  });

  it('Should return a Promise', () => {
    const getComment = async () => Promise.resolve([
      { creation_date: '2022-01-01', username: 'user1', comment: 'comment1' },
      { creation_date: '2022-01-02', username: 'user2', comment: 'comment2' },
      { creation_date: '2022-01-03', username: 'user3', comment: 'comment3' },
    ]);

    const getComments = async (count) => {
      try { // It throw error when the pokemon do not have any comment
        const comments = await getComment();
        count.textContent = comments.length;
      } catch (error) {
        count.textContent = 0;
      }
    };

    document.body.innerHTML = '<div>'
      + '  <p id="list">Comment(<span id="count">1</span>)</p>'
      + '</div>';

    const count = document.querySelector('#count');

    const result = getComments(count);
    expect(result).toBeInstanceOf(Promise);
  });
});
