import React, { useContext, useState } from "react";
import { FoodContext } from "../hooks/AddToRecipes";

export default function TotalAmount({ TotalAmount }) {
  // const { TotalAmount } = useContext(FoodContext);
  console.log(TotalAmount);

  return (
    <>
      <div className="totalAmount">
        <h1>Total Calories: {TotalAmount.calories}</h1>
        <h1>Total Protein: {TotalAmount.protein}</h1>
        <h1>Total Carbs: {TotalAmount.carbs}</h1>
        <h1>Total Fat: {TotalAmount.fat}</h1>
      </div>
    </>
  );
}
