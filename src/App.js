import { Cart } from './components/Cart/Cart';
import { Header } from './components/Layout/Header';
import { Meals } from './components/Meals/Meals';
import { useState } from 'react';
import { CartProvider } from './store/CartProvider';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showHideCartHandler = () => {
    setCartIsShown((prev) => !prev);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={showHideCartHandler} />}
      <Header onShowCart={showHideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
