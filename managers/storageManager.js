const multer = require("multer");
const fs = require("fs")

const filename = (req, file, cb) => {
  if (!req.body.adId) { 
    cb(null, req.userId);
    return
  }
  cb(null, "hey")
}

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
  filename
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
