const express = require('express');
const route = express.Router();
const lessonController = require('../app/controllers/LessonController');
const checkUsage = require('../app/utils/checkUsage');

route.get('/:id', checkUsage('lesson'), lessonController.index);

module.exports = route;
