const multer = require("multer");
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let path = `public/images/${req.userId}`;
    if (!req.body.adId) {
      //if adId exists than its ad images, not user profile photo
      path += "/avatar";
    } else {
      path += `/ads/${req.body.adId}`;
    }

    if (!fs.existsSync(path)) {
      console.log("making dir");
      fs.mkdirSync(path, { recursive: true });
    }

    return cb(null, path);
  },
  fileName: (req, file, cb) => {
    cb(null, Date().toISOString() + "-" + file.originalname);
  }
});

const filter = (req, file, cb) => {
  if (!req.userId) {
    return cb(null, false);
  }
  
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    return cb(null, true);
  }
};

module.exports.storageSetup = multer({
  storage: storage,
  fileFilter: filter,
}).single("image");
