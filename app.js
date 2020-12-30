require("dotenv").config();
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //TODO: Change name to userID
    if (req.body.name) {
      let path = `public/images/${req.body.name}`;
      if (!req.body.adId) {
        path += "/avatar";
      } else {
        path += `/ads/${req.body.adId}`;
      }

      if (!fs.existsSync(path)) {
        console.log("making dir");
        fs.mkdirSync(path, { recursive: true });
      }

      return cb(null, path);
    } else {
      return cb(err, null);
    }
  },
  fileName: (req, file, cb) => {
    cb(null, Date().toISOString() + "-" + file.originalname);
  },
});

const authRouter = require("./routes/auth");

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single("image"));
app.use("/auth", authRouter);

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data: data });
});

mongoose
  .connect(process.env.DB_DBURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
