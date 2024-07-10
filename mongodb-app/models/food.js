const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const foodSchema = new Schema({
  title: { type: String, trim: true },
  calories: { type: Number },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  picture_url: { type: String, trim: true },
  ingredients: { type: Array },
  preparation: { type: Array },
});
module.exports = mongoose.model("food", foodSchema);
