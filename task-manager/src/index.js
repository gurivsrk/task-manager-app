const express = require('express')
require('./db/mongoose')
const userRoute = require('./routers/users')
const taskRoute =require('./routers/tasks')
const app = express()
const port = process.env.PORT || 3000

// // //// Express Middleware
// // app.use((req,res,next)=>{
// //    if(req.method === "GET"){
// //         res.send("GET Methods are disabled")
// //    }
// //    else{
// //     next();
// //    }
// // })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is under mantenance mode, Please visit soon')
// })



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


// ////testing encryption
// const bcrypt = require('bcryptjs')

// const tBcrypt =  ()=>{
//     const hashed = bcrypt.hash('test',8)
//     hashed.then((r)=>{
//         console.log('hashN',r)
//     })
    
// } 
// const  tBcryptAsync = async ()=>{
//     const hashed = await bcrypt.hash('test',8)
//         console.log(hashed)
//         console.log(await bcrypt.compare('test',hashed))
// } 

// tBcrypt()
// tBcryptAsync()

// //testing jwt
// const jwt = require('jsonwebtoken')

// const myfunction =  ()=>{
//     const token = jwt.sign({_id:'624a9e137b728dbd9072a843'},'privateorpublickey')
//         //console.log(token)
//             const data = jwt.verify(token,'privateorpublickey')
//             console.log(data)
// }
// myfunction()