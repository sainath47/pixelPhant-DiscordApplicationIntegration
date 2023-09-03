const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const authentication = async function (req, res, next) {
try{
   let bearerHeader = req.headers["authorization"]
   if (!bearerHeader) return res.status(401).send({ status: false, message: "please provide token " })

   let bearerToken = bearerHeader.split(' ');
   let token = bearerToken[1];


   jwt.verify(token, "sainathTesting",function (err, decodedToken) {
            if (err) {
                return res.status(400).send({ status: false, message: "Token is invalid" })
            }
         else{
            next()
         }
        })

}
catch(err){
   return res.status(500).send({ status: false, message: err.message })
}

}


module.exports = {authentication }