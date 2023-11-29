const jwt = require('jsonwebtoken');
const JWT_SEC = "ujhdjsahdsa25";
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1]

        // decode token id
        const decoded = jwt.verify(token,JWT_SEC);
        req.user = await User.findById(decoded.id).select('-password')

        next()
        } catch (error) {
            res.status(401)
            throw new Error('Invalid token')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Invalid token')
    }
})

module.exports = {protect}