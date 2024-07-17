const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../app");

const User = require("../models/user");
const Food = require("../models/food");

let database;

const { expect, beforeAll, afterEach, afterAll } = require("@jest/globals");
const { json } = require("sequelize");

beforeAll(async () => {
  database = await MongoMemoryServer.create();
  const uri = database.getUri();
  console.log(uri);
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany({});
  await Food.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await database.stop();
});

const userToCreate = {
  userName: "Javier",
  password: "very secure password",
  emailId: "javier24@gmail.com",
};

describe("User Route Tests", () => {
  test("Getting all users", async () => {
    await new User(userToCreate).save();

    const expecting = await User.find({}).lean();

    await supertest(app)
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        //Stringify and then parse expecting to convert the ObjectId to a string
        expect(response.body.data).toEqual(
          JSON.parse(JSON.stringify(expecting))
        );
      });
  });

  test("Creating a user", async () => {
    await supertest(app)
      .post("/api/users/create")
      .send(userToCreate)
      .expect(200)
      .then(async (response) => {
        const users = await User.find({}).lean();
        const user = users[0];
        expect(users).toHaveLength(1);
        expect(user.userName).toBe(userToCreate.userName);
        expect(user.password).toBe(userToCreate.password);
        expect(user.emailId).toBe(userToCreate.emailId);
        expect(response.body.data).toEqual(JSON.parse(JSON.stringify(user)));
      });
  });

  test("Updating a user", async () => {
    const newUser = (await new User(userToCreate).save()).toObject();

    newUser.userName = "newusername";
    newUser.password = "newPassword";
    newUser.emailId = "newEmailid";

    await supertest(app)
      .put(`/api/users/update/${newUser._id}`)
      .send({
        userName: newUser.userName,
        password: newUser.password,
        emailId: newUser.emailId,
      })
      .expect(200)
      .then(async (response) => {
        const user = await User.findOne({ _id: { $eq: newUser._id } }).lean();
        expect(user).toEqual(newUser);
      });
  });

  test("Deleting a user", async () => {
    const user = await new User(userToCreate).save();

    await supertest(app)
      .delete(`/api/users/delete/${user._id}`)
      .expect(200)
      .then(async () => {
        const users = await User.find({}).lean();
        expect(users).toEqual([]);
      });
  });
  test("Creating a login", async () => {
    const user = await new User(userToCreate).save();
    await supertest(app)
      .post("/api/users/login")
      .send({
        userName: userToCreate.userName,
        password: userToCreate.password,
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.result).toEqual(200);
      });
  });
});

const foodToCreate = {
  title: "New Food",
  calories: 278,
  protein: 50,
  carbs: 30,
  fat: 13,
  picture_url: "exampe@image",
  ingredients: ["chicken"],
  preparation: ["this is the preparation steps"],
};

describe("Food Route Tests", () => {
  test("Getting all foods", async () => {
    await new Food(foodToCreate).save();

    const expecting = await Food.find({}).lean();

    await supertest(app)
      .get("/api/foods")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        //Stringify and then parse expecting to convert the ObjectId to a string
        expect(response.body.data).toEqual(
          JSON.parse(JSON.stringify(expecting))
        );
      });
  });

  test("Creating a food", async () => {
    await supertest(app)
      .post("/api/foods/create")
      .send(foodToCreate)
      .expect(200)
      .then(async (response) => {
        const foods = await Food.find({}).lean();
        const food = foods[0];
        expect(foods).toHaveLength(1);
        expect(food.title).toBe(foodToCreate.title);
        expect(food.calories).toBe(foodToCreate.calories);
        expect(food.protein).toBe(foodToCreate.protein);
        expect(food.carbs).toBe(foodToCreate.carbs);
        expect(food.fat).toBe(foodToCreate.fat);
        expect(food.picture_url).toBe(foodToCreate.picture_url);
        expect(food.ingredients).toEqual(foodToCreate.ingredients);
        expect(food.preparation).toEqual(foodToCreate.preparation);

        expect(response.body.data).toEqual(JSON.parse(JSON.stringify(food)));
      });
  });

  test("Updating a food", async () => {
    const newFood = (await new Food(foodToCreate).save()).toObject();

    newFood.title = "newTile";
    newFood.calories = 1;
    newFood.protein = 2;
    newFood.carbs = 3;
    newFood.fat = 4;
    newFood.picture_url = "newPicture";
    newFood.ingredients = ["newIngredients"];
    newFood.preparation = ["newPreparation"];
    await supertest(app)
      .put(`/api/foods/update/${newFood._id}`)
      .send({
        title: newFood.title,
        calories: newFood.calories,
        protein: newFood.protein,
        carbs: newFood.carbs,
        fat: newFood.fat,
        picture_url: newFood.picture_url,
        ingredients: newFood.ingredients,
        preparation: newFood.preparation,
      })
      .expect(200)
      .then(async (response) => {
        const food = await Food.findOne({
          _id: { $eq: newFood._id },
        }).lean();
        expect(food).toEqual(newFood);
      });
  });

  test("Deleting a food", async () => {
    const food = await new Food(foodToCreate).save();

    await supertest(app)
      .delete(`/api/foods/delete/${food._id}`)
      .expect(200)
      .then(async () => {
        const foods = await Food.find({}).lean();
        expect(foods).toEqual([]);
      });
  });
});
