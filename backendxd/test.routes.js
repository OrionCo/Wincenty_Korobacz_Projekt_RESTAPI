const express = require("express");
const Test = require("./test.model");
const Result = require("./result.model");
const router = express.Router();

// get test by category
// ścieżka do danych testu, który jest wybierany po kategorii

router.get("/:category", async (req, res) => {
  try {
    let test = await Test.findOne({ category: req.params.category });
    res.header("Access-Control-Allow-Origin");
    res.send(test);
  } catch {
    res.status(404);
    res.send({ message: "Test nie istnieje." });
  }
});

router.post("/", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin");
    result = new Result(req.body);
    result.markModified("score");
    result.markModified("value");
    result.save().then((doc) => res.status(201).send(doc));
  } catch {
    res.status(400);
    res.send({ message: "Nie udało się zapisać wyników testu." });
  }
});

module.exports = router;
