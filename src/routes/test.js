const express = require('express');
const route = express.Router();

const testController = require('../app/controllers/TestController');
const checkUsage = require('../app/utils/checkUsage');

route.get('/:id', checkUsage('test'), testController.index);

module.exports = route;
