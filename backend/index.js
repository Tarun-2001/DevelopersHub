const express = require('express')
const connectToMongo = require('./db')
connectToMongo()
const app = express()
const port = 5000
app.use(express.json())


app.get('/',(req,res)=>{
    res.send(`Successfully connected to  ${port}`)
})
app.use('/api/user',require('./routes/user.js'))
app.use('/api/review',require('./routes/review.js'))

app.listen(port,()=>{
    console.log("Listening")
})