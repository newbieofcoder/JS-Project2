const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Bills = new Scheme(
  {
    id: { type: String },
    date: { type: String },
    email: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("bills", Bills);
