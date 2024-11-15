const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide book title"],
  },
  author: {
    type: String,
    required: [true, "Please provide author name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  image: {
    type: String,
    // required: [true, "Please provide an image URL"],
  },
});

module.exports = mongoose.model("Book", BookSchema);
