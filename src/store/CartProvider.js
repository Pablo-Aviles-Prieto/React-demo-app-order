import { CartContext } from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      // If the item added to cart exists already in the items property, we create a new obj, increasing the amount accordingly, since this obj is the one thats gonna replace the old one with the same id.
      // Then, we create a copy of the array of the previous state of items, and exchange the obj with the previous amount by the new obj we just created.
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.item];
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case 'REMOVE':
      const existingCartItemIndexRem = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItemRem = state.items[existingCartItemIndexRem];
      const updatedTotalAmountRem =
        state.totalAmount - existingCartItemRem.price;

      let updatedItemsRem;

      if (+existingCartItemRem.amount === 1) {
        updatedItemsRem = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItemRem = {
          ...existingCartItemRem,
          amount: +existingCartItemRem.amount - 1,
        };
        updatedItemsRem = [...state.items];
        updatedItemsRem[existingCartItemIndexRem] = updatedItemRem;
      }

      // In the remove case, for the totalAmount, when we delete the last item in the cart, it return -0.00$, so we kinda patch with this.
      return {
        items: updatedItemsRem,
        totalAmount: updatedTotalAmountRem === 0 ? 0.0 : updatedTotalAmountRem,
      };
    default:
      return defaultCartState;
  }
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
