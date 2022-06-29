import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (_item) => { /* TODO document why this method 'addItem' is empty */ },
  removeItem: (_id) => {/* TODO document why this method 'addItem' is empty */},
  clearCart: () => {/* TODO document why this method 'addItem' is empty */}
});

export default CartContext;