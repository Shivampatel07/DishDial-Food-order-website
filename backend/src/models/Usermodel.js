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
