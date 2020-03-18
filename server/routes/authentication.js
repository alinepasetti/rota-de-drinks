'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const stripe = require('./../stripe-configure');
const User = require('./../models/user');

const router = new Router();

router.post('/sign-up', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const customer = await stripe.customers.create();
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash: hash,
      stripeCustomerId: customer.id
    });
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
