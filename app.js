require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const authRouter = require("./routes/auth")

app.use(bodyParser.json());
app.use("/auth", authRouter)

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

app.use((error, req, res, next) => { 
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data

  res.status(status).json({ message, data: data }) 
})

mongoose
  .connect(
    process.env.DB_DBURI
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
