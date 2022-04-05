//Users
const express = require('express')
const User = require('../models/users')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
       const u = await user.save()
       const uToken = await u.generateJwtToken()

       res.status(201).send({user:u, token:uToken})
    }catch(e){
        res.status(406).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try{
        const user = await User.getByCredentials(req.body.email, req.body.password)
        const token = await user.generateJwtToken()
        res.send({user,token})

    }catch(error){
        console.log(error);
        res.status(400).send({'error':error})
    }
})

router.get('/user/profile',auth ,async (req,res)=>{
    res.status(202).send(req.user)
})

router.get('/user/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(202).send(user)
    }catch(e){
        res.status(503).send(e)
    }

})

router.patch('/user/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOption = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOption){
        return res.status(406).send({ error:'Invalid Updates option!' })
    }
    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if(!user){
            return res.status(404).send('No user found')
        }

        res.status(202).send(user)

    }catch(e){
        res.status(400).send(e)
    }
});

router.delete('/user/:id', async (req, res) =>{
    try{
        const dUser = await User.findByIdAndDelete(req.params.id)
        if(!dUser){
            res.status(404).send('No User Found')
        }
        res.status(202).send(dUser)
    }catch(e){
        res.status(401).send(e)
    }
})

module.exports = router
