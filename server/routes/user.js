'use strict';

const { Router } = require('express');
const User = require('./../models/user');

const router = new Router();

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
    const user = await User.findById(userId).populate('badges');
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

const uploader = require('./../multer-configure');

// Route to edit user profile and upload the picture profile
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

// Route to associate the saved event to the user profile
router.patch('/:userId/add-event/:eventId', async (req, res, next) => {
  const { userId, eventId } = req.params;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { events: { eventId: eventId, completed: false } }
    },
    { new: true }
  );
  res.json({ user });
});

router.patch('/:userId/finish-event/:eventId/:badgeId', async (req, res, next) => {
  const { userId, eventId, badgeId } = req.params;

  let user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { events: { eventId: eventId } },
      $push: { badges: badgeId }
    },
    { new: true }
  );
  user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { events: { eventId: eventId, completed: true } }
    },
    { new: true }
  );
  res.json({ user });
});

module.exports = router;
