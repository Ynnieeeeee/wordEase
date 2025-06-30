const Set = require('../models/Set');
const Flashcard = require('../models/Flashcard');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

class TestController {
    async index(req, res) {
        try {
            const setId = req.params.id;
            const flashcards = await Flashcard.find({ set_id: setId }).lean();
            const set = await Set.findById(setId).lean();

            if (!set || flashcards.length === 0) {
                return res.status(404).send('Không tìm thấy học phần hoặc học phần rỗng');
            }

            const exercises = [];

            for (let i = 0; i < flashcards.length; i++) {
                const card = flashcards[i];
                const random = Math.floor(Math.random() * 4);

                if (random === 0) {
                    // Điền vào chỗ trống
                    exercises.push({
                        type: 'fill',
                        word: card.word,
                        meaning: card.meaning,
                    });

                } else if (random === 1) {
                    // Đúng/Sai
                    const isCorrect = Math.random() > 0.5;
                    let wrongMeaning = card.meaning;
                    while (wrongMeaning === card.meaning && flashcards.length > 1) {
                        wrongMeaning = shuffle(flashcards)[0].meaning;
                    }
                    exercises.push({
                        type: 'truefalse',
                        word: card.word,
                        displayedMeaning: isCorrect ? card.meaning : wrongMeaning,
                        correct: isCorrect,
                    });

                } else if (random === 2) {
                    // Trắc nghiệm 4 đáp án
                    const choices = shuffle(flashcards.filter(fc => fc._id.toString() !== card._id.toString())).slice(0, 3).map(fc => fc.meaning);
                    choices.push(card.meaning);
                    exercises.push({
                        type: 'multiplechoice',
                        word: card.word,
                        choices: shuffle(choices),
                        correct: card.meaning,
                    });

                } else if (card.audio) {
                    // Audio choice
                    const choices = shuffle(flashcards.filter(fc => fc._id.toString() !== card._id.toString())).slice(0, 3).map(fc => fc.word);
                    choices.push(card.word);
                    exercises.push({
                        type: 'audiochoice',
                        audio: card.audio,
                        correct: card.word,
                        choices: shuffle(choices),
                    });
                }
            }

            res.render('test', { set, exercises });
        } catch (error) {
            console.error(error);
            res.status(500).send("Lỗi server khi tạo bài kiểm tra");
        }
    }
}

module.exports = new TestController();
