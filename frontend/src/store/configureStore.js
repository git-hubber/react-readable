import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import postsReducer from '../reducers/posts';
import sortingReducer from '../reducers/sorting';
import categoriesReducer from '../reducers/categories';
import commentsReducer from '../reducers/comments';
import { startGetPosts } from '../actions/posts';
import { startGetCategories } from '../actions/categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (props) => {
  const store = createStore(
    combineReducers({
      posts: postsReducer,
      sorting: sortingReducer,
      categories: categoriesReducer,
      form: formReducer,
      comments: commentsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  // fetch initial state
  store.dispatch(startGetPosts());
  store.dispatch(startGetCategories());

  return store;
};
