const mongoose = require('mongoose');


const Schema = mongoose.Schema

const ObjectID = Schema.ObjectID

const bookSchema = new Schema({
    title : {type : String , required : true},
    isbn : {type : String , required : true},
    author : {type : String , required : true},
    description :{type : String , required : true},
    date : {type : String , required : true},
    publisher : {type : String , required : true},
    user : {type : String }

})


const bookModel = mongoose.model('booklistbook',bookSchema);

module.exports = bookModel ;