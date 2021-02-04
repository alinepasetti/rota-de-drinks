'use strict';

// const axios = require('axios');

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

router.get('/items', (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const nextPage = `/items/${page + 1}`;
  console.log(nextPage);
  axios(`https://sf-legacy-api.now.sh/items?page=${page}`);

  res.json({ nextPage });
});

module.exports = router;
