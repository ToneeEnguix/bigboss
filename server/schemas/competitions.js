const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitionSchema = new Schema({


    title: { type: String, required: true },
    ticketPrice:{type:Number,required:true},
    prize: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    dateFinishes: { type: Date, required: true },
    maxTickets: { type: Number },
    picture01: { type: String, required: true },
    picture02: { type: String, required: true },
    picture03: { type: String, required: true },

});


module.exports = mongoose.model('competition', competitionSchema);