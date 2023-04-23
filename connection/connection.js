const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://Rohit:rohit@cluster0.vrcqw6n.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
    mongoose.connect(mongoUrl).then(() => {
        console.log('mongo DB is connected');
    }).catch((e) => {
        console.log(e);
    })

}
module.exports = connection ;