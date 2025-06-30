const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    comment: {type: String, maxLength: 600},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Feedback', Feedback);
