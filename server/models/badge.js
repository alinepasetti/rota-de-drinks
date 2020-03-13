'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  imgURL: {
    type: String
  }
});

module.exports = mongoose.model('Badge', schema);
