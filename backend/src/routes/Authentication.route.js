const {
  Register,
  Login,
  UserDataProvider,
  userProfileInfo,
  userUpdateProfile,
} = require("../controllers/Authentications.controller");
const { userAuthenticate } = require("../middleware/Authenticate.middleware");
const router = require("express").Router();
const urlEncoded = require("body-parser").urlencoded({ extended: false });

router.post("/register", urlEncoded, Register);
router.post("/login", urlEncoded, Login);
router.post("/user", urlEncoded, UserDataProvider);
router.get("/profile", userAuthenticate, userProfileInfo);
router.post("/update-profile", urlEncoded, userAuthenticate, userUpdateProfile);

module.exports = router;
