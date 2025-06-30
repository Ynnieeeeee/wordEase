const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, maxlength: 255, required: true, unique: true },
    email: { type: String, maxlength: 500, required: true, unique: true },
    password: { type: String, maxlength: 50, required: true },
    role: { type: String, default: "user" },
    avatar: { type: String },
    plan: { type: String, default: "basic" },
    create_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('user', User);
