import React from 'react';

const ItemFooter = ({ openModal, deleteItem }) => (
  <div id='itemFooter'>
    <button
      className='button'
      onClick={openModal}
    >Edit
    </button>
    <button
      className='button button-danger'
      onClick={deleteItem}
    >Delete
    </button>
  </div>
);

export default ItemFooter;
