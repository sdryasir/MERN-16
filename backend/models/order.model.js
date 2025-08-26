import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assumes you have a User model
      required: true,
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true, // so we don’t create duplicate orders
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // store as number in USD
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "no_payment_required"],
      default: "unpaid",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order =  mongoose.model("Order", orderSchema);

export default Order;
