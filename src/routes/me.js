const express = require('express');
const route = express.Router();

const meController = require('../app/controllers/MeController');
const upload = require('../app/utils/upload');

route.get('/stored/sets/:id/edit', meController.editSet);
route.get('/myLibrary', meController.myLibrary);
route.put('/stored/sets/:id', upload.any(), meController.update);
route.delete('/stored/sets/:id', meController.delete);

module.exports = route;