
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


    console.log("------req?.user?.id", req?.user?.id);
    

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
    console.log(error);
    
    res.json({
      message: error?.message || 'Something went wrong while payment'
    })
  }
}



export const confirmOrder = async (req, res, next)=>{
  try {
    const {sessionId} = req.body;


    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand:['line_items']
    });


    const orderObj = OrderBuilder(session);

    const newOrder = await Order.create(orderObj);

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


