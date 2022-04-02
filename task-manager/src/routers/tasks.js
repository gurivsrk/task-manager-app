//tasks
const express = require('express')
const Tasks = require('../models/tasks')
const route = new express.Router()

route.post('/tasks', async (req,res)=>{
    const task = new Tasks(req.body)
    try{
       const t = await task.save()
       res.status(201).send(t)
    }catch(e){
        res.status(406).send(e)
    }
})


route.get('/tasks', async (req,res)=>{
    
    try{
        const tasks = await Tasks.find({})
        res.status(202).send(tasks)
    }catch(e){
        res.status(503).send(e)
    }

})

route.get('/task/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Tasks.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(202).send(task)
    }catch(e){
        res.status(503).send(e)
    }
})

route.patch('/task/:id', async (req,res)=>{
    const updatesElements = Object.keys(req.body)
    const allowedOptions = ['description','completed']
    const isValidOption = updatesElements.every((element) => allowedOptions.includes(element))

    if(!isValidOption){
        console.log(isValidOption);
        return res.status(406).send({erorr: 'Invalid option'})
    }

    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true})
        
        if(!task){
            return res.status(404).send('Task Not Found')
        }

        res.status(202).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

route.delete('/task/:id', async (req,res)=>{
    try{
        const task =  await Tasks.findByIdAndDelete(req.params.id)
            if(!task){
                res.status(404).send('Task Not FOund')
            }
            res.status(202).send(task)

    }catch(e){  
        res.status(401).send(e)
    }
})

module.exports = route