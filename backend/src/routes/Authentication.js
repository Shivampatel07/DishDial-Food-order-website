const router = require("express").Router();
const UserDataProvider = require("../controllers/UserDataProvider");
const Login = require("../controllers/UserLogin");
const Register = require("../controllers/UserRegister");
const urlEncoded = require("body-parser").urlencoded({ extended: false });

router.post("/register", urlEncoded, Register);
router.post("/login", urlEncoded, Login);
router.post("/user", urlEncoded, UserDataProvider);

module.exports = router;
