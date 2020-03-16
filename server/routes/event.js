'use strict';

const { Router } = require('express');
const Event = require('./../models/event');
const Spot = require('./../models/spot');

const router = new Router();

// Route to create new events
router.post('/create-new', async (req, res, next) => {
  const {
    name,
    imgURL,
    description,
    location,
    tags,
    price,
    stopName,
    stopImgURL,
    stopAddress,
    stopLat,
    stopLng,
    stopName2,
    stopImgURL2,
    stopAddress2,
    stopLat2,
    stopLng2,
    stopName3,
    stopImgURL3,
    stopAddress3,
    stopLat3,
    stopLng3
  } = req.body;

  let spot1, spot2, spot3;

  const spotsData = {
    spot1: {
      name: stopName,
      imgURL: stopImgURL,
      address: stopAddress,
      location: { coordinates: [stopLat, stopLng] }
    },
    spot2: {
      name: stopName2,
      imgURL: stopImgURL2,
      address: stopAddress2,
      location: { coordinates: [stopLat2, stopLng2] }
    },
    spot3: {
      name: stopName3,
      imgURL: stopImgURL3,
      address: stopAddress3,
      location: { coordinates: [stopLat3, stopLng3] }
    }
  };

  const spot1Exists = await Spot.findOne({ name: spotsData.spot1.name });
  spot1Exists ? (spot1 = spot1Exists) : (spot1 = await Spot.create(spotsData.spot1));

  const spot2Exists = await Spot.findOne({ name: spotsData.spot2.name });
  spot2Exists ? (spot2 = spot2Exists) : (spot2 = await Spot.create(spotsData.spot2));

  const spot3Exists = await Spot.findOne({ name: spotsData.spot3.name });
  spot3Exists ? (spot3 = spot3Exists) : (spot3 = await Spot.create(spotsData.spot3));

  const event = await Event.create({
    name,
    imgURL,
    description,
    location,
    tags,
    price,
    stops: [spot1._id, spot2._id, spot3._id]
  });

  // event.populate()
  res.json({ event });
});

// Route to find all events
router.get('/', async (req, res, next) => {
  const events = await Event.find();
  res.json({ events });
});

// route to find one specific event
router.get('/:eventId', async (req, res, next) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  res.json({ event });
});

// Route to save user into attendees array
router.patch('/:eventId/add-attendee/:userId', async (req, res, next) => {
  const { eventId, userId } = req.params;
  const event = await Event.findByIdAndUpdate(
    eventId,
    { $push: { attendees: userId } },
    { new: true }
  );
  res.json({ event });
  // event.attendees.push(userId).save();
});

module.exports = router;
