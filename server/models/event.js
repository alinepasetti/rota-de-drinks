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
  badge: mongoose.Schema.Types.ObjectId,
  stops: [mongoose.Schema.Types.ObjectId],
  attendees: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Event', schema);
