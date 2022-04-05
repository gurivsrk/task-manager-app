const { mongoose , validator  } = require('../db/mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true
        },
        email:{
            type: String,
            trim: true,
            unique:true,
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
        },
        token:[{
            token:{
                type:String,
                required:true
            }
        }]
    }
)

userSchema.methods.generateJwtToken = async function(){
    const user = this
    const token = jwt.sign({_id:user.id.toString()},'privateorpublickey')

    user.token = user.token.concat({token})
    await user.save()

    return token
}

userSchema.statics.getByCredentials = async (email,password)=>{

   const userLogin = await User.findOne({email});

   if(!userLogin){
       throw new Error('Unable to Login') 
   }
   
   const isMatch = await bcrypt.compare(password, userLogin.password)

   if(!isMatch){
       throw new Error('unable to login')
   }

   return userLogin
}

///// hash pasword before saving it using middleware
userSchema.pre("save", async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,9)
    }

    next()
});


const User = mongoose.model('User',userSchema)



module.exports = User