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

app.post('/users', (req,res)=>{
    const user = new User(req.body)

    user.save().then((result)=>{
        res.status(201).send(result)
    }).catch((e)=>{
        res.status(406).send(e)
    })
})

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.status(202).send(users)
    }).catch((e)=>{
        res.status(503).send(e)
    })
})

app.get('/user/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.status(202).send(user)
    }).catch((e)=>{
        res.status(503).send(e)
    })
})


//tasks
const Tasks = require('./models/tasks')

app.post('/tasks',(req,res)=>{
    const task = new Tasks(req.body)

    task.save().then((task)=>{
        res.status(201).send(task)
    }).catch((e)=>{

        res.status(406).send(e)
    })
})


app.get('/tasks',(req,res)=>{
    Tasks.find({}).then((task)=>{
        res.status(202).send(task)
    }).catch((e)=>{
        res.status(503).send(e)
    })
})

app.get('/task/:id',(req,res)=>{
    const _id = req.params.id
    
    Tasks.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.status(202).send(task)
    }).catch((e)=>{
        res.status(503).send(e) 
    })
})

app.listen(port, ()=>{
    console.log("Server is up at port: "+port)
})


