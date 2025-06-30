// src/app/middlewares/checkUsage.js
const Usage = require('../models/Usage');
const User = require('../models/user');

module.exports = function (mode) {
    return async function (req, res, next) {
        try {
            const userSession = req.session.user;
            if (!userSession) return res.redirect('/login');

            const user = await User.findById(userSession._id).lean();
            if (!user) return res.status(401).send('Người dùng không hợp lệ');

            if (['monthly', 'yearly'].includes(user.plan)) {
                return next();
            }

            const usage = await Usage.findOneAndUpdate(
                { user_id: user._id, set_id: req.params.id },
                mode === 'lesson' ? { $inc: { lessonAttempts: 1 } } : { $inc: { testAttempts: 1 } },
                { new: true, upsert: true }
            );

            const attempts = mode === 'lesson' ? usage.lessonAttempts : usage.testAttempts;

            if (attempts > 1) {
                return res.status(403).render('pay', {
                    title: 'Đã hết lượt',
                    message: 'Bạn đang dùng gói Basic và đã hết lượt học/kiểm tra cho học phần này. Hãy nâng cấp để tiếp tục!'
                });
            }

            next();
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi kiểm tra lượt sử dụng');
        }
    };
};
