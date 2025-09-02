import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
}, { timestamps: true });

const Cart =  mongoose.model("Cart", cartSchema);
export default Cart;



// {
//   userId:45698746666,
//   items:[
//     {
//       productId:458796584522,
//       name:"product Name",
//       price:256,
//       quantity:2
//     },
//     {
//       productId:458796584522,
//       name:"product Name",
//       price:256,
//       quantity:2
//     },
//     {
//       productId:458796584522,
//       name:"product Name",
//       price:256,
//       quantity:2
//     }
//   ]
// }
