const express = require('express');
const route = express.Router();

const registerController = require('../app/controllers/RegisterController');

route.get('/', registerController.index);
route.post('/store', registerController.store);

module.exports = route;