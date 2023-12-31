const Users = require("./../models/Usermodel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { email, username, password } = req.body; // req.body is the object passed to the route from the frontend

    // Check if the username already exists or not
    let usernameTaken = await Users.findOne({ username });
    if (usernameTaken) {
      if (usernameTaken.is_verified) {
        return res.json({ error: "Username already taken" });
      } else {
        await Users.deleteOne({ username });
      }
    }

    // Check if the email already exists or not
    let emailTaken = await Users.findOne({ email });
    if (emailTaken) {
      if (emailTaken.is_verified) {
        return res.json({ error: "Email already taken" });
      } else {
        await Users.deleteOne({ email });
      }
    }
    const passwordHash = await bcrypt.hash(password, 14);
    const token = await JWT.sign(
      { username: username, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const newUser = new Users({
      email,
      username,
      password: passwordHash,
      is_verified: false,
      token: token,
    });
    await newUser.save();
    res.json({ message: "User registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = Register;
