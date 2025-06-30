const express = require('express');
const route = express.Router();

const payController = require('../app/controllers/PayController');

route.get('/', payController.index);

module.exports = route;