'use strict'
const service=require('../services/index')
const models=require('../models')

async function isAuthAdmin(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,supervisor]=await get(models.Supervisor.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(supervisor==null) return res.status(404).json({message: `Gestor nulos`})
    req.usuario=response[0]
    next()
}

async function isAuthUser(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,usuario]=await get(models.Usuario.findOne({
        where: {id: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(usuario==null) return res.status(404).json({message: `Usuario nulos`})
    
    req.usuario=response[0]
    req.tipo=usuario.id_tipo_usuario
    next()
}

async function isAuthCliente(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    console.log(err)
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,cliente]=await get(models.Cliente.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(cliente==null) return res.status(404).json({message: `Cliente nulos`})
    
    req.usuario=response[0]
    req.cliente=cliente.id
    req.tipo=response[1]
    next()
}

async function isAuthOnlyComercio(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,comercio]=await get(models.Comercio.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
    
    req.usuario=response[0]
    req.comercio=comercio.id
    req.tipo=response[1]
    next()
}

async function isAuthPonente(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,ponente]=await get(models.Ponente.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(ponente==null) return res.status(404).json({message: `Ponente nulos`})
    
    req.usuario=response[0]
    req.ponente=ponente.id
    req.tipo=2
    next()
}





module.exports={
    isAuthAdmin,
    isAuthUser,
    isAuthOnlyComercio,
    isAuthCliente,
    isAuthPonente
}

function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
}