'use strict';

const { Router } = require('express');
const router = new Router();
const User = require('./../models/user');

router.get('/loggedUser', async (req, res, next) => {
  let user;
  req.user
    ? (user = await User.findById(req.user._id).populate({
        path: 'events.eventId',
        model: 'Event'
      }))
    : null;

  res.json({ user });
});

router.get('/profile/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await await User.findById(userId); //.populate('events.eventId');
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

const uploader = require('./../multer-configure');

router.patch('/profile/:userId/edit', uploader.single('picture'), async (req, res, next) => {
  const userId = req.user._id;
  const { firstName, lastName, email, city, about } = req.body;
  let picture;
  if (req.file) picture = req.file.url;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        ...(city !== 'undefined' ? { city } : null),
        ...(about !== 'undefined' ? { about } : null),
        ...(picture ? { picture } : {})
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.patch('/:userId/add-event/:eventId', async (req, res, next) => {
  let { userId, eventId } = req.params;
  console.log('userID:', userId, 'event:', eventId);
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { events: { eventId: eventId, completed: false } }
    },
    { new: true }
  );
  res.json({ user });
});

module.exports = router;
