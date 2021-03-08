require("dotenv").config();
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");
const storageManager = require("./managers/storageManager");
const app = express();
const authRouter = require("./routes/auth");
const adCreationRouter = require("./routes/adCreation");
const animalSubtypesRouter = require("./routes/animalSubtypes");

app.use(bodyParser.json());
app.use(isAuth, storageManager.storageSetup);
app.use("/auth", authRouter);
app.use("/ads", adCreationRouter);
app.use("/animalInfo", animalSubtypesRouter);

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
