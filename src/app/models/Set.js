const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const Set = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  folder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  set_name: { type: String, maxLength: 500 },
  description: { type: String, maxLength: 600 },
  slug: { type: String, unique: true },
}, { timestamps: true }); 

Set.pre('save', function(next) {
    if (this.set_name) {
        this.slug = slugify(this.set_name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Set', Set);