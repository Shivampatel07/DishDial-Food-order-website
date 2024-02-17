const Restaurents = require("../models/Restaurentmodel.model");
const RestaurantProduct = require("../models/RestaurentProductmodel.model");
const Order = require("../models/Ordermodel.model");
const mongoose = require("mongoose");

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
    res.status(200).json({
      restaurant,
      products: RestaurantProductData ? RestaurantProductData : [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
