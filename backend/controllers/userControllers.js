const asyncHandler = require('express-async-handler')
const User = require('../model/userModel');
const generateToken = require('../utils/generateToke');

// creating user
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,pic} = req.body;

    if(!email || !name || !password){
        res.status(400)
        throw new Error("Please fill all fields")
    }
    //check for existing user
    let userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("Email already in use")
    }
    // creating user
    const user = await User.create({
        name,
        email,
        password,
        pic
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Error Occured')
    }
})

// login user
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400)
        throw new Error("Please fill all fields")
    }

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error("Invalid email or password")
    }
})

module.exports = {registerUser,authUser}