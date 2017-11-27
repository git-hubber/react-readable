import {
  SET_SORTING_TYPE,
  SET_SORTING_DIRECTION,
  SET_FILTER,
} from './types';

export const setSortingType = (sortType) => ({
  type: SET_SORTING_TYPE,
  sortType,
});

export const setSortingDirection = (sortDirection) => ({
  type: SET_SORTING_DIRECTION,
  sortDirection,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
});
