'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  imgURL: {
    type: String,
    default: 'https://source.unsplash.com/PeDrafNlY2Y'
  },
  address: String,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: mongoose.Schema.Types.Decimal128,
        min: -180,
        max: 180
      }
    ]
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  },
  next: String
});

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Stop', schema);
