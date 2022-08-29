import classes from './Checkout.module.css';

import Button from '../UI/Button/Button';
import { useRef, useState } from 'react';

const isEmpty = (text) => { return text.trim() === '' };
const isPostalCode = (text) => { return text.trim().length === 4 };

const Checkout = (props) => {
	const [isFormInputValid, setIsFormInputsValid] = useState({
		name: true,
		street: true,
		postal: true,
		city: true
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const isNameValid = !isEmpty(enteredName);
		const isStreetValid = !isEmpty(enteredStreet);
		const isPostalValid = isPostalCode(enteredPostal);
		const isCityValid = !isEmpty(enteredCity);

		setIsFormInputsValid({
			name: isNameValid,
			street: isStreetValid,
			postal: isPostalValid,
			city: isCityValid
		});

		const isFormValid = isNameValid && isStreetValid
			&& isPostalValid && isCityValid;

		if (!isFormValid) {
			console.log('here');
			return;
		}

		props.onSubmit({
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity
		});
	}

	const formControlClasses = (isValid) => { return `${classes['form-control']} ${isValid ? '' : classes.invalid}` }

	return (
		<form onSubmit={onSubmitHandler}>
			<div className={formControlClasses(isFormInputValid.name)}>
				<label htmlFor='name'>Your Name</label>
				<input type="text" id="name"
					ref={nameInputRef}
				></input>
				{!isFormInputValid.name && <p>Please enter your name.</p>}
			</div>
			<div className={formControlClasses(isFormInputValid.street)}>
				<label htmlFor='street'>Street</label>
				<input type="text" id="street"
					ref={streetInputRef}
				></input>
				{!isFormInputValid.street && <p>Please enter your street.</p>}
			</div>
			<div className={formControlClasses(isFormInputValid.postal)}>
				<label htmlFor='postal'>Postal Code</label>
				<input type="text" id="postal"
					ref={postalInputRef}
				></input>
				{!isFormInputValid.postal && <p>Please enter valid postal code (4 characters long).</p>}
			</div>
			<div className={formControlClasses(isFormInputValid.city)}>
				<label htmlFor='city'>City</label>
				<input type="text" id="city"
					ref={cityInputRef}
				></input>
				{!isFormInputValid.city && <p>Please enter your city name.</p>}
			</div>
			<div className={classes.actions}>
				<Button isSecondary={true} onClick={props.onCancel}>Cancel</Button>
				<Button
					type='submit'
				>Confirm</Button>
			</div>
		</form>
	)
}

export default Checkout;