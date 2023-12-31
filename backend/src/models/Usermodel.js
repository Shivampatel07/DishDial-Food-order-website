const mongoose = require("mongoose");
// User Schema
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
module.exports = mongoose.model("Users", UserSchema);
