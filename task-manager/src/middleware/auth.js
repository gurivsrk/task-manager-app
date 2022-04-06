const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async(req,res,next)=>{
    
    try{
        
        const uToken = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(uToken,'privateorpublickey')
        const user = await User.findOne({_id:data._id, 'token.token':uToken})

        if(!user){
            throw new Error
        }
 
        req.outhToken = uToken
        req.user = user
        next()                                                                      
    }catch(e){
        res.status(401).send({error:'Fail to authenticate'})
    }
}
module.exports = auth