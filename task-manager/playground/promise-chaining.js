require('../src/db/mongoose')
const user = require('../src/models/users')

// 623d8fcf1aa9ba314730b656

// user.findByIdAndUpdate('623d4f0b91060d3cdfc57ccc',{ age:28 }).then((users) => {
//     console.log(users)
//     return user.countDocuments({ age:28 })
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (_id,age) =>{
    const users = await user.findByIdAndUpdate(_id,{age})
    const count = await user.countDocuments({age})

    return count
}

updateAgeAndCount('623d68aaca82a8b62b4df44f',26).then((count)=>{
        console.log(count)
}).catch((e)=>{
    console.log('e',e)
})

