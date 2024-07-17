import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import "../Css/pages.css";
import axios from "axios";
import SingleFood from "../components/singleFoods";
import { FoodContext } from "../hooks/AddToRecipes";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";

export default function HomePage() {
  moment.locale("en-nz");
  const [foods, setFoods] = useState([]);
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [searchBar, setSearchBar] = useState("");
  const { handleAddToRecipe } = useContext(FoodContext);
  const { handleDeleteRecipes } = useContext(FoodContext);

  // Fetching data from the backend to dislpay each iteam in the home page(recipes)
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

  // this is the deletem this helps to delete the items in the database and in the webside by using the delete button
  const deleteRecipe = (recipeid) => {
    axios
      .delete(`http://localhost:8080/api/foods/delete/${recipeid}`)
      .then((response) => {
        console.log(response.data);
        setFoods(foods.filter((foods) => foods._id !== recipeid));
      })
      .catch((error) => {
        console.error("Error deliting the food");
        console.error(error);
      });
  };

  //to display date with the food
  //using moment to make the format different
  const DateAndFood = (foodItem) => {
    console.log(date);
    foodItem.date = moment(date).format("LL");
    handleAddToRecipe(foodItem);
  };

  //sorting food by the title name so this is from A to Z
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
  //sorting food by the title name so this is from Z to A
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

  //sort calories by low

  const handleSortLcalories = () => {
    let newFood = [...foods];
    newFood.sort(function (a, b) {
      if (a.calories < b.calories) return -1;
      if (a.calories > b.calories) return 1;
      return 0;
    });
    setFoods(newFood);
  };
  //sort calories by high
  const handleSortHcalories = () => {
    let newFood = [...foods];
    newFood.sort(function (a, b) {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
    setFoods(newFood);
  };

  //serach Bar
  const onSearchChange = (value) => {
    setSearchBar(value);
  };

  const foodFilter = foods.filter((food) =>
    food.title.toLowerCase().includes(searchBar.toLowerCase())
  );

  //  to add the food into the recipes once is selected
  const foodcards = foodFilter.map((food) => (
    <Grid item key={food.id} xs={12} sm={4} ms={0}>
      <SingleFood
        {...food}
        onAddToRecipe={DateAndFood}
        date={date}
        deleteRecipe={deleteRecipe}
      />
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
      <input
        className="searchBars"
        type="search"
        placeholder="Type recipe name to search....."
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Container maxWidth="lg">
        <Grid container spacing={5} style={{ marginTop: "10px" }}>
          {foodcards}
        </Grid>
      </Container>
    </>
  );
}
