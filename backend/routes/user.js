const express = require('express')
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
const router = express.Router()

// 1.User Register Api 
router.post('/register',[
    body('fullname', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 4 characters').isLength({min: 4}),
    body('Confirmpassword', 'The minimum Confirmpassword length is 4 characters').isLength({min: 4}),
  ],(req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,Confirmpassword} = req.body;
        const user = new User({
            fullname,email,mobile,skill,password,Confirmpassword
        })
        const valid = validationResult(req)
        if(!valid.isEmpty()){ return res.status(400).send(valid)} 
        user.save()
        res.send("success")
    }
    catch{
        res.status(500).send(error.message)
    }
})

module.exports = router