const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: { type: String, 
            required: true 
    },
    email: { type: String, 
            required: true,
            unique: true
    },
    password: { type: String, 
            required: true 
    },
    pic: { type: String, 
            required: true,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' 
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    }
)

// comparing password with database password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// adding salt hashing password
userSchema.pre('save',async function(next){
    if (!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User3',userSchema)
module.exports = User