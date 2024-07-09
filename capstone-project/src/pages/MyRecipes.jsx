import { useContext } from "react";
import { FoodContext } from "../hooks/AddToRecipes";
import SingleFood from "../components/singleFoods";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TotalAmount from "../components/TotalAmount";
import Button from "@mui/material/Button";

const MyRecipes = () => {
  const { currentRecipes, handleDeleteRecipes } = useContext(FoodContext);

  //making the date as a unique to display one date each day
  const uniqueDates = Array.from(
    new Set(currentRecipes.map((recipes) => recipes.date))
  );
  console.log(uniqueDates);

  const itemsDates = uniqueDates.map((date) => {
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
    return (
      <>
        <div className="myDate">{date}</div>
        <Grid container spacing={5} style={{ marginTop: "10px" }}>
          {currentRecipes
            .filter((recipes) => recipes.date === date)
            .map((food) => (
              <Grid item key={food.id} xs={0} sm={4} md={0}>
                <SingleFood {...food} />
              </Grid>
            ))}
        </Grid>
        <TotalAmount className="totalAmount"></TotalAmount>
      </>
    );
  });

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom></Typography>
        {itemsDates}

        {/* <TotalAmount className="totalAmount"></TotalAmount> */}
      </Container>
    </>
  );
};

export default MyRecipes;

//use reduce method for total amount
