const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const BillDetails = new Scheme(
  {
    id: { type: String },
    id_bill: { type: String, ref: "bills" },
    id_pet: { type: String, ref: "pets" },
    quantity: { type: Number },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("billdetails", BillDetails);
