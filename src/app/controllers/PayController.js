class PayController {
    index (req, res) {
        res.render('pay');
    }
}

module.exports = new PayController();