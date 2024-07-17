import React, { useContext, useState } from "react";
import { FoodContext } from "../hooks/AddToRecipes";

export default function TotalAmount({ TotalAmount }) {
  console.log(TotalAmount);
  // calculation for the total amount for each macro and calorie
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
