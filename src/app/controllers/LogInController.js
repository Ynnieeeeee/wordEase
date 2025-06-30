const userModel = require('../models/user');

class LogInController {
    index(req, res) {
        res.render('logIn',{layout:false})
    }

    async store(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.render('logIn', {showNotificationMail: true});
            }

            if (password !== user.password) {
                return res.render('logIn', {showNotificationPassword: true});
            }

            req.session.user = {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                role: user.role,
            };

            if (user.role === 'admin') {
                res.redirect('/dashboard');
            } else {
                res.redirect('/home');
            }

        } catch (error) {
            res.status(500).json({ error: 'ERROR!!!' });
        }
    }

};

module.exports = new LogInController();