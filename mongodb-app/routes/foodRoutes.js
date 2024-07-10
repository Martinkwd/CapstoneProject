let express = require("express");
let router = express.Router();
let foodController = require("../controllers/foodController");

router.get("/", (req, res) => {
  foodController.getFoods(res);
});

router.post("/create", (req, res) => {
  foodController.createFoods(req.body, res);
});

router.put("/update", (req, res) => {
  foodController.updateFoods(res);
});

router.delete("/delete", (req, res) => {
  foodController.deleteFoods(res);
});

module.exports = router;
