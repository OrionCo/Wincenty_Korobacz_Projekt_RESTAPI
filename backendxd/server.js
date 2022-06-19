require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./auth.routes");
const port = 3000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.use("/auth", authRoutes);
// app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
