//tasks
const express = require('express')
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')
const route = new express.Router()


route.post('/tasks', auth ,async (req,res)=>{
    const task = new Tasks({
        ...req.body,
        author: req.user._id
    })
    try{
       const t = await task.save()
       res.status(201).send(t)
    }catch(e){
        res.status(406).send(e)
    }
})

//// GET /task?completed=true
//// GEt /task?limit=2&skip=2
///// GET /task?sortBy=createdAt:desc
route.get('/tasks',auth,async (req,res)=>{
        const match = {}, sort = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        
    try{
        //const tasks = await Tasks.find({author:req.user._id})
        //                 or
        const tasks = await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.status(202).send(tasks.tasks)
    }catch(e){
        res.status(503).send(e)
    }

})

route.get('/task/:id', auth ,async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Tasks.findOne({_id, author:req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.status(202).send(task)
    }catch(e){
        res.status(503).send(e)
    }
})

route.patch('/task/:id',auth, async (req,res)=>{
    const updatesElements = Object.keys(req.body)
    const allowedOptions = ['description','completed']
    const isValidOption = updatesElements.every((element) => allowedOptions.includes(element))

    if(!isValidOption){
        return res.status(406).send({erorr: 'Invalid option'})
    }

    try{
        const task = await Tasks.findOne({_id:req.params.id, author:req.user._id})
        if(!task){
            return res.status(404).send('Task Not Found')
        }

        updatesElements.forEach((element) => task[element] = req.body[element])

        await task.save()
        res.status(202).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

route.delete('/task/:id',auth,async (req,res)=>{
    try{
        const task =  await Tasks.findOneAndDelete({_id : req.params.id, author: req.user._id})
        // const task =  await Tasks.findOne({_id : req.params.id, author: req.user._id})
        // task.remove()  /// another ways
            if(!task){
                res.status(404).send('Task Not FOund')
            }
            
            res.status(202).send(task)

    }catch(e){  
        res.status(401).send(e)
    }
})

module.exports = route