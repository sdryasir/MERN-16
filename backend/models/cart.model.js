import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
        }
      ],
      default: [],
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "abandoned", "ordered"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);
