import React from 'react';
import { connect } from 'react-redux';

import {
  setSortingType,
  setSortingDirection,
  setFilter,
} from '../actions/sorting';

const SortingHeader = ({
  setSortingType,
  setSortingDirection,
  setFilter,
  sortDirection,
  sortType,
  filter,
}) => {
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
    <div id="sortingHeader">
      <div>
        Sort by
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
        <span>in</span>
        <button
          className={`button${sortDirection !== 'asc' ? ' button-secondary' : ''}`}
          onClick={() => _handleSortDirection('asc')}
        > Ascending
        </button>
        <button
          className={`button${sortDirection !== 'desc' ? ' button-secondary' : ''}`}
          onClick={() => _handleSortDirection('desc')}
        > Descending
        </button>
        <span>order</span>
      </div>
      <div>
        Show
        <label htmlFor="filterAll">
          <input
            type="radio"
            id='filterAll'
            onChange={() => _handleFilter('all')}
            checked={filter === 'all' ? 'checked' : ''}
          />
          All
        </label>
        <label htmlFor="filterNonSpam">
          <input
            id='filterNonSpam'
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
