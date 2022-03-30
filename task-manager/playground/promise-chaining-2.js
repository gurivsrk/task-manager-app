require('../src/db/mongoose')
const tasks = require('../src/models/tasks')

tasks.findByIdAndDelete('623d95c936935ea24065d7e1').then((task)=>{
    console.log(task)
    return tasks.countDocuments({completes:false})
}).then((taskCount)=>{
    console.log(taskCount)
}).catch((e)=>{
    console.log(e)
})