'use strict'
const models=require('../models')

async function getAsociacions(req,res){
  let [err,asociacions]=await get(models.Asociacion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacions==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacions)
}

async function getAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}

async function createAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.create({
      id_comercio: req.body.id_comercio,
      id_delivery: req.body.id_delivery,
      descripcion: models.limpiar(req.body.descripcion),
      observacion: models.limpiar(req.body.observacion),
      
      accion: 'I',
      accion_usuario: 'Creo una nueva asociacion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}



async function updateAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.update({
    id_comercio: req.body.id_comercio,
    id_delivery: req.body.id_delivery,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
      
    accion: 'U',
    accion_usuario: 'Edito una asociacion.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))  
  console.log(asociacion[1][0].dataValues)
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion[1][0].dataValues)
}

async function deleteAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.update({
    estado: 'I',

    accion_usuario: 'Elimino un asociacion.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getAsociacions,
  getAsociacion,
  createAsociacion,
  updateAsociacion,
  deleteAsociacion
}