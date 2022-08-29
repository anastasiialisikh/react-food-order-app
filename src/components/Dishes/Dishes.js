import { useState, useEffect, useCallback } from 'react';

import classes from './Dishes.module.css';

import DishItem from './DishItem';
import Card from '../UI/Card/Card';

// const dishesList = [
// 	{ id: 1, name: 'Sushi', description: 'Finest fish and veggies', price: '22.99', amount: 0 },
// 	{ id: 2, name: 'Schnitzel', description: 'A german specialty!', price: '16.49', amount: 1 },
// 	{ id: 3, name: 'Barbecue Burger', description: 'American, raw, meaty', price: '12.99', amount: 0 },
// 	{ id: 4, name: 'Green Bowl', description: 'Healthy...and green...', price: '18.99', amount: 0 },
// 	{ id: 5, name: 'Ukrainian Borsch', description: 'Slava Ukraïni!', price: '99.99', amount: 2 },
// ];

const Dishes = () => {
	const [dishesList, setDishesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const getDishes = useCallback(async () => {
		setIsError(false);
		setIsLoading(true);
		try {
			const response = await fetch(
				'https://react-dummy-http-948aa-default-rtdb.europe-west1.firebasedatabase.app/dishes.json',
			);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			let loadedDishes = [];
			for (const key in data) {
				loadedDishes.push({ id: key, ...data[key] });
			}

			setDishesList(loadedDishes);
		} catch (error) {
			setIsError(true);
			console.log(error);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		getDishes();
	}, [getDishes]);

	let infoMessage =
		<p className={classes.center}>
			{isLoading ? 'Loading ...' : 'There are no dishes available.'}
		</p>

	if (isError) {
		infoMessage =
			<p className={`${classes.error} ${classes.center}`}>
				Something went wrong. Please try again later.
			</p>
	}

	return (
		<main>
			<Card className={classes.info}>
				<h2>Delicious Food, Delivered To You</h2>
				<p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
				<p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
			</Card>
			<Card className={classes['list__dishes']}>
				{dishesList.length === 0 && infoMessage}
				{dishesList.length > 0 &&
					<ul>
						{dishesList.map(item => <DishItem key={item.id} item={item}></DishItem>)}
					</ul>
				}
			</Card>
		</main>
	);
}

export default Dishes;