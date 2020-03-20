'use strict';

const { Router } = require('express');
const stripe = require('./../stripe-configure');

const Event = require('./../models/event');
const Purchase = require('./../models/purchase');
const PaymentMethod = require('./../models/payment-method');

const router = new Router();

router.get('/list', async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id });
    res.json({ purchases });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findOne({ _id: eventId });
    const amount = event.price;
    const currency = 'EUR';

    const paymentMethod = await PaymentMethod.findOne({ owner: req.user._id });

    const purchase = await Purchase.create({
      user: req.user._id,
      event: eventId,
      price: amount,
      charged: false
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: req.user.stripeCustomerId,
      payment_method: paymentMethod.token,
      error_on_requires_action: true,
      confirm: true,
      save_payment_method: true
    });

    const paymentStatus = paymentIntent.status;
    await purchase.update({ paymentIntent: paymentIntent.id, charged: true });

    res.json({ purchase, paymentStatus });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
