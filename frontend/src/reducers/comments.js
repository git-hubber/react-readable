import {
  GET_POST_COMMENTS,
  VOTE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
} from '../actions/types';

const defaultComments = [];

export default (state = defaultComments, action) => {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return action.comments.reduce((commentsObj, comment) => {
        if (!comment.deleted) {
          commentsObj[comment.id] = comment;
        }
        return commentsObj;
      }, {});

    case ADD_COMMENT:
    case EDIT_COMMENT:
    case VOTE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment,
      };

    case DELETE_COMMENT:
      return Object.keys(state).reduce((commentsObj, commentID) => {
        if (action.deletedCommentID !== commentID) {
          commentsObj[commentID] = state[commentID];
        }
        return commentsObj;
      }, {});

    default:
      return state;
  }
};
