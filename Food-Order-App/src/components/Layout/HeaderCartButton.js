import CartIcon from '../Cart/CartIcon';
import {Fragment, useEffect,useContext, useState} from 'react';
import './HeaderCartButton.css'
import CartContext from '../../store/cart-context';

const HeaderCart = (props) => {

    const[btnHighlighted, setBtnHighlighted] = useState(false)

    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const noOfItemsInCart = items.reduce((currNum,item) => {
        return currNum += item.amount
    }, 0)
    
    const btnClass = `headerbutton ${btnHighlighted ? 'bump' : ''}`;
    console.log(btnClass);
    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnHighlighted(true);
        const timer = setTimeout(()=> {
            setBtnHighlighted(false)
        },300);
        
        return () => {
            clearTimeout(timer);
        }
    },[items])

    return (
        <Fragment>
        <button className={btnClass} onClick={props.onClick}>
            <span className='icon'>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className='badge'>{noOfItemsInCart}</span>
        </button>
        </Fragment>
    )
}

export default HeaderCart;