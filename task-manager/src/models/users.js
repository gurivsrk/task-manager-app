const { mongoose , validator  } = require('../db/mongoose')


const User = mongoose.model('User',{
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
            if(!validator.isEmail(value)){
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
            // console.log(value)
            if(validator.contains(value,'password')){
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

module.exports = User