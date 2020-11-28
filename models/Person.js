const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Model = mongoose.Model;

// create person

const personSchema = new schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  favoriteFoods: {
    type: [String],
  },
});

module.exports = Person = mongoose.model("person", personSchema);
