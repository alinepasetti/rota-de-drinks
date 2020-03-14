'use strict';

const { Router } = require('express');
const router = new Router();
const User = require('./../models/user');

router.get('/profile/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.get('/loggedUser', (req, res, next) => {
  res.json({ user: req.user || null });
});

module.exports = router;
