import {
  getItemsAPI,
  voteAPI,
  addAPI,
  editAPI,
  deleteAPI,
} from '../utils/api';

import {
  GET_POSTS,
  VOTE_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
} from './types';

const getPosts = posts => ({
  type: GET_POSTS,
  posts,
});

export const startGetPosts = (categories = '') => (dispatch) => {
  getItemsAPI(categories, true)
    .then((posts) => dispatch(getPosts(posts)));
};

const votePost = (post) => ({
  type: VOTE_POST,
  post,
});

export const startVotePost = (id, option) => (dispatch) => {
  voteAPI(id, option, true)
    .then((post) => dispatch(votePost(post)));
};

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const startAddPost = (post) => (dispatch) => {
  addAPI(post, true)
    .then((newPost) => dispatch(addPost(newPost)));
};

const editPost = (post) => ({
  type: EDIT_POST,
  post,
});

export const startEditPost = (post) => (dispatch) => {
  editAPI(post, true)
    .then((editedPost) => dispatch(editPost(editedPost)));
};

const deletePost = (deletedPostID) => ({
  type: DELETE_POST,
  deletedPostID,
});

export const startDeletePost = (id) => (dispatch) => {
  deleteAPI(id, true)
    .then((deletedPostID) => dispatch(deletePost(deletedPostID)));
};
