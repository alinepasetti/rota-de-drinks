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
        'https://res.cloudinary.com/dgogwav8v/image/upload/v1584990192/rota-de-drinks/user-solid_ffuo3d.svg'
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
          type: Boolean,
          default: false
        }
      }
    ],
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge'
      }
    ],
    stripeCustomerId: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

module.exports = mongoose.model('User', schema);
