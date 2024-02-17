const { AllRestaurentFinder, RestaurantByIdFinder } = require("../controllers/Restaurent.controller");
const router = require("express").Router();
const urlEncoded = require("body-parser").urlencoded({ extended: false });

router.get("/restaurent/all", AllRestaurentFinder);
router.get("/restaurent/:id", RestaurantByIdFinder);

module.exports = router;
