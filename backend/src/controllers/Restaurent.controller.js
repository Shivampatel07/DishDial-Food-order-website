const Restaurents = require("../models/Restaurentmodel.model");
const RestaurantProduct = require("../models/RestaurentProductmodel.model");

const AllRestaurentFinder = async (req, res) => {
  try {
    const allRestaurents = await Restaurents.find();
    res.status(200).json(allRestaurents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const RestaurantByIdFinder = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurents.findById(id);
    const RestaurantProductData = await RestaurantProduct.find({
      restaurentId: restaurant._id,
    });
    console.log(RestaurantProductData, restaurant);
    res.status(200).json({
      restaurant,
      products: RestaurantProductData ? RestaurantProductData : [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { AllRestaurentFinder, RestaurantByIdFinder };
