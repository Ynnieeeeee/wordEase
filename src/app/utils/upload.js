const multer = require('multer');

const storage = multer.memoryStorage(); // dùng để lưu ảnh trong RAM tạm thời
const upload = multer({ storage });

module.exports = upload;

