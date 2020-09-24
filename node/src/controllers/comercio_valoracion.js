'use strict'
const models=require('../models')

async function getComercio_Valoracions(req,res){
  let [err,comercio_valoracions]=await get(models.Comercio_Valoracion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(comercio_valoracions==null) return res.status(404).json({message: `Comercio_Valoracions nulos`})
  res.status(200).json(comercio_valoracions)
}

async function getComercio_Valoracion(req,res){
  let [err,comercio_valoracion]=await get(models.Comercio_Valoracion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(comercio_valoracion==null) return res.status(404).json({message: `Comercio_Valoracions nulos`})
  res.status(200).json(comercio_valoracion)
}

async function getComercio_ValoracionComercio(req,res){
  let [err,comercio_valoracion]=await get(models.Comercio_Valoracion.findOne({
    where:{
      id_comercio: req.params.id, 
      id_usuario: req.usuario, 
      estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  //if(comercio_valoracion==null) return res.status(404).json({message: `Comercio_Valoracions nulos`})
  res.status(200).json(comercio_valoracion)
}

async function createComercio_Valoracion(req,res){
  let [err,comercio_valoracion]=await get(models.Comercio_Valoracion.create({
      //all fields to insert
      id_usuario: req.usuario,
      id_comercio: req.body.id_comercio,
      valoracion: req.body.valoracion,
      comentario: req.body.comentario,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo comercio_valoracion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(comercio_valoracion==null) return res.status(404).json({message: `Comercio_Valoracions nulos`})
  res.status(200).json(comercio_valoracion)
}


async function updateComercio_Valoracion(req,res){
  let [err,comercio_valoracion]=await get(models.Comercio_Valoracion.update({
    valoracion: req.body.valoracion,
    comentario: req.body.comentario,
    
    accion: 'U',
    accion_usuario: 'Edito un comercio_valoracion.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(comercio_valoracion==null) return res.status(404).json({message: `Comercio_Valoracions nulos`})
  res.status(200).json(comercio_valoracion[1][0].dataValues)
}


async function deleteComercio_Valoracion(req,res){
  let [err,comercio_valoracion]=await get(models.Comercio_Valoracion.update({
    estado: 'I',

    accion_usuario: 'Elimino un comercio_valoracion.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(comercio_valoracion==null) return res.status(404).json({message: `Comercio_Valoracions nulos`})
  res.status(200).json(comercio_valoracion)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getComercio_Valoracions,
  getComercio_Valoracion,
  getComercio_ValoracionComercio,
  createComercio_Valoracion,
  updateComercio_Valoracion,
  deleteComercio_Valoracion
}