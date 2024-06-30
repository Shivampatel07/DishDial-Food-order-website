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
      return errorResponse(res, errorMessage, 400);
    }

    const email = req.body.email.trim()
    const username = req.body.username.trim()
    const password = req.body.password.trim()

    const existingUser = await Users.findOne({ $or: [{ username }, { email }] }).lean();

    if (existingUser) {
      if (existingUser.is_verified) {
        return errorResponse(res, existingUser.username === username ? `${username} username already taken` : "Account already exists!", 401);
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

    return successResponse(res, newUser, "User registered successfully")
  } catch (error) {
    return catchResponse(res, "Error occured in register", error)
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
      return errorResponse(res, errorMessage, 400);
    }

    const username = req.body.username.trim()
    const password = req.body.password.trim()

    const loginData = await Users.findOne({ username, is_verified: true }, "username email is_verified password token").lean();

    if (loginData) {
      const match = await bcrypt.compare(password, loginData.password);
      if (match) {
        delete loginData.password
        return successResponse(res, loginData, "Login successfully")
      } else {
        return errorResponse(res, "Invalid username or password", 401);
      }
    } else {
      return errorResponse(res, "Account not exists or not verified", 404);
    }
  } catch (error) {
    console.log(error)
    return catchResponse(res, "Error occured in login", error);
  }
};

const UserDataProvider = async (req, res) => {
  try {
    const userDataValidation = joi.object({
      token: joi.string().trim().required()
    })

    const { error } = userDataValidation.validate(req.body)
    if (error) {
      const errorMessage = _.get(error, "details[0].message", "An unknown error occurred");
      return errorResponse(res, errorMessage, 400);
    }

    const token = req.body.token.trim();

    const user = await Users.findOne({ token: token, is_verified: true }, 'email username token').lean();
    if (user) {
      return successResponse(res, user, "User data found")
    } else {
      return errorResponse(res, "Invalid token", 498)
    }
  } catch (error) {
    return catchResponse(res, "Error occured in user data", error)
  }
};

const userProfileInfo = async (req, res) => {
  try {
    if (req.user) {
      const user = req.user;
      const id = user._id;
      const orderData = await OrdermodelModel.find({ userId: id });
      const profileData = {
        email: user.email,
        username: user.username,
        address: user.address,
        phone_number: user.phone_number,
        orderData: orderData,

      }
      return successResponse(res, profileData, "Profile retrieved successfully")
    } else {
      return errorResponse(res, "Invalid token", 498)
    }
  } catch (error) {
    return catchResponse(res, "Error occured in profile", error)
  }
};

const userUpdateProfile = async (req, res) => {
  try {
    const updateProfileValidation = joi.object({
      username: joi.string().trim().required(),
      address: joi.string().trim().allow('').required(),
      phone_number: joi.string().allow('').trim().required()
    })
    const { error } = updateProfileValidation.validate(req.body)
    if (error) {
      const errorMessage = _.get(error, "details[0].message", "An unknown error occurred");
      return errorResponse(res, errorMessage, 400);
    }

    const username = req.body.username.trim()
    const address = req.body.address.trim()
    const phone_number = req.body.phone_number.trim()

    const user = await Users.findOneAndUpdate(
      { username },
      { address, phone_number }
    ).lean();

    const updateProfileData = {
      email: user.email,
      address: user.address,
      username: user.username,
      phone_number: user.phone_number
    }
    return successResponse(res, updateProfileData, "Profile updated successfully")
  } catch (error) {
    return catchResponse(res, "Error occurred in profile update", error)
  }
};

module.exports = {
  Register,
  Login,
  UserDataProvider,
  userProfileInfo,
  userUpdateProfile,
};
