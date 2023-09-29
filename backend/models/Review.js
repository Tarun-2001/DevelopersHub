const mongoose = require('mongoose')
const {Schema} = mongoose

const review = new Schema({
    taskProvider:{
        type:String,
        require:true
    },
    taskWorker:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    }
})

const Review = mongoose.model("Review",review)
module.exports = Review