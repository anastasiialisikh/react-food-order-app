import classes from './Button.module.css';

const Button = (props) => {
	const buttonClasses = `
		${classes.main} 
		${props.isSecondary ? classes.secondary : ''} 
		${props.className || ''}
	`;

	return (
		<button
			type={props.type || 'button'}
			className={buttonClasses}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

export default Button;