import React from 'react';
import { connect } from 'react-redux';

import {
  setSortingType,
  setSortingDirection,
  setFilter,
} from '../actions/sorting';

const SortingHeader = ({ setSortingType, setSortingDirection, setFilter, sortType, filter }) => {
  const _handleSortType = (sortType) => {
    setSortingType(sortType);
  };

  const _handleSortDirection = (sortDirection) => {
    setSortingDirection(sortDirection);
  };

  const _handleFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <div>
      <div>
          Sorting: by

        <label htmlFor="sortScore">
          <input
            type="radio"
            id="sortScore"
            onChange={() => _handleSortType('score')}
            checked={sortType === 'score' ? 'checked' : ''}
          />
            Score
        </label>
        <label htmlFor="sortTime">
          <input
            type="radio"
            id="sortTime"
            onChange={() => _handleSortType('time')}
            checked={sortType === 'time' ? 'checked' : ''}
          />
            Time
        </label>
      </div>
      <div>
          Sorting: direction
        <button
          onClick={() => _handleSortDirection('asc')}
        > Asc
        </button>
        <button
          onClick={() => _handleSortDirection('desc')}
        > Desc
        </button>
      </div>
      <div>
        Filter: by

        <label htmlFor="filterAll">
          <input
            type="radio"
            onChange={() => _handleFilter('all')}
            checked={filter === 'all' ? 'checked' : ''}
          />
          All
        </label>
        <label htmlFor="filterNonSpam">
          <input
            type="radio"
            onChange={() => _handleFilter('nonSpam')}
            checked={filter === 'nonSpam' ? 'checked' : ''}
          />
          Non-Spam
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sorting }) => ({
  sortType: sorting.type,
  sortDirection: sorting.direction,
  filter: sorting.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setSortingType: (sortType) => dispatch(setSortingType(sortType)),
  setSortingDirection: (sortDirection) => dispatch(setSortingDirection(sortDirection)),
  setFilter: (filter) => dispatch(setFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingHeader);
