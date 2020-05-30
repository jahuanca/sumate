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

    let [err2,gestor]=await get(models.Gestor.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(gestor==null) return res.status(404).json({message: `Gestor nulos`})
    
    req.usuario=response[0]
    next()
}

async function isAuthAsistente(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,asistente]=await get(models.Asistente.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(asistente==null) return res.status(404).json({message: `Asistente nulos`})
    
    req.usuario=response[0]
    req.asistente=asistente.id
    req.tipo=1
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

async function isAuthComision(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,comision]=await get(models.Comision.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(comision==null) return res.status(404).json({message: `Comision nulos`})
    
    req.usuario=response[0]
    req.comision=comision.id
    req.tipo=3
    next()
}

async function isAuthDirectiva(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,directiva]=await get(models.Directiva.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(directiva==null) return res.status(404).json({message: `Directiva nulos`})
    
    req.usuario=response[0]
    req.directiva=directiva.id
    req.tipo=4
    next()
}

module.exports={
    isAuthAdmin,
    isAuthUser,
    isAuthAsistente,
    isAuthComision,
    isAuthDirectiva,
    isAuthPonente
}

function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
}