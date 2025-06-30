const express = require('express');
const route = express.Router();

const feedbackController = require('../app/controllers/FeedBackController');

route.get('/', feedbackController.index);
route.post('/store', feedbackController.store);

module.exports = route;