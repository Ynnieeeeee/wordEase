const express = require('express');
const route = express.Router();

const upload = require('../app/utils/upload');
const createrSetController = require('../app/controllers/CreaterSetController');

route.get('/', createrSetController.index);
route.post('/store', upload.array('img[]'), createrSetController.store);

module.exports = route;