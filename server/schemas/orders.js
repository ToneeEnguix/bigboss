const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  productsBought: {
    product: { type: Schema.Types.ObjectId, ref: "competition" },
    amount: Number,
  },
  paymentStatus: { type: String, required: true },
  orderDate: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("order", orderSchema);
