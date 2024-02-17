const {
  AllRestaurentFinder,
  RestaurantByIdFinder,
  AddOrder,
} = require("../controllers/Restaurent.controller");
const router = require("express").Router();
const urlEncoded = require("body-parser").urlencoded({ extended: false });
const { userAuthenticate } = require("../middleware/Authenticate.middleware");

router.get("/restaurent/all", AllRestaurentFinder);
router.get("/restaurent/:id", RestaurantByIdFinder);
router.post("/restaurent/add-order", urlEncoded, userAuthenticate, AddOrder);

module.exports = router;
