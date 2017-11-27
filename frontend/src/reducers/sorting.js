import {
  SET_SORTING_TYPE,
  SET_SORTING_DIRECTION,
  SET_FILTER,
} from '../actions/types';

const defaultSort = {
  type: 'score',
  direction: 'desc',
  filter: 'all',
};

export default (state = defaultSort, action) => {
  switch (action.type) {
    case SET_SORTING_TYPE:
      return {
        ...state,
        type: action.sortType,
      };

    case SET_SORTING_DIRECTION:
      return {
        ...state,
        direction: action.sortDirection,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  }
};
