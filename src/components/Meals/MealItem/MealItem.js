import classes from './MealItem.module.css';
import { MealItemForm } from './MealItemForm';
import { useContext } from 'react';
import { CartContext } from '../../../store/cart-context.js';

export const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      amount: +amount,
      price: meal.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>${meal.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} mealId={meal.id} />
      </div>
    </li>
  );
};
