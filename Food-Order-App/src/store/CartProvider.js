import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items : [],
  totalAmount : 0
}
const cartReducer = (state, action) => {
  if(action.type === 'ADD_ITEM') {
    let updatedTotalAmount = state.totalAmount + action.items.amount * action.items.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.items.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.items.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.items);
    }
    
    return {
      items: updatedItems,
      totalAmount : updatedTotalAmount
    }
  }
  if(action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price; 
    let updatedItems;
    if(existingCartItem.amount === 1) {
      updatedItems= state.items.filter((item) => item.id !== action.id)
    }
    else {
      const updatedItem = { ...existingCartItem, amount : existingCartItem.amount- 1}
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

    }
    return {
      items: updatedItems,
      totalAmount : updatedTotalAmount
    }

  }
  

  return defaultCartState;
}

const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', items:item})
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id:id})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
