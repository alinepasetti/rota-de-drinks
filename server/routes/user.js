'use strict';

const { Router } = require('express');
const router = new Router();
const User = require('./../models/user');

router.get('/loggedUser', (req, res, next) => {
  res.json({ user: req.user || null });
});

router.get('/profile/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
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

module.exports = router;
