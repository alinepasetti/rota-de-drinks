'use strict';

const { Router } = require('express');
const Event = require('./../models/event');
const Stop = require('./../models/stop');
const Activity = require('./../models/activity');
const Badge = require('./../models/badge');

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
    stops,
  } = req.body;

  const badge = await Badge.create({
    name: badgeName,
    imgURL: badgeImgURL,
  });

  let stop;
  const stopIds = [];

  await Promise.all(
    stops.map(async (item) => {
      const stopExists = await Stop.findOne({ name: item.stopName });

      if (stopExists) {
        stop = stopExists;
        stopIds.push(stop._id);
      } else {
        const activity = await Activity.create({
          name: item.activityName,
          instructions: item.activityInstructions,
          imgURL: item.activityImgURL,
        });
        // console.log('activity', activity);

        stop = await Stop.create({
          name: item.stopName,
          imgURL: item.stopImgURL,
          address: item.stopAddress,
          location: { coordinates: [item.stopLng, item.stopLat] },
          activity: activity._id,
        });
        stopIds.push(stop._id);
        // console.log('stop', stop);
      }
    })
  );
  // console.log(stopIds);

  const event = await Event.create({
    name,
    imgURL,
    description,
    location,
    tags,
    price,
    badge: badge._id,
    stops: stopIds,
  });
  // console.log('event', event);

  //   const activityData = {
  //     activity1: {
  //       name: activityName,
  //       instructions: activityInstructions,
  //       imgURL: activityImgURL
  //     },
  //     activity2: {
  //       name: activityName2,
  //       instructions: activityInstructions2,
  //       imgURL: activityImgURL2
  //     },
  //     activity3: {
  //       name: activityName3,
  //       instructions: activityInstructions3,
  //       imgURL: activityImgURL3
  //     }
  //   };

  //   const activity1 = await Activity.create(activityData.activity1);
  //   const activity2 = await Activity.create(activityData.activity2);
  //   const activity3 = await Activity.create(activityData.activity3);

  //   // defining the variables for each stop
  //   let stop1, stop2, stop3;

  //   const stopsData = {
  //     stop1: {
  //       name: stopName,
  //       imgURL: stopImgURL,
  //       address: stopAddress,
  //       location: { coordinates: [stopLng, stopLat] },
  //       activity: activity1._id
  //     },
  //     stop2: {
  //       name: stopName2,
  //       imgURL: stopImgURL2,
  //       address: stopAddress2,
  //       location: { coordinates: [stopLng2, stopLat2] },
  //       activity: activity2._id
  //     },
  //     stop3: {
  //       name: stopName3,
  //       imgURL: stopImgURL3,
  //       address: stopAddress3,
  //       location: { coordinates: [stopLng3, stopLat3] },
  //       activity: activity3._id
  //     }
  //   };

  //   // checking if the stops were already created in the DB
  //   const stop1Exists = await Stop.findOne({ name: stopsData.stop1.name });
  //   stop1Exists ? (stop1 = stop1Exists) : (stop1 = await Stop.create(stopsData.stop1));

  //   const stop2Exists = await Stop.findOne({ name: stopsData.stop2.name });
  //   stop2Exists ? (stop2 = stop2Exists) : (stop2 = await Stop.create(stopsData.stop2));

  //   const stop3Exists = await Stop.findOne({ name: stopsData.stop3.name });
  //   stop3Exists ? (stop3 = stop3Exists) : (stop3 = await Stop.create(stopsData.stop3));

  //   // creating the event and associating the stops within it
  //   const event = await Event.create({
  //     name,
  //     imgURL,
  //     description,
  //     location,
  //     tags,
  //     price,
  //     badge: badge._id,
  //     stops: [stop1._id, stop2._id, stop3._id]
  //   });

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
  const event = await Event.findById(eventId)
    .populate('attendees')
    .populate('badge')
    .populate({
      path: 'stops',
      populate: { path: 'activity' },
    });
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
});

module.exports = router;
