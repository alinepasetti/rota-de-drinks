'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  instructions: {
    type: String
  },
  imgURL: {
    type: String,
    default: 'https://source.unsplash.com/MxfcoxycH_Y'
  }
});

module.exports = mongoose.model('Activity', schema);
