const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("test", testSchema);
