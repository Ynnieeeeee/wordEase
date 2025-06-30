const registerModel = require('../models/user');
const md5 = require('md5');

class RegisterController {
    index(req, res){
        res.render('register',{layout:false})
    }

    async store(req, res){
        const {username, email, password} = req.body;
        try {

            const emailHash = md5(email.trim().toLowerCase());
            const avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

            const newRegister = new registerModel({
                username: username,
                email: email,
                password: password,
                avatar: avatarUrl
        });

        await newRegister.save();
        req.session.user = {
            _id: newRegister._id,
            username: newRegister.username,
            avatar: newRegister.avatar
        };
        res.redirect('/home');
        } catch (error) {
            res.status(500).json({ error: 'ERROR!!!' });
        }

    }
}

module.exports = new RegisterController();