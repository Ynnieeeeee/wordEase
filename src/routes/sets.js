const express = require('express');
const route = express.Router();

const setController = require('../app/controllers/SetController');

route.get('/:slug', setController.show);

module.exports = route;