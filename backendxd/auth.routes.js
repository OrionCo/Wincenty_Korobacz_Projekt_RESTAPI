const bcrypt = require("bcrypt");
const express = require("express");
const User = require("./user.model");
const router = express.Router();

// signup route
// ścieżka rejestracji
router.post("/signup", async (req, res) => {
  // request body
  // zawartość requestu

  const body = req.body;

  // if user exists, throw error
  // jeśli użytkownik istnieje, wyślij stosowną informację

  let user = await User.findOne({ email: body.email });

  if (user) {
    return res
      .status(400)
      .send({ message: "Użytkownik o takim adresie e-mail już istnieje" });
  }

  // throw error if request body doesnt provide required data
  // poinformuj użytkownika jeśli nie podał wymaganych danych

  if (!(body.email && body.password)) {
    return res
      .status(400)
      .send({ message: "Nie wprowadzono wymaganych danych" });
  }

  // check if passwords match
  // sprawdzenie czy oba pola do wprowadzenia hasła mają taką samą wartość

  if (body.password !== body.confirm_password) {
    return res.status(400).send({ message: "Podane hasła nie zgadzają się" });
  }

  // creating a new mongoose doc from user data
  // tworzenie nowego rekordu w bazie z danych podanych przez użytkownika

  user = new User(body);
  // generate salt to hash password
  // generowanie saltu, aby zahashować hasło

  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  // ustawiamy hash hasła jako hasło użytkownika

  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// login route
// ścieżka do logowania

router.post("/login", async (req, res) => {
  const body = req.body;

  // find user by provided email
  // znajdujemy użytkownika po wpisanym mailu

  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    // sprawdzamy wpisane hasło z tym, które mamy w bazie

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (validPassword) {
      res.header("Access-Control-Allow-Origin");
      res.status(200).json({ email: body.email });
    } else {
      res.status(401).json({ message: "Hasło niepoprawne." });
    }
  } else {
    res.status(401).json({ message: "Użytkownik nie istnieje." });
  }
});

module.exports = router;
