const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Đăng xuất thất bại');
    }
    res.redirect('/home');
  });
});

module.exports = route;