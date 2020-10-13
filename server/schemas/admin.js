const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    name:{type:String, required:true},
    adminPassword:{type:String, required:true},
    created:{type:Date, default:Date.now()},

});

module.exports =  mongoose.model('admin', adminSchema);