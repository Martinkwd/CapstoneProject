import React, { useEffect, useState, useContext } from "react";
import "../Css/pages.css";
import axios from "axios";
import SingleFood from "../components/singleFoods";
import { FoodContext } from "../hooks/AddToRecipes";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// import AddFoodForm from "../forms/AddFoodForm";

export default function HomePage() {
  const [foods, setFoods] = useState([]);
  const [date, setDate] = useState("");
  const { handleAddToRecipe } = useContext(FoodContext);
  const { handleDeleteRecipes } = useContext(FoodContext);

  // Fetching data from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/foods`)
      .then((response) => {
        console.log(response.data);
        setFoods(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the data");
        console.error(error);
      });
  }, []);

  const DateAndFood = (foodItem) => {
    foodItem.date = date;
    handleAddToRecipe(foodItem);
  };

  //sorting food by the title
  const handleSortFoods = () => {
    let newFood = [...foods];
    newFood.sort(function (a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    // console.log(newFood);
    setFoods(newFood);
  };

  const handleSortFoodsza = () => {
    let newFood = [...foods];
    newFood.sort(function (a, b) {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
    // console.log(newFood);
    setFoods(newFood);
  };

  //sort calories by low and high

  const handleSortLcalories = () => {
    let newFood = [...foods];
    newFood.sort(function (a, b) {
      if (a.calories < b.calories) return -1;
      if (a.calories > b.calories) return 1;
      return 0;
    });
    setFoods(newFood);
  };

  const handleSortHcalories = () => {
    let newFood = [...foods];
    newFood.sort(function (a, b) {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
    setFoods(newFood);
  };

  //  to add the food into the recipes once is selected
  const foodcards = foods.map((food) => (
    <Grid item key={food.id} xs={0} sm={4} ms={0}>
      <SingleFood {...food} onAddToRecipe={DateAndFood} date={date} />
    </Grid>
  ));

  return (
    <>
      <div className="center-content">
        <label>
          Date:
          <input
            className="date"
            type="date"
            name="date"
            placeholder="dd-mm-yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button className="sortAZ" onClick={handleSortFoods}>
          Sort A-Z
        </button>
        <button className="sortZA" onClick={handleSortFoodsza}>
          Sort Z-A
        </button>
        <button className="sortZA" onClick={handleSortLcalories}>
          Sort by low calories
        </button>
        <button className="sortZA" onClick={handleSortHcalories}>
          Sort by high calories
        </button>
      </div>

      <Container maxWidth="lg">
        <Grid container spacing={5} style={{ marginTop: "10px" }}>
          {foodcards}
        </Grid>
      </Container>
    </>
  );
}
