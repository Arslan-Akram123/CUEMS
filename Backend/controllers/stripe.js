
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(req, res) {
     console.log("Creating payment intent with body:", req.body);
      try {
       
    const { amount, currency } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, 
      currency: currency || 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createPaymentIntent
};