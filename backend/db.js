const mongoose = require('mongoose')

const mongooseUrl = "mongodb+srv://kiran:database@cluster0.np63w4z.mongodb.net/"

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongooseUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to mongoDb")
    }
    catch{
        console.log("Error connecting data base")
    }
}
module.exports = connectToMongo