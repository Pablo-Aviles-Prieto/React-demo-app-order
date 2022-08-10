import { CartIcon } from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../store/cart-context';

export const HeaderCartButton = ({ onShowCart }) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce(
    (currentNum, item) => currentNum + item.amount,
    0
  );

  // We want this to set the classes. (bump will be conditional rendered by )
  // Whenever the state changes (with useEffect), it will re evaluate this component, so this btnClasses will check again and add the class if necessary.
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  // We set as dependency the array of items in the cart, so we execute it with any change, except when the length of the array is set to 0 (after deleting items in the cart), since we dont want to display the animation in this case.
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    // We need to set a timer to remove the bump class (after the 300ms of animation), otherwise it would only make the animation the 1st time.
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // We settle this clean up Fn so it reset the previous timer just in case, and create the new one everytime items array changes.
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button onClick={onShowCart} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
