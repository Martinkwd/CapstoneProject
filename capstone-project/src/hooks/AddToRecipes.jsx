import React from "react";
import { createContext, useState } from "react";

export const FoodContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const handleAddToRecipe = (foodItem) => {
    setCurrentRecipes((prevRecipe) => [...prevRecipe, foodItem]);
  };

  // const TotalAmount = {
  //   calories: currentRecipes.reduce(
  //     (accumulater, current) => accumulater + current.calories,
  //     0
  //   ),
  //   protein: currentRecipes.reduce(
  //     (accumulater, current) => accumulater + current.protein,
  //     0
  //   ),
  //   carbs: currentRecipes.reduce(
  //     (accumulater, current) => accumulater + current.carbs,
  //     0
  //   ),
  //   fat: currentRecipes.reduce(
  //     (accumulater, current) => accumulater + current.fat,
  //     0
  //   ),
  // };

  const handleDeleteRecipes = (id) => {
    console.log(id);
    setCurrentRecipes(currentRecipes.filter((foods) => foods._id !== id));
  };

  return (
    <FoodContext.Provider
      value={{
        currentRecipes,
        handleAddToRecipe,
        handleDeleteRecipes,
        // TotalAmount,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
