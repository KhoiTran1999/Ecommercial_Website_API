const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { GridFsStorage } = require("multer-gridfs-storage");
const { env } = require("../config/env");

const storage = new GridFsStorage({
  url: env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = `${file.fieldname}-${buf.toString(
          "hex"
        )}${path.extname(file.originalname)}`;
        const fileInfo = {
          filename: filename,
          bucketName: env.MONGO_BUCKET,
        };
        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (req, file, cb) => {
  const { originalname, size } = file;
  if (!originalname.match(/\.(jpg|png|jpeg|mp4)$/i)) {
    return cb(new Error(`Not support ${path.extname(originalname)}`), false);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter }).single("photo");
module.exports = upload;
