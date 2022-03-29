const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const tasks = require('./models/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('',(req,res)=>{
    res.send({
        message:'hiiiii'
    })
})

app.post('/users', (req,res)=>{
    const user = new User(req.body)

    user.save().then((result)=>{
        res.status(201).send(result)
    }).catch((e)=>{
        res.status(406).send(e)
    })
})

app.post('/tasks',(req,res)=>{
    const task = new tasks(req.body)

    task.save().then((task)=>{
        res.status(201).send(task)
    }).catch((e)=>{

        res.status(406).send(e)
    })
})

app.listen(port, ()=>{
    console.log("Server is up at port: "+port)
})


