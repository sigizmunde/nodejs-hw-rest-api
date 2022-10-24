const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: multerConfig,
});

module.exports = uploadFile;
