const Set = require('../models/Set');
const Flashcard = require('../models/Flashcard');
const cloudinary = require('../../config/cloudinary');

class MeController {
    async editSet(req, res) {
        try {
            const set = await Set.findById(req.params.id).lean();
            if (!set) return res.status(404).send('Học phần không tồn tại');

            const flashcards = await Flashcard.find({ set_id: req.params.id }).lean();
            res.render('editSet', { set, flashcards });
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi server');
        }
    }

    async myLibrary(req, res) {
        try {
            if (!req.session.user) return res.redirect('/logIn');
            const sets = await Set.find({ user_id: req.session.user._id }).lean();
            res.render('myLibrary', { sets }); 
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    async update(req, res) {
        try {
            const setId = req.params.id;

            await Set.updateOne({ _id: setId }, {
                set_name: req.body.title,
                description: req.body.description,
            });

            await Flashcard.deleteMany({ set_id: setId });

            const words = req.body.word || [];
            const meanings = req.body.meaning || [];
            const oldImages = req.body.oldImg || [];

            const fileMap = {};
            if (req.files) {
                req.files.forEach(file => {
                    const match = file.fieldname.match(/img\[(\d+)\]/);
                    if (match) {
                        fileMap[parseInt(match[1])] = file;
                    }
                });
            }

            const flashcardsData = [];

            for (let i = 0; i < words.length; i++) {
                let imageUrl = oldImages[i] || '';

                if (fileMap[i]) {
                    imageUrl = await new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { folder: 'wordease' },
                            (error, result) => {
                                if (error) return reject(error);
                                resolve(result.secure_url);
                            }
                        );
                        stream.end(fileMap[i].buffer);
                    });
                }

                flashcardsData.push({
                    set_id: setId,
                    word: words[i],
                    meaning: meanings[i],
                    example_img: imageUrl,
                });
            }

            await Flashcard.insertMany(flashcardsData);
            res.redirect(`/flashcard/${setId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi server khi cập nhật');
        }
    }

    async delete(req, res) {
        try {
            const setId = req.params.id;
            await Set.deleteOne({ _id: setId });
            await Flashcard.deleteMany({ set_id: setId });
            res.redirect('/me/myLibrary');
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi server khi xóa');
        }
    }
}

module.exports = new MeController();
