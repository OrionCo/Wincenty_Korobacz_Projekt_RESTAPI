const mongoose = require("mongoose");

// test model
// model danych dla testu

const testSchema = new mongoose.Schema({
  category: String,
  questions: [
    {
      name: String,
      answers: [
        {
          name: String,
          correct: Boolean,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("test", testSchema);
