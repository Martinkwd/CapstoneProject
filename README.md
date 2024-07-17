# DietDiary

DietDiary is a web application designed to help users track their daily food consumption. By providing a user-friendly interface, DietDiary enables users to monitor their intake of calories, protein, carbs, and fat. Also allows users to add their own recipes or deleting them. This project use technologies, including React, MongoDB, and MUI (Material-UI), to deliver responsive experience. The purpose is helping users to achive their nutritional goals and support healthier eating habits by provinding total nutritional information, ingredients and preparation.

Some tracking applications do not have a comprehensive interface, affecting users who are looking for a change in their lives.

## Features

- User authentication (login/register)
- Logging food by the date
- Tracking total calories, protein, carbs, and fat intake
- Searching and sorting recipes
- Create your recipe
- Integration with MongoDb for Data storage

## How to install running in localhost (frontend and backend)

This tutorial will show step-by-step instructions on how to install and run DietDiary on your local machine.

1. Pull the code from Github and Clone the repository in your terminal
2. In the mongodb-app folder, run the command npm install
3. In the capstone-project folder, run the command npm install
4. In your MongoDB create a database and use your database address and folder name (example:mongodb://localhost:27017/foodDB ) you only need to change the address of the database and instead of foodBD the name you gave to the database.
5. GO to dbConnect.js in line 4 make the changes mongodb://your database address/your database name.
6. In the mongodb-app folder, run the command npm start
7. In the capstone-project folder, run the command npm run dev
   Use the local link showed in the terminal and paste it in your Browser

## Strucutre example that you can use in MongoDB

db.food.insertOne({
"title": "Chicken Salad",
"calories": 250,
"protein": 30,
"carbs": 10,
"fat": 10,
"ingredients": [
{"name": "chicken breast", "quantity_g": 150},
{"name": "lettuce", "quantity_g": 50},
{"name": "tomatoes", "quantity_g": 50},
{"name": "cucumbers", "quantity_g": 50},
{"name": "olive oil", "quantity_g": 10},
{"name": "lemon juice", "quantity_g": 10}
],
"picture_url": "https://cafedelites.com/wp-content/uploads/2016/07/Lemon-Herb-Mediterranean-Chicken-Salad-208-1.jpg",
"preparation": [
"Mix chicken breast, lettuce, tomatoes, cucumbers, olive oil, and lemon juice in a bowl.",
"Season with salt and pepper to taste.",
"Serve chilled."
]
});
