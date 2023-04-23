const mongoose = require('mongoose');
const userModel = require('../models/user')
const express = require('express');
var bodyParser = require('body-parser')
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bookModel = require('../models/book')
var cookieParser = require('cookie-parser');
userRouter.use(cookieParser());
// parse application/x-www-form-urlencoded
userRouter.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
userRouter.use(bodyParser.json()) ;

userRouter.post('/login',async(req,res)=>{
    const {username , password} = req.body ;

    try {
        const user = await userModel.findOne({username : username}) ;
        if(!user){
            res.status(400).json({
                status: "failed",
                message : "Invalid username or password"
            })
         return   
        }
        if(password === user.password){
            const token = jwt.sign({ userId: user._id }, "secret_key", {
                expiresIn: "1h",
              });
            
              // Store token in HTTP-only cookie
            //   res.cookie("jwt", token, {
            //     httpOnly: true,sameSite:true
            //   });

              console.log(res.cookie);
            console.log(token);
            res.status(200).json({
                status : "success",
                token : token
            })

        }else{
            res.status(400).json({
                status: "failed",
                message : "Invalid username or password"
            })
        }
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message : e.message
        })
    }

})

userRouter.post('/registration',async(req,res)=>{
    const {username , password} = req.body ;
        

    try {
        const userCheck = await userModel.findOne({username : username})
        if(userCheck){
            res.status(400).json({
                status : "error",
                message : "user is already registered"
            })
          return ;  
        }         
        const data = await userModel.create({
            username : username,
            password : password
        })
     res.status(200).json({
        status : "success",
        data
     })
    } catch (e) {
        res.status(500).json({
            status :"failed",
            message : e.message
        })
    }    
})


const authMiddleware = async (req, res, next) => {

    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).send("Authentication required.");
    }
  
    try {
      const decoded = jwt.verify(token, "ecret_key"); 
  
      const user = await userModel.findById(decoded.userId);
  
      if (!user) {
        return res.status(401).send("Authentication required.");
      }
  
      req.user = user;
  
      next();
    } catch (error) {
      // If token is invalid or expired, send error response
      res.status(401).send("Authentication required.");
    }
  };
  
  // Protected route for getting user name
  userRouter.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(req.user.name);
  });
  
  // Log out route
  userRouter.post("/logout", (req, res) => {
    // Clear JWT cookie
    res.clearCookie("jwt");
  
    // Send success response
    res.status(200).send("Logged out successfully.");
  });


userRouter.post('/postbook',async(req,res)=>{

      const {title ,
      isbn ,
      author,
      description ,
      date ,
      publisher ,
      } = req.body

    try {
        const book = await bookModel.create({
            title : title,
            isbn :isbn ,
            author : author,
            description  : description,
            date : date,
            publisher : publisher
        });
        res.status(201).json({
            status :"sucess",
            book
        })
    } catch (e) {
        res.status(500).json({
            status :"failed l",
            message : e.message

        })
    }

})
userRouter.get('/getbooks',async(req,res)=>{

    try {
        const books = await bookModel.find()
        res.status(200).json({
            books
        })
    } catch (e) {
        res.status(5000).json({
            status:"failed",
            message : e.message
        })
    }
})
userRouter.delete('/deletebook:',(req,res)=>{
    
})


module.exports = userRouter ; 