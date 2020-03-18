'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  paymentIntent: {
    type: String
  },
  charged: {
    type: Boolean
  },
  price: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model('Purchase', schema);
