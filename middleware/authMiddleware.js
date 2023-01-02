const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
             //Get token from header
             token  = req.headers.authorization.split(' ')[1]

             //Verify token
             const decoded = jwt.verify(token, process.env.JWT_SECRET)
             

             //Get user from the token
             req.user = User.findById(decoded.id).select('-password')
             
            //  console.log(req.user._conditions._id)

             next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

//Token is present in the header like this
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmFiMDBkYzI0OWI3ZDVmMDI1N2M5YSIsImlhdCI6MTY2Mzc0MzMxMCwiZXhwIjoxNjY2MzM1MzEwfQ.FFxn1Jsn4m67uImnPKLPby4f-IhGRj2BNh_3Bs46_h0
//From here we need to extract the token part

// const admin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//       next()
//     } else {
//       res.status(401)
//       throw new Error('Not authorized as an admin')
//     }
//   }

module.exports = protect