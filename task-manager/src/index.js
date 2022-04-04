const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('',(req,res)=>{
    res.send({
        message:'hiiiii'
    })
})

//Users
const User = require('./models/users')

app.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
       const u = await user.save()
       res.status(201).send(u)
    }catch(e){
        res.status(406).send(e)
    }
})

app.get('/users', async (req,res)=>{
    try{
       const users = await User.find({})
        res.status(202).send(users)
    }catch(e){
        res.status(503).send(e)
    }
})

app.get('/user/:id', async (req,res)=>{
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


//tasks
const Tasks = require('./models/tasks')

app.post('/tasks', async (req,res)=>{
    const task = new Tasks(req.body)
    try{
       const t = await task.save()
       res.status(201).send(t)
    }catch(e){
        res.status(406).send(e)
    }
})


app.get('/tasks', async (req,res)=>{
    
    try{
        const tasks = await Tasks.find({})
        res.status(202).send(tasks)
    }catch(e){
        res.status(503).send(e)
    }

})

app.get('/task/:id', async (req,res)=>{
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

app.listen(port, ()=>{
    console.log("Server is up at port: "+port)
})


