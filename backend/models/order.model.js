import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema({
  stripePriceId: { type: String }, // if you used Stripe price objects
  description: { type: String },
  quantity: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  unit_amount: { type: Number, required: true }, // from Stripe in cents
  total_amount: { type: Number, required: true }, // unit * quantity
});

const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: { type: String, required: true }, // session.id
    paymentIntentId: { type: String }, // session.payment_intent

    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        postal_code: { type: String },
        country: { type: String },
      },
    },

    line_items: [lineItemSchema],

    amount_subtotal: { type: Number, required: true },
    amount_total: { type: Number, required: true },
    currency: { type: String, default: "usd" },

    total_details: {
      amount_discount: { type: Number, default: 0 },
      amount_shipping: { type: Number, default: 0 },
      amount_tax: { type: Number, default: 0 },
    },

    payment_status: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      default: "unpaid",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    rawStripeResponse: { type: Object }, // optional: keep full session JSON
  },
  { timestamps: true }
);

const Order =  mongoose.model("Order", orderSchema);

export default Order;
