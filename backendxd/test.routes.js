const express = require("express");
const Test = require("./test.model");
const Result = require("./result.model");
const router = express.Router();

// get test by category
// ścieżka do danych testu, który jest wybierany po kategorii

router.get("/", async (req, res) => {
  try {
    let test = await Test.find({});
    res.header("Access-Control-Allow-Origin");
    res.status(200);
    res.send(test);
  } catch {
    res.status(404);
    res.send({ message: "Nie udało się pobrać testów." });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Test.find().distinct("category");
    res.header("Access-Control-Allow-Origin");
    res.status(200);
    res.send(categories);
  } catch {
    res.status(404);
    res.send({ message: "Nie udało się pobrać kategorii." });
  }
});

router.get("/search/:category", async (req, res) => {
  try {
    const regex = new RegExp(req.params.category, "i");
    let tests = await Test.find({ category: { $regex: regex } });
    res.header("Access-Control-Allow-Origin");
    res.send(tests);
  } catch {
    res.status(404);
    res.send({ message: "Nie znaleziono żadnego testu." });
  }
});

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

router.post("/new", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin");
    test = new Test(req.body);
    test.save().then((doc) => res.status(201).send(doc));
  } catch {
    res.status(400);
    res.send({ message: "Nie udało się zapisać nowego testu." });
  }
});

router.put("/edit/:category", async (req, res) => {
  try {
    Test.findOneAndUpdate(
      { category: req.params.category },
      req.body,
      { upsert: true },
      (err, doc) => {
        if (err) return res.send(500, { error: err });
        return res.status(204).send("Pomyślnie zapisano zmiany.");
      }
    );
  } catch {
    res.status(400);
    res.send({ message: "Nie udało się zapisać zmian." });
  }
});

router.delete("/:category", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin");
    Test.deleteOne({ category: req.params.category }, (err, result) => {
      if (err) {
        res.status(404);
        res.send({ message: "Test nie istnieje." });
      } else {
        res.status(200);
        res.send({ message: "Pomyślnie usunięto test." });
      }
    });
  } catch {
    res.status(500);
    res.send({ message: "Wystąpił błąd przy usuwaniu testu." });
  }
});

module.exports = router;
