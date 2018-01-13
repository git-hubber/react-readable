import axios from 'axios';
import uuid from 'uuid';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_AXIOS = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { Authorization: '2RL46UCTTS115XK6RUWR' },
});

export const getCategoriesAPI = () => BASE_AXIOS.get('categories')
  .then((response) => response.data.categories)
  .catch((error) => {
    console.log(error);
  });

export const getItemsAPI = (id = '', post = true) => {
  let path = '';
  if (post) {
    path = '/posts';
    if (id) {
      path = `${id}${path}`;
    }
  } else {
    path = `posts/${id}/comments`;
  }

  return BASE_AXIOS.get(path)
    .then(response => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const voteAPI = (id, option, post = true) => {
  let path = '';
  if (post) {
    path = `posts/${id}`;
  } else {
    path = `comments/${id}`;
  }

  return BASE_AXIOS.post(path, { option })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const addAPI = (item, post = true) => {
  let path = '';
  if (post) {
    path = 'posts/';
  } else {
    path = 'comments/';
  }

  return BASE_AXIOS.post(path, {
    ...item,
    id: uuid(),
    timestamp: Date.now(),
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const editAPI = ({ id, title, body }, post = true) => {
  let path = '';
  let item = {};

  if (post) {
    item = {
      id,
      title,
      body,
    };

    path = `posts/${id}`;
  } else {
    item = {
      id,
      body,
    };

    path = `comments/${id}`;
  }

  return BASE_AXIOS.put(path, item)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAPI = (id, post = true) => {
  let path = '';
  if (post) {
    path = `posts/${id}`;
  } else {
    path = `comments/${id}`;
  }

  return BASE_AXIOS.delete(path)
    .then((response) => response.data.id)
    .catch((error) => {
      console.log(error);
    });
};
