let express = require("express");
let router = express.Router();
let userController = require("../controllers/userController");

router.get("/", (req, res) => {
  userController.getUsers(req, res);
});

router.post("/create", (req, res) => {
  userController.createUsers(req.body, res);
});

router.put("/update", (req, res) => {
  userController.updateUsers(req, res);
});

router.delete("/delete", (req, res) => {
  userController.deleteUsers(req, res);
});

//login
router.post("/login", (req, res) => {
  userController.getLogins(req, res);
});

module.exports = router;
