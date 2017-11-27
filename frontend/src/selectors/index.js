export const selector = (postsObj, category, sorting) => {
  let postsArray = Object.keys(postsObj).map(postId => postsObj[postId]);

  if (sorting.filter === 'nonSpam') {
    postsArray = postsArray.reduce((posts, post) => {
      if (post.voteScore >= 0) posts.push(post);
      return posts;
    }, []);
  }

  if (category) {
    postsArray = postsArray.reduce((posts, post) => {
      if (post.category === category) posts.push(post);
      return posts;
    }, []);
  }

  postsArray.sort((a, b) => {
    switch (`${sorting.type}-${sorting.direction}`) {
      case 'time-asc':
        if (a.timestamp > b.timestamp) return 1;
        else if (a.timestamp === b.timestamp) return 0;
        return -1;

      case 'time-desc':
        if (a.timestamp > b.timestamp) return -1;
        else if (a.timestamp === b.timestamp) return 0;
        return 1;

      case 'score-asc':
        if (a.voteScore > b.voteScore) return 1;
        else if (a.voteScore === b.voteScore) return 0;
        return -1;

      case 'score-desc':
      default:
        if (a.voteScore > b.voteScore) return -1;
        else if (a.voteScore === b.voteScore) return 0;
        return 1;
    }
  });

  return postsArray;
};
