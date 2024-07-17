import React from "react";
import { createContext, useState } from "react";

export const FoodContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const handleAddToRecipe = (foodItem) => {
    setCurrentRecipes((prevRecipe) => [...prevRecipe, foodItem]);
  };

  //context for delete button on my recipes
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
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
