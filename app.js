const express = require('express');
const connection = require('./connection/connection');
const app = express()
const port = 5000 || process.env.PORT;
const cors = require('cors');
app.use(cors())
connection() ;
const userRouter = require('./Routes/loginRegistraion');
app.use(userRouter);


app.get('/',(req,res)=>{
    res.send("Book list application ");
})

app.listen(port,()=> console.log( `app is running at port ${port}`));