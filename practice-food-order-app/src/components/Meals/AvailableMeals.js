import { useEffect, useState } from "react";
import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMealsHttp = async () => {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_TEST_DB}/meals.json`);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    ...responseData[key]
                })
            }

            setMeals(loadedMeals);
        }

        fetchMealsHttp()
            .catch(error => {
                setHttpError(error.message)
            })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            price={meal.price}
        />
    );
    
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;