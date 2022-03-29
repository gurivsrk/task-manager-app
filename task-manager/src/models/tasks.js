const { mongoose , validator } = require('../db/mongoose')

const tasks = mongoose.model('tasks',{
    description:{
        type: String,
        trim: true,
        required:true 
    },
    completed:{
        type:Boolean,
        default: false
    } 
})

module.exports = tasks