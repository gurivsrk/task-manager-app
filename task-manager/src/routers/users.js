//Users
const express = require('express')
const User = require('../models/users')
const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
       const u = await user.save()
       res.status(201).send(u)
    }catch(e){
        res.status(406).send(e)
    }
})

router.get('/users', async (req,res)=>{
    try{
       const users = await User.find({})
        res.status(202).send(users)
    }catch(e){
        res.status(503).send(e)
    }
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
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true})
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
