require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./user.routes");
var fs = require("fs");
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(process.env.DB_URI);
  console.log(`Example app listening on port ${port}`);
});

app.get("/users", function (req, res) {
  fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});
