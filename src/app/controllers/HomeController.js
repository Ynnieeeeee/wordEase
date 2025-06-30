const Feedback = require('../models/Feedback');

class HomeController {
    //[get] /home
    async index (req, res) {
        try {
             const user = req.session.user;

             console.log('SESSION USER:', user);


            // Lấy feedback từ MongoDB, sắp xếp theo thời gian mới nhất
            const feedbacks = await Feedback.find({}).populate('user_id', 'username').sort({ created_at: -1 }).limit(4).lean(); // Lấy 4 feedback đầu tiên để hiển thị

            feedbacks.forEach(fb => {
                const date = new Date(fb.created_at);
                fb.created_at = date.toLocaleDateString('vi-VN');
            });
            
            res.render('home', { user, feedbacks });
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }
}

module.exports = new HomeController();