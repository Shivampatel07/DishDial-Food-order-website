const Users = require("../models/Usermodel.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const OrdermodelModel = require("../models/Ordermodel.model");
const {
  successResponse,
  catchResponse,
  errorResponse,
} = require("../utils/index.utils");
const joi = require("joi");
const _ = require("lodash");

const Register = async (req, res) => {
  try {
    const registerValidate = joi.object({
      email: joi.string().trim().required(),
      username: joi.string().trim().required(),
      password: joi.string().trim().required(),
    });

    const { error } = registerValidate.validate(req.body);

    if (error) {
      const errorMessage = _.get(error, "details[0].message", "An unknown error occurred");
      errorResponse(res, errorMessage, 400);
    }

    const email = req.body.email.trim()
    const username = req.body.username.trim()
    const password = req.body.password.trim()

    const existingUser = await Users.findOne({ $or: [{ username }, { email }] }).lean();

    if (existingUser) {
      if (existingUser.is_verified) {
        errorResponse(res, existingUser.username === username ? `${username} username already taken` : "Account already exists!", 401);
      } else {
        await Users.deleteOne({ email: existingUser.email });
      }
    }

    const passwordHash = await bcrypt.hash(password, 14);
    const token = JWT.sign(
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
      is_verified: true,
      token: token,
    });
    await newUser.save();

    successResponse(res, newUser, "User registered successfully")
  } catch (error) {
    catchResponse(res, "Error occured in register", error)
  }
};

const Login = async (req, res) => {
  try {
    const loginValidate = joi.object({
      username: joi.string().trim().required(),
      password: joi.string().trim().required(),
    });

    const { error } = loginValidate.validate(req.body);
    if (error) {
      const errorMessage = _.get(error, "details[0].message", "An unknown error occurred");
      errorResponse(res, errorMessage, 400);
    }

    const username = req.body.username.trim()
    const password = req.body.password.trim()

    const loginData = await Users.findOne({ username, is_verified: true }, "username email is_verified password").lean();

    if (loginData) {
      const match = await bcrypt.compare(password, loginData.password);
      if (match) {
        delete loginData.password
        successResponse(res, loginData, "Login successfully")
      } else {
        errorResponse(res, "Invalid username or password", 401);
      }
    } else {
      errorResponse(res, "Account not exists or not verified", 404);
    }
  } catch (error) {
    console.log(error)
    catchResponse(res, "Error occured in login", error);
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
    const id = user._id;
    const orderData = await OrdermodelModel.find({ userId: id });
    return res.status(200).json({
      email: user.email,
      username: user.username,
      address: user.address,
      phone_number: user.phone_number,
      orderData: orderData,
    });
  } else {
    return res.status(404).json({ error: "Invalid token" });
  }
};

const userUpdateProfile = async (req, res) => {
  const { username, address, phone_number } = req.body;
  try {
    const user = await Users.findOneAndUpdate(
      { username },
      { address, phone_number }
    );
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(404).json({ error: "Invalid token" });
  }
};

module.exports = {
  Register,
  Login,
  UserDataProvider,
  userProfileInfo,
  userUpdateProfile,
};
