import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const[meals, setMeals] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchmeals = async () => {
      let response = await fetch(
        "https://react-b8154-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok) {
        throw new Error('something went wrong.');
      }
      let data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchmeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(isLoading) {
    return (
      <section className={classes.isLoading} >
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.httpError} >
        <p>Something Went Wrong :(</p>
      </section>
    )
  }


  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
