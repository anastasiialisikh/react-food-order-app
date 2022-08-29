import { useContext, useEffect, useState } from 'react';
import classes from './Header.module.css';

import CartContext from '../../store/cart-context';

import Button from '../UI/Button/Button';
import Badge from '../UI/Badge/Badge';

import img from '../../assets/1.jpeg';

const Header = (props) => {
	const cartCtx = useContext(CartContext);
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

	const numberOfDishes = cartCtx.items.reduce((sum, item) => sum + (+item.amount), 0);

	const btnClasses = `${classes['cart__button']} ${btnIsHighlighted ? classes.bump : ''}`;

	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}

		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [cartCtx.items]);

	return (
		<>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<Button
					className={btnClasses}
					onClick={props.onShowCard}>
					<h2>Your cart
						<Badge>{numberOfDishes}</Badge>
					</h2>
				</Button>
			</header>
			<div className={classes['main-image']}>
				<img src={img} alt='background-img'></img>
			</div>
		</>
	);
}

export default Header;