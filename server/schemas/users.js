const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{type:String, required:true},
    name:{type:String ,required:true},
    lastName:{type:String},
    password:{type:String, required:true},
    dateCreated:{type:Date,default:Date.now()}

});


module.exports =  mongoose.model('user', userSchema);