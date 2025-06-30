const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subscription = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    plan: { type: String, enum: ['basic', 'monthly', 'yearly'], default: 'basic' },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Subscription', Subscription);
