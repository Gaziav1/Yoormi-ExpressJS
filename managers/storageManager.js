const multer = require("multer");
const fs = require("fs")

const filename = (req, file, cb) => {
  //TODO Same Problem here 
  // if (!req.body.adId) { 
  //   cb(null, req.userId);
  //   return
  // }
 
 return cb(null, file.originalname)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //TODO: Need to find the way to know adId at this point(after saving ad to db)
    // let path = `public/images/${req.userId}`;
    // if (!req.body.adId) {
    //   //if adId exists than its ad images, not user profile photo
    //   path += "/avatar";
    // } else {
    //   path += `/ads/${req.body.adId}`;
    // }

    let path = `public/images/someUserId`;
    
    if (!fs.existsSync(path)) {
      console.log("making dir");
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
