const { mongoose , validator } = require('../db/mongoose')

const taskSchema = new mongoose.Schema({
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

const tasks = mongoose.model('tasks',taskSchema)

module.exports = tasks