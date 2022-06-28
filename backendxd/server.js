require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./auth.routes");
const testRoutes = require("./test.routes");
const userRoutes = require("./user.routes");
const port = 3000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.use("/test", testRoutes);
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(console.error);

// app.use("/user", userRoutes);
