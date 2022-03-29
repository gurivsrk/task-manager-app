const { connect, model } = require('mongoose')
const {isEmail,contains} = require('validator')

connect('mongodb://127.0.0.1:27017/task-manager-api')

        const user = model('User',{
            name:{
                type: String,
                trim: true,
                required: true
            },
            email:{
                type: String,
                trim: true,
                lowercase:true,
                required: true,
                validate(value){
                    if(!isEmail(value)){
                        throw new Error('Invalid Email')
                    }
                }
            },
            password:{
                type: String,
                trim: true,
                required:true,
                minLength: 6,
                validate(value){
                    console.log(value)
                    if(contains(value,'password')){
                        throw new Error('password contains password')
                    }
                }
            },
            age:{
                type: Number,
                default:0,
                validate(value){
                    if(value < 0){
                        throw new Error('Age Must be a positive number')
                    }
                }
            }
        })


        const tasks = model('tasks',{
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
        
module.exports = { user,tasks }
        