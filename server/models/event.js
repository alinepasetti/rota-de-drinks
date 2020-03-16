'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  imgURL: String,
  description: String,
  location: String,
  tags: [String],
  price: Number,
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  },
  stops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spot'
    }
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Event', schema);
