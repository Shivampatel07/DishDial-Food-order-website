const mongoose = require("mongoose");

const restaurentProductSchema = new mongoose.Schema(
  {
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurent",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);

module.exports = mongoose.model("RestaurentProduct", restaurentProductSchema);
