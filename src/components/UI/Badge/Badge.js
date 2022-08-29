import classes from './Badge.module.css';

const Badge = (props) => {
	return (
		<div className={classes.badge}>{props.children}</div>
	);
}

export default Badge;