const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  title: { type: String, required: true },
  discount: { type: Number, required: true },
  created: { type: Date, default: Date.now() },
  expires: { type: Date, required: true },
});

module.exports = mongoose.model("coupon", couponSchema);
