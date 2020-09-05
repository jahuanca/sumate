'use strict'
const models=require('../models')
const usuario = require('./usuario')

async function getSubscripcions(req,res){
  let [err,subscripcions]=await get(models.Subscripcion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcions==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcions)
}

async function getSubscripcion(req,res){
  let [err,subscripcion]=await get(models.Subscripcion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion)
}

async function createSubscripcion(req,res){
  

  let file=(req.file) ? req.file.filename : null;
  let [err,subscripcion]=await get(models.Subscripcion.create({
      id_usuario: req.body.id_usuario,
      id_usuario_invito: models.limpiar(req.body.id_usuario_invito),
      nota: models.limpiar(req.body.nota),
      imagenes: file,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo subscripcion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion)
}


async function updateSubscripcion(req,res){
  let [err,subscripcion]=await get(models.Subscripcion.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un subscripcion.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion)
}


async function deleteSubscripcion(req,res){
  let [err,subscripcion]=await get(models.Subscripcion.update({
    estado: 'I',

    accion_usuario: 'Elimino un subscripcion.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getSubscripcions,
  getSubscripcion,
  createSubscripcion,
  updateSubscripcion,
  deleteSubscripcion
}