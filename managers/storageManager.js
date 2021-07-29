const multer = require("multer");
const fs = require("fs")

const filename = (req, file, cb) => {
  if (!req.body.adId) { 
    cb(null, req.userId);
    return
  }
 
 return cb(null, file.originalname)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `./public/images/${req.userId}`;

    if (!req.body.adId) {
      path += "/avatar";
    } else {
      path += `/ads/${req.body.adId}`;
    }
    
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  
    return cb(null, path);
  },
  filename
});

const filter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    return cb(null, true);
  }
  return cb(null, false);
};

module.exports.storageSetup = multer({
  storage: storage,
  fileFilter: filter,
  limits: { fieldSize: 25 * 1024 * 1024 }
}).fields([{ name: "image"}, { name: "images" }])
