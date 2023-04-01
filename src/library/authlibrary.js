const jwt = require('jsonwebtoken')
let { response } = require("../library/index");

class AuthLibrary{
    async createAccessToken(payload){
        const method = "[createAccessToken]"
        try{
            let jwtkey = process.env.JWT_KEY
            let token = jwt.sign(payload,jwtkey , {expiresIn : '30s'})
            return token
        }catch(err){
            console.log(`Error : ${method}: `, err);           
            return response.throwError(err)
        }
    };
    async verifyToken(token){
        const method = "[verifyToken]"
        try{
            let jwtkey = process.env.JWT_KEY
            let payload = jwt.verify(String(token),jwtkey)
            return payload
        }catch(err){
            console.log(`Error : ${method}: `, err);           
            return response.throwError(err)
        }
    };
    async checkTokenExpiration(token){
        const method = "[checkTokenExpiration]"
        try{
            let jwtkey = process.env.JWT_KEY
            let payload = jwt.verify(String(token),jwtkey)
            console.log(payload)
        }catch(err){
            console.log(`Error : ${method}: `, err);           
            return response.throwError(err)
        }
    }
}

module.exports=AuthLibrary