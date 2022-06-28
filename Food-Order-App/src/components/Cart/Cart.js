import "./Cart.css";
import Model from "../UI/Model";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from './CartItem'

const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const totalAmount = `INR ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

    const orderHandler = () => {
        console.log('your Order will be delevered soon....');
        props.onClsoe();
    }

    const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
      cartCtx.addItem(item)
    }



  const cartItem = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => {
        return (<CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(this,item.id)} onAdd={cartItemAddHandler.bind(this,item)}/>)
      })}
    </ul>
  );

  return (
    <Model onClick={props.onClsoe}>
        {cartItem}
        <div className="total">
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className="actions">
            <button className="button--alt" onClick={props.onClsoe}>Close</button>
            {hasItem && <button className="button" onClick={orderHandler}>Order</button>}
        </div>
    </Model>
  );
};

export default Cart;
