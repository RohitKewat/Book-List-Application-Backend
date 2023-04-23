const mongoose = require('mongoose');


const Schema = mongoose.Schema

const ObjectID = Schema.ObjectID

const userSchema = new Schema({
    username : {type : String , required : true},
    password :  {type : String , required : true} 
})


const userModel = mongoose.model('booklistUser',userSchema);

module.exports = userModel ;