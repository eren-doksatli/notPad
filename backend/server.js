require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const notRoute = require("./routes/notlar.js");
const kullaniciRoute = require("./routes/kullanici");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/notlar", notRoute);
app.use("/api/kullanici", kullaniciRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Veritabanı bağlantısı başarılı");
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT}. port dinleniyor`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
