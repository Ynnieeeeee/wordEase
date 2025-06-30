const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

const Usage = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  set_id : { type: Schema.Types.ObjectId, ref: 'Set',  required: true },
  lessonAttempts: { type: Number, default: 0 }, // số lần mở chế độ học
  testAttempts  : { type: Number, default: 0 }, // số lần mở chế độ kiểm tra
}, { timestamps: true });

Usage.index({ user_id: 1, set_id: 1 }, { unique: true }); // khoá tổng hợp duy nhất
module.exports = mongoose.model('Usage', Usage);
