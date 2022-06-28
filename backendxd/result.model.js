const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  email: String,
  score: Number,
  max_score: Number,
  value: {
    category: String,
    questions: [
      {
        name: String,
        answers: [
          {
            name: String,
            value: Number,
            correct: Boolean,
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("result", resultSchema);
