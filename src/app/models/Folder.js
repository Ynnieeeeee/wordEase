const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const Folder = new Schema({
    folder_name: {type: String, maxlength: 255, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref :'user'},
    slug: { type: String, unique: true },
    created_at: {type: Date, default: Date.now}
});

Folder.pre('save', function(next) {
    if (this.folder_name) {
        this.slug = slugify(this.folder_name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Folder', Folder);
