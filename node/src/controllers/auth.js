'use strict'
const models=require('../models')
const { body } = require('express-validator')
const { validationResult } = require('express-validator')
const service=require('../services/index')


module.exports={ 
    signInAdmin,
    signInUser,
    validateAuth
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

async function signInUser(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let [err,usuario]=await get(models.Usuario.findOne({
        attributes: ['id', 'username'],
        where:{
            username: req.body.username,
            password: req.body.password
        }
    }))
    if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
    if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
    let token=service.createToken(usuario)
    res.status(200).json({usuario: usuario, token})
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}