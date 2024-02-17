const mongoose = require("mongoose");
// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
    },
    username: {
      unique: true,
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: String,
    phone_number: {
      type: String,
      validate: {
        validator: function (v) {
          return v ? /^[1-9][0-9]{9}$/.test(v) : true;
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    is_verified: {
      type: Boolean,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
UserSchema.index({ email: 1, username: 1 }, { unique: true });
module.exports = mongoose.model("Users", UserSchema);
