import classes from './MealItemForm.module.css';
import { Input } from '../../UI/Input';
import { useRef, useState } from 'react';

export const MealItemForm = ({ mealId, onAddToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(+enteredAmount);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        // Need to forward this ref.
        ref={amountInputRef}
        label='Amount'
        input={{
          id: mealId,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};
