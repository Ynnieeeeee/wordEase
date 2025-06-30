const express = require('express');
const route = express.Router();

const myLibraryController = require('../app/controllers/MyLibraryController');

route.get('/', myLibraryController.index);

module.exports = route;
