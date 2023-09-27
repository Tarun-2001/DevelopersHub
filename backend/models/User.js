const mongoose = require('mongoose')
const { Schema } = mongoose;

const devUSer = new Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    mobile:{
        type:String,
        require:true,
    },
    skill:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    Confirmpassword:{
        type:String,
        require:true,
    },
  });
  const DevUser = mongoose.model('devUser',devUSer)
  module.exports = DevUser