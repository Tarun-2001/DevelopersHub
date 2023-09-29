const express = require('express')
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
const router = express.Router()
const bcrypt = require("bcrypt")  // Importing bcrypt for password hashing      
const jwt = require('jsonwebtoken');    // Importng jwt for token type authentication
const authentication = require('../middleware/authentication')
const JWT_SECREAT = "This is jwt secreat token"

// 1.User Register Api 
router.post('/register',[
    body('fullname', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 4 characters').isLength({min: 4}),
    body('Confirmpassword', 'The minimum Confirmpassword length is 4 characters').isLength({min: 4}),
  ],async (req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,Confirmpassword} = req.body;
        const valid = validationResult(req)
        let success =false
        if(!valid.isEmpty()) {  success =false;   return res.status(400).send(valid)} // Throwing error if fields are not correct
        let usr = await User.findOne({email:req.body.email})
        if(usr) {   success =false;  return res.status(400).send("User Already Exits in our database")}
        if(password!=Confirmpassword) {  success =false ;  return res.status(400).send("Password and Confrim Passowrds are not matched")} 
        const salt = await bcrypt.genSalt(10)
        const encyptedPwd = await bcrypt.hash(password,salt)
        const encyptedConfirmPwd = await bcrypt.hash(Confirmpassword,salt)
        const user = new User({ // Creating a record
            fullname,email,mobile,skill,
            password:encyptedPwd,
            Confirmpassword:encyptedConfirmPwd
        })
        user.save() // Saving into the database
        const data = {
            user :{
                id:user.id
            }
        }
        success =true;
        const authToken = jwt.sign(data,JWT_SECREAT,jwt.TokenExpiredError(3600000))
        res.send({success,"Message":"Generated Auth token Successfully",key:authToken,})
    }
    catch{
        res.status(500).send(error)
    }
})

// 2. Login API
router.post('/login',[
    body('email','Invalid Email').isEmail(),
    body('password','Minimum no of characters should be 4').isLength({min:4})
],async (req,res)=>{
    try{
        const valid = validationResult(req);
        let success =false;
        if(!valid.isEmpty()){  success = false;  return res.status(400).send(valid)}
        const user = await User.findOne({email:req.body.email})
        if(!user){success = false; return res.status(400).send("User Does not exit")}
        const result = await bcrypt.compare(req.body.password,user.password)
        if(!result) {success = false; return res.status(400).send("Check the credentials")}
        const data ={
            user:{
                id:user._id
            }
        }
        const autht_oken = jwt.sign(data,JWT_SECREAT,jwt.TokenExpiredError(3600000))
        success = true;
        res.send({status:success,Message:"Auth token generated successfully",autht_oken:autht_oken})
    }
    catch(error){
        res.status(500).send(error)
    }
})

// 3. Fetching all profiles
router.get('/fetchall',authentication, async (req,res)=>{
    let success =false;
    try{
        const data = await User.find();
        success = this.true
        res.send({success, data}); 
    }
    catch(error){
        success = false
        res.status(500).send(error.message)
    }
})

// 4. Fetching user own profile 
router.get('/myprofile',authentication,async(req,res)=>{
    let success =false
    try{
        const userId = req.user.id
        console.log(userId)
        const data = await User.findById(userId)
        if(!data){ return res.status(400).send(data)}
        success = true
        res.send({success,data})
    }
    catch(error){
        success =false
        return res.status(500).send({errorMessage :error.message})
    }
})


module.exports = router