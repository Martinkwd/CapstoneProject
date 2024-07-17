import React from "react";
import { useState } from "react";

function AddFoodForm({ onAddFood }) {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [preparation, setPreparation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    onAddFood(Object.fromEntries(data));
  };
  // format of the share recipe in share recipe page
  return (
    <>
      <div className="AddFoodFrom componentBox">
        <form onSubmit={handleSubmit}>
          <label>
            URL image:
            <input
              name="picture_url"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </label>
          <label>
            Title:
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Calories:
            <input
              name="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </label>
          <label>
            Protein:
            <input
              name="protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </label>
          <label>
            Carbs:
            <input
              name="carbs"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
          </label>
          <label>
            Fat:
            <input
              name="fat"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </label>
          <label>
            Ingredients:
            <textarea
              name="ingredients"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
          </label>
          <label>
            Preparation:
            <textarea
              name="preparation"
              value={preparation}
              onChange={(e) => setPreparation(e.target.value)}
            />
          </label>
          <button>Add Recipe</button>
        </form>
      </div>
    </>
  );
}

export default AddFoodForm;
