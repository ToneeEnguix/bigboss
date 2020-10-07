const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{type:String, required:true},
    fullName:{type:String},
    password:{type:String, required:true},
    cart:[{range:{ type: Schema.Types.ObjectId, ref: 'range' },variantIndex:Number,amount:Number}],
    dateCreated:{type:Date,default:Date.now()}

});


module.exports =  mongoose.model('user', userSchema);