import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const MyRecipesContext = createContext();

export const MyRecipesProvider = (props) => {
  const [currentRecipesProvider, setCurrentRecipesProvider] = useState([]);
  const handleUpdateMyRecipes = (progress) => {
    console.log(progress);
    setCurrentRecipesProvider(progress);
  };

  return (
    <MyRecipesContext.Provider
      value={{ currentRecipesProvider, handleUpdateMyRecipes }}
    >
      {props.children}
    </MyRecipesContext.Provider>
  );
};

export const useMyRecipesContext = () => {
  return useContext(MyRecipesContext);
};
