import React from 'react';

const ItemFooter = ({ openModal, deleteItem }) => (
  <div>
    <button
      onClick={openModal}
    >Edit
    </button>
    <button
      onClick={deleteItem}
    >Delete
    </button>
  </div>
);

export default ItemFooter;
