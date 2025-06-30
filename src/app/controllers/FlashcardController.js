const Flashcard = require('../models/Flashcard');
const Set = require('../models/Set');
const fetchPronunciation = require('../utils/fetchPronunciation');

class FlashcardController {
    async index(req, res) {
        try {
            const flashcards = await Flashcard.find({}).lean();

            for (let card of flashcards) {
                if (!card.transcription || !card.audio) {
                    const { phonetic, audio } = await fetchPronunciation(card.word);
                    card.transcription = phonetic;
                    card.audio = audio;
                    await Flashcard.updateOne({ _id: card._id }, { transcription: phonetic, audio: audio });
                }
            }

            res.render('flashcard', { flashcards });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Lỗi khi tải flashcards' });
        }
    }

    async show(req, res) {
        try {
            const setId = req.params.id;
            const flashcards = await Flashcard.find({ set_id: setId }).lean();
            const set = await Set.findById(setId).lean();

            if (!set) return res.render('flashcard', {showNotification: true});

            for (let card of flashcards) {
                if (!card.transcription || !card.audio) {
                    const { phonetic, audio } = await fetchPronunciation(card.word);
                    card.transcription = phonetic;
                    card.audio = audio;
                    await Flashcard.updateOne({ _id: card._id }, { transcription: phonetic, audio: audio });
                }
            }

            res.render('flashcard', { flashcards, set });
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi server khi hiển thị học phần');
        }
    }

    async create(req, res) {
        const { word, meaning, example_img, set_id } = req.body;

        try {
            const { phonetic, audio } = await fetchPronunciation(word);

            const newCard = new Flashcard({
                word,
                meaning,
                example_img,
                set_id,
                transcription: phonetic,
                audio: audio,
            });

            await newCard.save();

            const set = await Set.findById(set_id).lean();
            const flashcards = await Flashcard.find({ set_id }).lean();

            for (let card of flashcards) {
                if (!card.transcription || !card.audio) {
                    const { phonetic, audio } = await fetchPronunciation(card.word);
                    card.transcription = phonetic;
                    card.audio = audio;
                    await Flashcard.updateOne({ _id: card._id }, { transcription: phonetic, audio: audio });
                }
            }

            res.render('flashcard', { flashcards, set });
        } catch (error) {
            console.error('Lỗi khi tạo flashcard:', error);
            res.status(500).send('Tạo flashcard thất bại');
        }
    }
}

module.exports = new FlashcardController();
