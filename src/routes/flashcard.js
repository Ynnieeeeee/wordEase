const express = require('express');
const route = express.Router();

const flashcardController = require('../app/controllers/FlashcardController');

route.get('/', flashcardController.index);
route.get('/:id', flashcardController.show);

module.exports = route;