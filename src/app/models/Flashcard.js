const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Flashcard = new Schema({
    set_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' },
    word: {type: String, maxlength: 255, required: true},
    meaning: {type: String, maxlength: 255, required: true},
    transcription: {type: String, maxlength: 255},
    audio: { type: String, maxlength: 600 },
    example_img: {type: String}
});

module.exports = mongoose.model('Flashcard', Flashcard, 'words');
