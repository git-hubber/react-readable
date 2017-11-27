import {
  GET_POSTS,
  VOTE_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/types';

const defaultPosts = [];

export default (state = defaultPosts, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts.reduce((postsObj, post) => {
        if (!post.deleted) {
          postsObj[post.id] = post;
        }
        return postsObj;
      }, {});

    case ADD_POST:
    case EDIT_POST:
    case VOTE_POST:
      return {
        ...state,
        [action.post.id]: action.post,
      };

    case DELETE_POST:
      return Object.keys(state).reduce((postsObj, postID) => {
        if (action.deletedPostID !== postID) {
          postsObj[postID] = state[postID];
        }
        return postsObj;
      }, {});

    default:
      return state;
  }
};
