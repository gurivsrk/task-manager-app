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
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    } 
},{
    timestamps:true
})

const tasks = mongoose.model('tasks',taskSchema)

module.exports = tasks