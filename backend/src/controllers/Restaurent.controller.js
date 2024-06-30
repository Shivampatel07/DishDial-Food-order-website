const Restaurents = require("../models/Restaurentmodel.model");
const RestaurantProduct = require("../models/RestaurentProductmodel.model");
const Order = require("../models/Ordermodel.model");
const mongoose = require("mongoose");
const { successResponse, catchResponse, errorResponse } = require("../utils/index.utils");

const AllRestaurentFinder = async (req, res) => {
  try {
    const allRestaurents = await Restaurents.find();
    return successResponse(res, allRestaurents, "All restaurant found successfully")
  } catch (error) {
    return catchResponse(res, "Error occured to get all restaurant", error)
  }
};

const RestaurantByIdFinder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      const errorMessage = "Invalid restaurant page"
      return errorResponse(res, errorMessage, 400)
    }

    const restaurant = await Restaurents.findById(id);
    const RestaurantProductData = await RestaurantProduct.find({
      restaurentId: restaurant._id,
    });

    const restaurantData = {
      restaurant,
      products: RestaurantProductData ? RestaurantProductData : [],
    }
    return successResponse(res, restaurantData, "Restaurant data found successfully")
  } catch (error) {
    return catchResponse(res, "Error occured in get restaurant data", error)
  }
};

const AddOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, price, shippingPrice, totalPrice } =
      req.body;
    
    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(req.user._id),
      orderItems,
      shippingAddress,
      price,
      shippingPrice,
      totalPrice,
    });
    await newOrder.save();
    res.status(200).json({ message: "Order added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { AllRestaurentFinder, RestaurantByIdFinder, AddOrder };
