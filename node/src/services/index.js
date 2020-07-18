'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')

function createToken(user){
    const payload={
        sub: [user.id, user.id_tipo_usuario],
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
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