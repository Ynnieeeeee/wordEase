const sets = require('../models/Set');
const flashcardsModel = require('../models/Flashcard');
const fetchPronunciation = require('../utils/fetchPronunciation');
const cloudinary = require('../../config/cloudinary');

class CreaterSetController {
    index(req, res) {
        res.render('createrSets');
    }

    async store(req, res) {
        try {
            const { title, description, word, meaning } = req.body;
            const images = req.files;

            if (!req.user) {
                return res.render('createrSets', { showNotification: true });
            }

            if (!title || !word || !meaning) {
                return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tiêu đề, từ vựng và nghĩa!' });
            }

            const newSet = new sets({
                set_name: title,
                description,
                user_id: req.session.user._id,
            });

            const savedSet = await newSet.save();

            const wordArray = Array.isArray(word) ? word : [word];
            const meaningArray = Array.isArray(meaning) ? meaning : [meaning];

            const flashcards = [];

            for (let i = 0; i < wordArray.length; i++) {
                if (wordArray[i] && meaningArray[i]) {
                    const { phonetic, audio } = await fetchPronunciation(wordArray[i]);

                    let imageUrl = '';

                    if (images && images[i]) {
                        imageUrl = await new Promise((resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                { folder: 'wordease' },
                                (error, result) => {
                                    if (error) return reject(error);
                                    resolve(result.secure_url);
                                }
                            );
                            stream.end(images[i].buffer);
                        });
                    }

                    flashcards.push({
                        set_id: savedSet._id,
                        word: wordArray[i],
                        meaning: meaningArray[i],
                        transcription: phonetic,
                        audio,
                        example_img: imageUrl,
                    });
                }
            }

            if (flashcards.length > 0) {
                await flashcardsModel.insertMany(flashcards);
            }

            res.redirect('/myLibrary');
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu:', error);
            res.status(500).json({ error: 'Lỗi khi tạo học phần' });
        }
    }
}

module.exports = new CreaterSetController();
