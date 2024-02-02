const Users = require("./../models/Usermodel");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await Users.findOne({ username });
    if (data && data.is_verified) {
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        console.log(
          `Username: ${data.username} is logged-in successfully with email: ${data.email}`
        );

        return res.json({ message: "Login successfully", token: data.token });
      } else {
        return res.json({ error: "Username or Password not match" });
      }
    } else {
      return res.json({ error: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = Login;
