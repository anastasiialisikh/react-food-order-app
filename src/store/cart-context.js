import React, { useReducer } from 'react';

const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => { },
	removeItem: (item) => { }
});

const defaultCartState = {
	items: [],
	totalAmount: 0
}

const cardReducer = (state, action) => {
	if (action.type === 'ADD_CART_ITEM') {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

		const currentTotalAmont = +state.totalAmount;
		const itemAmount = +action.item.amount;
		const itemPrice = +action.item.price;

		const updatedTotalAmount = (currentTotalAmont + (itemAmount * itemPrice));

		let updatedItems = [];

		if (existingCartItemIndex !== -1) {
			const existingCartItem = { ...state.items[existingCartItemIndex] };
			existingCartItem.amount += itemAmount;

			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = existingCartItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	}

	if (action.type === 'REMOVE_CART_ITEM') {
		const updatedTotalAmount = (+state.totalAmount - ((+action.item.amount) * (+action.item.price)));
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
		const updatedItems = [...state.items];

		const existingCartItem = { ...state.items[existingCartItemIndex] };
		existingCartItem.amount -= action.item.amount;

		if (existingCartItem.amount <= 0) {
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			updatedItems[existingCartItemIndex] = existingCartItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	}

	if (action.type === 'CLEAN_CART') {
		return { ...defaultCartState };
	}

	return defaultCartState;
}

export const CartContextProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cardReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD_CART_ITEM', item });
	}

	const removeItemFromCartHandler = item => {
		dispatchCartAction({ type: 'REMOVE_CART_ITEM', item });
	}

	const cleanCartHandler = (item) => {
		dispatchCartAction({ type: 'CLEAN_CART' });
	}

	const cartContextValue = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		cleanCart: cleanCartHandler
	}

	return (
		<CartContext.Provider value={cartContextValue}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartContext;