const express = require("express");
const router = express.Router();
const Result = require("./result.model");
const User = require("./user.model");

router.get("/results/:email", async (req, res) => {
  try {
    let results = await Result.find({
      email: req.params.email,
    });
    res.header("Access-Control-Allow-Origin");
    res.send(results);
  } catch {
    res.status(400);
    res.send({ message: "Błąd pobierania wyników" });
  }
});

// get users by email

router.get("/user/:email", (req, res) => {
  User.find({ email: req.params.email }, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});

module.exports = router;
