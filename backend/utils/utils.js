export const OrderBuilder = (session) => {
  return {
    stripeSessionId: session.id,
    paymentIntentId: session.payment_intent,

    customer: {
      name: session.customer_details?.name || null,
      email: session.customer_details?.email || null,
      phone: session.customer_details?.phone || null,
      address: {
        line1: session.customer_details?.address?.line1 || null,
        line2: session.customer_details?.address?.line2 || null,
        city: session.customer_details?.address?.city || null,
        state: session.customer_details?.address?.state || null,
        postal_code: session.customer_details?.address?.postal_code || null,
        country: session.customer_details?.address?.country || null,
      },
    },

    line_items: session.line_items?.data?.map((item) => ({
      stripePriceId: item.price?.id,
      description: item.description,
      quantity: item.quantity,
      currency: item.currency,
      unit_amount: item.price?.unit_amount,
      total_amount: item.amount_total,
    })) || [],

    amount_subtotal: session.amount_subtotal,
    amount_total: session.amount_total,
    currency: session.currency,

    total_details: {
      amount_discount: session.total_details?.amount_discount || 0,
      amount_shipping: session.total_details?.amount_shipping || 0,
      amount_tax: session.total_details?.amount_tax || 0,
    },

    payment_status: session.payment_status,
    orderStatus: "pending",

    rawStripeResponse: session, // optional
  };
};