let express = require("express");
let router = express.Router();
let foodController = require("../controllers/foodController");

router.get("/", (req, res) => {
  foodController.getFoods(res);
});

router.post("/create", (req, res) => {
  foodController.createFoods(req.body, res);
});

router.put("/update/:id", (req, res) => {
  console.log(req.body);
  foodController.updateFoods(req, res);
});

router.delete("/delete/:id", (req, res) => {
  foodController.deleteFoods(req, res);
});

module.exports = router;
