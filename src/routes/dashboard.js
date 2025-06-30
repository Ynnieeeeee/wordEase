const express = require('express');
const route = express.Router();

const dashboardController = require('../app/controllers/DashBoardController');

route.get('/', dashboardController.index);

module.exports = route;
