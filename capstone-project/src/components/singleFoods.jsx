import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { FoodContext } from "../hooks/AddToRecipes";
import ClearIcon from "@mui/icons-material/Clear";

export default function SingleFood({
  title,
  calories,
  protein,
  carbs,
  fat,
  ingredients,
  picture_url,
  preparation,
  onAddToRecipe,
  date,
  _id,
}) {
  const { handleDeleteRecipes } = useContext(FoodContext);
  const [expanded, setExpanded] = useState(false);
  //MUI card
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  //part of MUI card
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //ingredients with dots
  const ingredientsList = (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          {ingredient.name}:{ingredient.quantity_g} grams
        </li>
      ))}
    </ul>
  );

  //preparation steps with numbers
  const preparationList = (
    <ol>
      {preparation.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  );

  const handleAddClick = () => {
    const foodItem = {
      title,
      calories,
      protein,
      carbs,
      fat,
      ingredients,
      picture_url,
      preparation,
      _id,
    };
    onAddToRecipe(foodItem);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={1} style={{ marginTop: "10px" }}>
          {/* <Grid item xs={0} sm={0} ms={0}> */}
          <Card sx={{ maxWidth: 345, width: 500, height: "100%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                // height="250"
                className="card-action-area img"
                image={picture_url}
                alt="comming soon"
              />
              <ClearIcon
                className="delete-button"
                onClick={() => handleDeleteRecipes(_id)}
              ></ClearIcon>
              <CardContent className="card-content">
                <Typography gutterBottom className="title" component="div">
                  {title}
                </Typography>
                <Typography className="nutrition-info">
                  Calories: {calories}
                  <br />
                  Protein: {protein}g
                  <br />
                  Carbs: {carbs}g
                  <br />
                  Fat: {fat}g
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="card-actions">
              <Button
                size="medium"
                color="primary"
                className="add-button"
                onClick={handleAddClick}
              >
                Add
              </Button>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                className={expanded ? "expand-more expanded" : "expand-more"}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className="collapse-content">
                <Typography paragraph className="ingredients">
                  Ingredients:
                </Typography>
                <Typography className="ingredientsList" paragraph>
                  {ingredientsList}
                </Typography>
                <Typography paragraph className="preparation">
                  Preparation:
                </Typography>
                <Typography paragraph>{preparationList}</Typography>
              </CardContent>
            </Collapse>
          </Card>
          {/* </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
