const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const winnerSchema = new Schema({


    winner:{ type: Schema.Types.ObjectId, ref: 'user' },
    competition:{ type: Schema.Types.ObjectId, ref: 'competition' }
 
});


module.exports =  mongoose.model('winner', winnerSchema);