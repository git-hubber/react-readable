import React from 'react';

const ItemVote = ({ castVote, voteScore }) => (
  <div className='item-vote'>
    <button
      onClick={() => castVote('upVote')}
      className='button-link'
    >
▲
    </button>
    <div>{voteScore}</div>
    <button
      onClick={() => castVote('downVote')}
      className='button-link'
    >
▼
    </button>
  </div>

);

export default ItemVote;
