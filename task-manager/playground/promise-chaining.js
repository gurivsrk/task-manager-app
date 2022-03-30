require('../src/db/mongoose')
const user = require('../src/models/users')

// 623d8fcf1aa9ba314730b656

user.findByIdAndUpdate('623d4f0b91060d3cdfc57ccc',{ age:28 }).then((users) => {
    console.log(users)
    return user.countDocuments({ age:28 })
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

