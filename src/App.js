import { useState } from 'react';
import './App.css';

import { CartContextProvider } from './store/cart-context';

import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Dishes from './components/Dishes/Dishes';

function App() {
	const [isCartVisible, setCartVisible] = useState(false);

	const showCartHandler = () => {
		setCartVisible(true);
	}

	const hideCartHandler = () => {
		setCartVisible(false);
	}

	return (
		<CartContextProvider>
			{isCartVisible ? <Cart onCloseCart={hideCartHandler}></Cart> : ''}
			<Header onShowCard={showCartHandler}></Header>
			<Dishes></Dishes>
		</CartContextProvider>
	);
}

export default App;