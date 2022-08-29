import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

import Checkout from './Checkout';
import CartItem from './CartItem';

import Modal from '../UI/Modal/Modal';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

const CartModal = (props) => {
	const cartCtx = useContext(CartContext);
	const [isReadyToOrder, setIsReadyToOrder] = useState(false);
	const [isOrderSubmitted, setIsOrderSumbitted] = useState(false);

	const addItemHandeler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	}

	const removeItemHandler = (item) => {
		cartCtx.removeItem({ ...item, amount: 1 });
	}

	const orderClickHandler = () => {
		setIsReadyToOrder(true);
	};

	const cancelOrderHandler = () => {
		setIsReadyToOrder(false);
	}

	const submitOrderHandler = async (userData) => {
		const orderData = {
			order: cartCtx.items.map(item => { return { id: item.id, amount: item.amount } }),
			client: userData
		};

		try {
			const response = await fetch(
				'https://react-dummy-http-948aa-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(orderData)
				}
			);

			if (!response.ok) {
				throw new Error('Request failed.');
			}

			const data = await response.json();

			if (data.name) {
				setIsOrderSumbitted(true);
				cartCtx.cleanCart();
			}

		} catch (error) {
			console.log(error);
		}
	}

	const orderPlacedSuccessfully = (
		<Card className={classes.container}>
			<h2>Thank you for your order!</h2>
			<div className={classes.actions}>
				<Button isSecondary={true} onClick={props.onCloseCart}>Close</Button>
			</div>
		</Card>
	);

	return (
		<>
			{isOrderSubmitted && orderPlacedSuccessfully}
			{!isOrderSubmitted && <Card className={classes.container}>
				<header>
					<h2>Your order</h2>
				</header>
				<ul className={classes.list}>
					{
						cartCtx.items
							.map(item =>
								<CartItem
									key={item.id}
									item={item}
									onAdd={addItemHandeler.bind(null, item)}
									onRemove={removeItemHandler.bind(null, item)}
								>
								</CartItem>
							)
					}
				</ul>
				<div>
					<h2 className={classes.total}>
						<span>Total amount</span>
						<span>€ {cartCtx.totalAmount.toFixed(2)}</span>
					</h2>
					{!isReadyToOrder &&
						<div className={classes.actions}>
							<Button isSecondary={true} onClick={props.onCloseCart}>Close</Button>
							{cartCtx.items.length > 0 ? <Button onClick={orderClickHandler}>Order</Button> : ''}
						</div>
					}
				</div>
				{isReadyToOrder && <Checkout onSubmit={submitOrderHandler} onCancel={cancelOrderHandler}></Checkout>}
			</Card>
			}
		</>
	);
}

const Cart = (props) => {
	return (
		<Modal onBackdropClick={props.onCloseCart}>
			<CartModal onCloseCart={props.onCloseCart}></CartModal>
		</Modal>
	);
}

export default Cart;