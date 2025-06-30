const express = require('express');
const route = express.Router();

const aboutUsController = require('../app/controllers/AboutUsController');

route.get('/', aboutUsController.index);

module.exports = route;