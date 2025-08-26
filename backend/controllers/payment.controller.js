
import Stripe from 'stripe';
import Order from '../models/order.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ["card"],
    });


    res.json({ id: session.id })

  } catch (error) {
    console.log(error);
    
    res.json({
      message: error?.message || 'Something went wrong while payment'
    })
  }
}


export const confirmOrder = async (req, res)=>{
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"], // so you also get items
    });

    if (session.payment_status === "paid") {
      // Prevent duplicate orders if user refreshes success page
      const existingOrder = await Order.findOne({ stripeSessionId: session.id });
      if (existingOrder) {
        return res.json({ success: true, order: existingOrder });
      }

      // Create new order
      const newOrder = await Order.create({
        userId: session.client_reference_id,
        stripeSessionId: session.id,
        items: session.line_items.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.amount_total / 100,
        })),
        totalAmount: session.amount_total / 100,
        paymentStatus: session.payment_status,
      });

      return res.json({ success: true, order: newOrder });
    }

    res.status(400).json({ success: false, message: "Payment not completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}