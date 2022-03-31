require('../src/db/mongoose')
const tasks = require('../src/models/tasks')

// tasks.findByIdAndDelete('623d95c936935ea24065d7e1').then((task)=>{
//     console.log(task)
//     return tasks.countDocuments({completes:false})
// }).then((taskCount)=>{
//     console.log(taskCount)
// }).catch((e)=>{
//     console.log(e)
// })


const deleteAndCount = async (_id,completed) =>{
    const task = await tasks.findByIdAndDelete(_id)
    const count = await tasks.countDocuments({completed})
    return count
}

deleteAndCount('623d960436935ea24065d7e5',false).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log('e',e)
})