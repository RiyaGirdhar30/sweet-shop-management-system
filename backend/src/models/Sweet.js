const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  quantity: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model("Sweet", sweetSchema);
