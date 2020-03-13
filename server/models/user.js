'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String
    },
    picture: {
      type: String,
      default:
        'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg'
    },
    about: {
      type: String
    },
    city: {
      type: String
    },
    events: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event'
        },
        completed: {
          type: Boolean
        }
      }
    ],
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge'
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

module.exports = mongoose.model('User', schema);
