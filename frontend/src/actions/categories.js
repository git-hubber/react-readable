import {
  getCategoriesAPI,
} from '../utils/api';

import {
  GET_CATEGORIES,
} from './types';

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories,
});

export const startGetCategories = () => (dispatch) => {
  getCategoriesAPI()
    .then((categories) => dispatch(getCategories(categories)));
};
