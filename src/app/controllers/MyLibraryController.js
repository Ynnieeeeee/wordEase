const Set = require('../models/Set');
const Folder = require('../models/Folder');

class MyLibraryController {
    async index(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/logIn');
            }

            const userId = req.session.user._id;
            const keyword = req.query.keyword?.trim() || '';

            if (keyword !== '') {
                // Tìm học phần
                const foundSets = await Set.find({
                    user_id: userId,
                    set_name: { $regex: keyword, $options: 'i' }
                }).lean();

                if (foundSets.length > 0) {
                    return res.render('myLibrary', { sets: foundSets });
                }

                //Nếu không tìm thấy
                return res.render('myLibrary', {sets: [],message: 'Không tìm thấy học phần'});
            }

            // Nếu không tìm kiếm, trả về tất cả học phần
            const sets = await Set.find({ user_id: userId }).lean();
            res.render('myLibrary', { sets });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Đã xảy ra lỗi phía máy chủ' });
        }
    }
}

module.exports = new MyLibraryController();
