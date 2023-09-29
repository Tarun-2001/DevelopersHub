const express = require('express')
const {body,validationResult} = require('express-validator');
const Review = require('../models/Review');
const User = require('../models/User');
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/addreview',[
    body('rating','Rating should be required').not().isEmpty()
],authentication,async (req,res)=>{
    try{
        const valid = validationResult(req)
        if(!valid) { return res.status(400).send(valid)}
        const {taskWorker,rating} = req.body
        const taskProvider = await User.findById(req.user.id)
        const review = new Review(
            {"taskProvider":taskProvider.fullname,taskWorker,rating}
        )
        review.save()
        res.send({"Message":"Successfully reviewd"})
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

router.get('/myreview',authentication,async (req,res)=>{
    try{
        const getMyReview = await Review.find({"taskWorker":req.user.id})
        if(!getMyReview) { return res.send("There are no reviews yet!!")}
        res.send({"Message":"Reviews fetched successfully",getMyReview})
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = router