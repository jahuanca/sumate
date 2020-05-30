'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')

function createToken(user, tipo, id){
    const payload={
        sub: [user.id, tipo, id],
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }
    try{
        return jwt.encode(payload,config.SECRET_TOKEN)
    }catch(err){
        return err
    }
    
}

function decodeToken(token){
    const decoded= new Promise((resolve,reject)=>{
        try{
            const payload=jwt.decode(token,config.SECRET_TOKEN)
            resolve(payload.sub)
        }catch(err){
            reject({
                status: 401,
                message: 'El token no es valido, registre otra vez.'
            })
        }
    })
    return decoded
}

module.exports={
    createToken,
    decodeToken
}