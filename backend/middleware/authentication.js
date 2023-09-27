const jwt = require('jsonwebtoken')
const KEY = "This is jwt secreat token"

const authentication = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please provide valid auth-token"})
    }
    try{
        const valid = jwt.verify(token,KEY)
        req.user =  valid.user
        next()
    }
    catch(error){
        res.status(401).send({error:"Please provide valid auth-token"})
    }
}
module.exports = authentication