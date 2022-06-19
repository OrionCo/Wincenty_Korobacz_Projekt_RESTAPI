const express = require("express");
const router = express.Router();
const User = require("./user.model");

// get users by email

router.get("/user/:email", (req, res) => {
  User.find({ email: req.params.email }, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});
