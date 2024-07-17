import React from "react";
import { useState } from "react";
import SingleFood from "../components/singleFoods";
import AddFoodForm from "../forms/AddFoodForm";
import axios from "axios";

const ShareRecipes = () => {
  // const [currentFood, setCurrentFood] = useState(""); // how to get the food data

  //method to create the spaces so I can add the names and grams only giving the corresponding spaces
  const handleAddfood = (newFood) => {
    const preparation = newFood.preparation.split("\n");
    const ingredients = newFood.ingredients.split("\n");
    const ingredientData = ingredients.map((ingredient) => {
      const splitIngredients = ingredient.split(" ");
      return {
        name: splitIngredients.slice(0, -1).join(" "),
        quantity_g: splitIngredients[splitIngredients.length - 1],
      };
    });

    const toSend = {
      ...newFood,
      preparation,
      ingredients: ingredientData,
    };

    //using axios post method to post the recipe in the data base
    axios
      .post(`http://localhost:8080/api/foods/create`, toSend)
      .then(() => {
        alert("Your recipe succefully added");
      })
      .catch((error) => {
        console.error(error);
        alert("try again");
      });
  };

  return (
    <>
      <AddFoodForm onAddFood={handleAddfood} />
    </>
  );
};

export default ShareRecipes;
