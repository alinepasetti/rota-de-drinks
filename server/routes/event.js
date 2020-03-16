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
  const spot = await Spot.create({
    name: stopName,
    imgURL: stopImgURL,
    address: stopAddress,
    location: { coordinates: [stopLat, stopLng] }
  });
  const spot2 = await Spot.create({
    name: stopName2,
    imgURL: stopImgURL2,
    address: stopAddress2,
    location: { coordinates: [stopLat2, stopLng2] }
  });
  const spot3 = await Spot.create({
    name: stopName3,
    imgURL: stopImgURL3,
    address: stopAddress3,
    location: { coordinates: [stopLat3, stopLng3] }
  });
  const event = await Event.create({
    name,
    imgURL,
    description,
    location,
    tags,
    price,
    stops: [spot._id, spot2._id, spot3._id]
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
