const Feedback = require('../models/Feedback')

class FeedBackController {
    async index(req, res){
        try {
            const feedbacks = await Feedback.find({}).populate('user_id', 'username').lean();

            //Xử lí created_at
            feedbacks.forEach(fb => {
                const date = new Date(fb.created_at);
                fb.created_at = date.toLocaleDateString('vi-VN');
            });

            res.render('feedback', {feedbacks} )
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    async store(req, res){
        const {comment} = req.body;
        try {
            if (!req.user) {
            return res.render('feedback', {showNotification: true});
            }

            const newFeedback = new Feedback({
                comment: comment,
                user_id: req.user._id
            })

            await newFeedback.save();
            res.redirect('/feedback');
        } catch (error) {
            res.status(500).json({ error: 'ERROR!!!' });
        }
    }
}

module.exports = new FeedBackController();