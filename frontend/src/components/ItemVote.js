import React from 'react';

const ItemVote = ({ castVote, voteScore }) => (
  <div>
    <button
      onClick={() => castVote('upVote')}
    >
  upVote
    </button>
    <button
      onClick={() => castVote('downVote')}
    >
  downVote
    </button>{voteScore}
  </div>
);

export default ItemVote;
