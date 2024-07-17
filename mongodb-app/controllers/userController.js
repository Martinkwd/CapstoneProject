"use strict";
let userModel = require("../models/user");

// get only one user login
const getLogins = (req, res) => {
  userModel
    .findOne({ userName: req.body.userName })
    .then((data) => {
      if (!data) {
        res.send({ result: 404, error: "user not found" });
        return;
      }
      if (data.password != req.body.password) {
        res.send({ result: 403, error: "wrong password" });
        return;
      }
      res.send({ result: 200 });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createUsers = (data, res) => {
  console.log(data);
  new userModel(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
const getUsers = (req, res) => {
  userModel
    .find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateUsers = (req, res) => {
  userModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteUsers = (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  getLogins,
};
