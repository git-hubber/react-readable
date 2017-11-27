import {
  getItemsAPI,
  voteAPI,
  deleteAPI,
  addAPI,
  editAPI,
} from '../utils/api';

import {
  GET_POST_COMMENTS,
  VOTE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
} from './types';

const getPostComments = (comments) => ({
  type: GET_POST_COMMENTS,
  comments,
});

export const startGetPostComments = id => dispatch => {
  getItemsAPI(id, false)
    .then((comments) => dispatch(getPostComments(comments)));
};

const voteComment = (comment) => ({
  type: VOTE_COMMENT,
  comment,
});

export const startVoteComment = (id, option) => (dispatch) => {
  voteAPI(id, option, false)
    .then((comment) => dispatch(voteComment(comment)));
};

const deleteComment = (deletedCommentID) => ({
  type: DELETE_COMMENT,
  deletedCommentID,
});

export const startDeleteComment = (id) => (dispatch) => {
  deleteAPI(id, false)
    .then((deletedCommentID) => dispatch(deleteComment(deletedCommentID)));
};

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const startAddComment = (comment) => (dispatch) => {
  addAPI(comment, false)
    .then((newComment) => dispatch(addComment(newComment)));
};

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

export const startEditComment = (comment) => (dispatch) => {
  editAPI(comment, false)
    .then((editedComment) => dispatch(editComment(editedComment)));
};
