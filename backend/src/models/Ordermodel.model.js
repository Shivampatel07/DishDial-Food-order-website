const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RestaurantProduct",
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("Order", orderSchema);
