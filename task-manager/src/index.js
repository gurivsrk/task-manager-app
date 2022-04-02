const express = require('express')
require('./db/mongoose')
const userRoute = require('./routers/users')
const taskRoute =require('./routers/tasks')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

////// Routers
// user route
app.use(userRoute)

// task route
app.use(taskRoute)


app.get('',(req,res)=>{
    res.send({
        message:'hiiiii'
    })
})




app.listen(port, ()=>{
    console.log("Server is up at port: "+port)
})


////testing encryption
const bcrypt = require('bcryptjs')

const tBcrypt =  ()=>{
    const hashed = bcrypt.hash('test',8)
    hashed.then((r)=>{
        console.log('hashN',r)
    })
    
} 
const  tBcryptAsync = async ()=>{
    const hashed = await bcrypt.hash('test',8)
        console.log(hashed)
        console.log(await bcrypt.compare('t4est',hashed))
} 

tBcrypt()
tBcryptAsync()