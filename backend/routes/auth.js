const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 

const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "param is a very good boy "
var fetchuser = require('../middleware/fetchuser');
// Route 1 create a user using : POST /api/auth/signup
router.post('/signup',[
    body('name',"Enter a valid name ").notEmpty(),
    body('email',"Enter a valid email ").isEmail(),
    body('password').isLength({min:6}),
], async (req, res)=>{  
      let sucess = false ; 
    // console.log(req.body); 
    const errors = await validationResult(req);
        // if there are errors return bad request 
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess,errors: errors.array() });
    }
    //  try and catch used for unexpected error 
    try {  // finding if the user with the email exists 
        let user = await User.findOne({email:req.body.email});
        if(user){
           return   res.status(400).json({ sucess ,errors: "Sorry a user with this email already exists"});
        } 
        const salt = await bcrypt.genSalt(10) ; 
        const SecPassword = await  bcrypt.hash(req.body.password,salt);
        user = await User.create({
           name: req.body.name,
           password:  SecPassword ,
           email: req.body.email,
         })
         const data = {
            user:{
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
           sucess = true ; 
          res.json({sucess,authtoken})
      
    } catch (error) {
        res.status(500).send("Some Error occured ");
    }
    
} )
// Route 2 create a user using : POST /api/auth/login
router.post('/login',[
    body('email',"Enter a valid email ").isEmail(),
    body('password').isLength({min:6}),
], async (req, res)=>{
    console.log(req.body); 
    const errors = await validationResult(req);
        // if there are errors return bad request 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const {email,password} = req.body ; 
    let sucess = false ; 
    //  try and catch used for unexpected error 
    try {  // finding if the user with the email exists 
          
        let user = await User.findOne({email});
        if(!user){
           return   res.status(400).json({ sucess, errors: "Sorry user with this email doesn't exist"});
        } 
       
        const pComp = await bcrypt.compare(password,user.password);
        if(!pComp){
            return   res.status(400).json({ sucess,errors: "password incorrect"});
         } 
       
         const data = {
            user:{
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
           sucess = true ; 
          res.json({authtoken, sucess})
         console.log(sucess);

    } catch (error) {
        res.status(500).send("Internal Server Error occured ");
    }
    
} )

// Route 3 get user data  using : POST /api/auth/getuser
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router