const express = require('express');
const route = express.Router();

const vnPayController = require('../app/controllers/VNPayController');

route.post('/api/create-qr', vnPayController.createrQR);
route.get('/api/check-payment-vnpay', vnPayController.check);

module.exports = route;