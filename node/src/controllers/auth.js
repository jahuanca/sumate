'use strict'
const models=require('../models')
const { body } = require('express-validator')
const { validationResult } = require('express-validator')
const service=require('../services/index')


module.exports={ 
    signInAdmin,
    signInUser,
    signInUserForSocial,
    validateAuth,
    registerClient
}
function validateAuth(metodo){
    switch(metodo){
        case 'signInAdmin':{
            return[
                body('password','Dimension no permitida para password').isLength({min: 2, max: 20}),
                body('username','Username no es de tipo email').isEmail()
            ]
        }
    }
}

async function signInAdmin(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let [err,usuario]=await get(models.Usuario.findOne({
        where:{
            username: req.body.username,
            password: req.body.password
        },
        include: [{all: true}]
    }))
    if(err) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
    let token=service.createToken(usuario,4,usuario.Directiva.id)
    res.status(200).json({token})
}
//signin
async function signInUser(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let [err,usuario]=await get(models.Usuario.findOne({
        where:{
            username: req.body.username
        }
    }))
    
    if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
    if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
    if(usuario.correctPassword(String(req.body.password))){
        let token=service.createToken(usuario)
        res.status(200).json({usuario: usuario, token})
    }else{
        return res.status(404).json({message: `Contraseña incorrecta`})
    }
}

async function signInUserForSocial(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let [err,usuario]=await get(models.Usuario.findOne({
        where:{
            username: req.body.username, estado: 'A'
        }
    }))
    
    if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
    if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
    let token=service.createToken(usuario)
    res.status(200).json({usuario: usuario, token})
}

async function registerClient(req, res){
    try {
        const usuario = await models.sequelize.transaction(async (t) => {
          const user=await models.Usuario.create({
            id_tipo_usuario: 1,
            username: req.body.username,
            password: req.body.password,
            
            accion: 'I',
            usuario: 0,
            ip: req.ip,
            accion_usuario: 'Creo un nuevo cliente-usuario-all.',
          }, { transaction: t });
    
          const cliente=await models.Cliente.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            id_usuario: user.id, 
    
            accion: 'I',
            accion_usuario: 'Creo un nuevo cliente-all.',
            ip: req.ip,
            usuario: 0
          }, { transaction: t });
          return user;
        });
        let token=service.createToken(usuario)
        res.status(200).json({usuario: usuario, token})
        
      }catch (error) {
        console.log(error)
        return res.status(500).json({message: `Error en el servidor ${error}`})  
      }
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}