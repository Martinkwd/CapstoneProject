"use strict";
let foodModel = require("../models/food");

const createFoods = (data, res) => {
  console.log(data);
  new foodModel(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getFoods = (res) => {
  foodModel
    .find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateFoods = (req, res) => {
  foodModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteFoods = (req, res) => {
  foodModel
    .findByIdAndDelete(req.params.id)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getFoods,
  createFoods,
  updateFoods,
  deleteFoods,
};
