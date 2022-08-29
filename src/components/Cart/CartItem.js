import classes from './CartItem.module.css';

const CartItem = (props) => {

	return (
		<li className={classes.item}>
			<div>
				<h3>{props.item.name}</h3>
				<h4 className={classes.amount}>
					<span className={classes.price}>{props.item.price}</span>
					<span>x{props.item.amount}</span>
				</h4>
			</div>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onRemove}>-</button>
				<button className={classes.button} onClick={props.onAdd}>+</button>
			</div>
		</li>
	);
}

export default CartItem;