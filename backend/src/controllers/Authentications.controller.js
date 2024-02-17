const Users = require("../models/Usermodel.model");
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

const UserDataProvider = async (req, res) => {
  const { token } = req.body;
  if (token) {
    const user = await Users.findOne({ token: token });
    if (user) {
      return res.json({ email: user.email, username: user.username });
    } else {
      return res.json({ error: "Invalid token" });
    }
  } else {
    return res.json({ error: "Invalid token" });
  }
};

const userProfileInfo = async (req, res) => {
  if (req.user) {
    const user = req.user;
    return res.status(200).json({ email: user.email, username: user.username, address: user.address, phone_number: user.phone_number });
  }
  else {
    return res.status(404).json({ error: "Invalid token" });
  }
}

module.exports = { Register, Login, UserDataProvider, userProfileInfo};
