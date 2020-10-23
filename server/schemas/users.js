const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{type:String, required:true},
    name:{type:String ,required:true},
    lastName:{type:String, default:""},
    phone:{type:String, default:""},
    adress:{type:String, default:""},
    city:{type:String, default:""},
    county:{type:String, default:""},
    postcode:{type:String, default:""},
    country:{type:String, default:""},
    password:{type:String, required:true},
    dateCreated:{type:Date,default:Date.now()},
    cart:Array

});

userSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password;
    return obj
}


module.exports =  mongoose.model('user', userSchema);