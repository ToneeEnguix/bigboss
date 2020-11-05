const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const competitionSchema = new Schema({
  title: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  prize: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  dateFinishes: { type: Date, required: true },
  maxTickets: { type: Number },
  ticketsSold: { type: Number, default: 0 },
  description: [{ type: String }],
  pictures: [{ type: String, required: true }],
  winner: { type: Schema.Types.ObjectId, ref: "user", default: null },
  winnerPic: { type: String, default: undefined },
  entriesDate: { type: Date},
  facebookURL: { type: String, default: undefined },
});

module.exports = mongoose.model("competition", competitionSchema);
