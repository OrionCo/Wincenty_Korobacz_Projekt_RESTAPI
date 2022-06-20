const bcrypt = require("bcrypt");
const express = require("express");
const User = require("./user.model");
const router = express.Router();

// signup route
router.post("/signup", async (req, res) => {
  const body = req.body;

  let user = await User.findOne({ email: body.email });

  if (user) {
    return res
      .status(400)
      .send({ message: "Użytkownik o takim adresie e-mail już istnieje" });
  }

  if (!(body.email && body.password)) {
    return res
      .status(400)
      .send({ message: "Nie wprowadzono wymaganych danych" });
  }

  if (body.password !== body.confirm_password) {
    return res.status(400).send({ message: "Podane hasła nie zgadzają się" });
  }

  // creating a new mongoose doc from user data
  user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// login route
router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.header("Access-Control-Allow-Origin");
      res.status(200).json({ message: "Hasło poprawne." });
    } else {
      res.status(401).json({ message: "Hasło niepoprawne." });
    }
  } else {
    res.status(401).json({ message: "Użytkownik nie istnieje." });
  }
});

module.exports = router;
