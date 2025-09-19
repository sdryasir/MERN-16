
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Order from '../models/order.model.js';
import { OrderBuilder } from '../utils/utils.js';

export const stripePayment = async (req, res, next)=>{
  try {
    const {items} = req.body;

    const lineItems = items.map((item)=>{
      return {
        price_data:{
          currency:"usd",
          product_data:{
            name:item.title
          },
          unit_amount:item.unit_price
        },
        quantity:item.quantity
      }
    })



    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:5174/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5174/cancel',
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ["card"],
      client_reference_id:req?.user?.id
    });


    res.json({ id: session.id })

  } catch (error) {
    console.log(error.message);
    
    res.json({
      message: error?.message || 'Something went wrong while payment'
    })
  }
}



export const confirmOrder = async (req, res, next)=>{
  try {
    const {sessionId} = req.body;
    const io = req.app.get("io");

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand:['line_items']
    });


    const orderObj = OrderBuilder(session);

    const newOrder = await Order.create(orderObj);
    const socket = req.app.get("socket");
    socket.emit('new-order', newOrder)



    io.emit("new-order", {newOrder})

    //sendEmail()
    
    res.json({
      newOrder
    })

  } catch (error) {
    console.log("Session retrieve error", error);
    res.json({
      message: error?.message || "Order could not be created. Something went wrog"
    })
  }
}





// transformer.js


