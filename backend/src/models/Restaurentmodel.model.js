const mongoose = require("mongoose");
const restaurentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Address: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number: {
      type: String,
      validate: {
        validator: function (v) {
          return v ? /^[1-9][0-9]{9}$/.test(v) : true;
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("Restaurent", restaurentSchema);
