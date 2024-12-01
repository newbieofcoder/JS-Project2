const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Pets = new Scheme(
  {
    id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    id_species: { type: String, ref: "species" },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("pets", Pets);
