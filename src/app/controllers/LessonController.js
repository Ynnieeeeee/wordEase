const Flashcard = require('../models/Flashcard');
const Set = require('../models/Set');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

class LessonController {
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
                const random = Math.floor(Math.random() * 3);
                //Điền vào chổ trống
                if (random === 0) {
                    exercises.push({
                        type: 'fill',
                        word: card.word,
                        meaning: card.meaning,
                    });
                
                //Chọn đúng sai
                } else if (random === 1) {
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
                    //Trắc nghiệm 4 đáp án
                } else {
                    const choices = shuffle(flashcards.filter(fc => fc._id.toString() !== card._id.toString()))
                        .slice(0, 3)
                        .map(fc => fc.meaning);
                    choices.push(card.meaning);
                    exercises.push({
                        type: 'multiplechoice',
                        word: card.word,
                        choices: shuffle(choices),
                        correct: card.meaning,
                    });
                }
            }

            res.render('lesson', { set, exercises });
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi server khi tạo bài học');
        }
    }
}

module.exports = new LessonController();
