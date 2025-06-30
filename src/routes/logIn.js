const express = require('express');
const route = express.Router();

const logInController = require('../app/controllers/LogInController');

route.get('/', logInController.index);
route.post('/store', logInController.store);

module.exports = route;