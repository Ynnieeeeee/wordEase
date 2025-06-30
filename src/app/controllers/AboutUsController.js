const { index } = require("./HomeController");

class AboutUsController {
    index(req, res) {
        res.render('aboutUs');
    }
};

module.exports = new AboutUsController();