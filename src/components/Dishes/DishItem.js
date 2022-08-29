import { useContext, useRef } from 'react';
import CartContext from '../../store/cart-context';

import classes from './DishItem.module.css';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const DishItem = (props) => {
	const {
		name,
		description,
		price
	} = props.item;

	const cartCtx = useContext(CartContext);
	const amountInputRef = useRef();

	const itemSubmitHandler = (event) => {
		event.preventDefault();

		const enteredAmount = +amountInputRef.current.value.trim();

		if (enteredAmount > 0 && enteredAmount <= 5) {
			cartCtx.addItem({
				...props.item,
				amount: enteredAmount
			});
		}
	}

	return (
		<li className={classes.item}>
			<div className={classes['item__info']}>
				<h4>{name}</h4>
				<p>{description}</p>
				<div className={classes['item__price']}>{price}</div>
			</div>
			<form className={classes['item__actions']} onSubmit={itemSubmitHandler}>
				<Input
					ref={amountInputRef}
					label='Amount'
					input={{
						id: 'amount',
						type: 'number',
						min: 1,
						max: 5,
						step: 1,
						defaultValue: 1
					}}>
				</Input>
				<Button type='submit'>+ Add</Button>
			</form>
		</li >
	);
}

export default DishItem;