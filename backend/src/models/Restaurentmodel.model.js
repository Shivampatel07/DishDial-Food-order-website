const mongoose = require("mongoose");
const restaurentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    famous: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return v >= 0 && v <= 5;
        },
        message: (props) => `${props.value} is not a valid rating!`,
      },
    },
    phone_number: {
      type: String,
      validate: {
        validator: function (v) {
          return v ? /^[1-9][0-9]{9}$/.test(v) : true;
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("Restaurent", restaurentSchema);
