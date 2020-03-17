'use strict';

const { Router } = require('express');
const Event = require('./../models/event');
const Stop = require('./../models/stop');

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
    badgeName,
    badgeImgURL,
    stopName,
    stopImgURL,
    stopAddress,
    stopLat,
    stopLng,
    activityName,
    activityInstructions,
    activityImgURL,
    stopName2,
    stopImgURL2,
    stopAddress2,
    stopLat2,
    stopLng2,
    activityName2,
    activityInstructions2,
    activityImgURL2,
    stopName3,
    stopImgURL3,
    stopAddress3,
    stopLat3,
    stopLng3,
    activityName3,
    activityInstructions3,
    activityImgURL3
  } = req.body;

  // defining the variables for each activity
  const activityData = {
    activity1: {
      name: activityName,
      instructions: activityInstructions,
      imgURL: activityImgURL
    },
    activity2: {
      name: activityName2,
      instructions: activityInstructions2,
      imgURL: activityImgURL2
    },
    activity3: {
      name: activityName3,
      instructions: activityInstructions3,
      imgURL: activityImgURL3
    }
  };

  // defining the variables for each stop
  let stop1, stop2, stop3;

  const stopsData = {
    stop1: {
      name: stopName,
      imgURL: stopImgURL,
      address: stopAddress,
      location: { coordinates: [stopLng, stopLat] }
    },
    stop2: {
      name: stopName2,
      imgURL: stopImgURL2,
      address: stopAddress2,
      location: { coordinates: [stopLng2, stopLat2] }
    },
    stop3: {
      name: stopName3,
      imgURL: stopImgURL3,
      address: stopAddress3,
      location: { coordinates: [stopLng3, stopLat3] }
    }
  };

  // checking if the stops were already created in the DB
  const stop1Exists = await Stop.findOne({ name: stopsData.stop1.name });
  stop1Exists ? (stop1 = stop1Exists) : (stop1 = await Stop.create(stopsData.stop1));

  const stop2Exists = await Stop.findOne({ name: stopsData.stop2.name });
  stop2Exists ? (stop2 = stop2Exists) : (stop2 = await Stop.create(stopsData.stop2));

  const stop3Exists = await Stop.findOne({ name: stopsData.stop3.name });
  stop3Exists ? (stop3 = stop3Exists) : (stop3 = await Stop.create(stopsData.stop3));

  // creating the event and associating the stops within it
  const event = await Event.create({
    name,
    imgURL,
    description,
    location,
    tags,
    price,
    stops: [stop1._id, stop2._id, stop3._id]
  });

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
