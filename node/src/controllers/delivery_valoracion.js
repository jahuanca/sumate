'use strict'
const models=require('../models')

async function getDelivery_Valoracions(req,res){
  let [err,name_mins]=await get(models.Delivery_Valoracion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(name_mins==null) return res.status(404).json({message: `Delivery_Valoracions nulos`})
  res.status(200).json(name_mins)
}

async function getDelivery_Valoracion(req,res){
  let [err,name_min]=await get(models.Delivery_Valoracion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(name_min==null) return res.status(404).json({message: `Delivery_Valoracions nulos`})
  res.status(200).json(name_min)
}

async function createDelivery_Valoracion(req,res){
  let [err,name_min]=await get(models.Delivery_Valoracion.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo name_min.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(name_min==null) return res.status(404).json({message: `Delivery_Valoracions nulos`})
  res.status(200).json(name_min)
}


async function updateDelivery_Valoracion(req,res){
  let [err,name_min]=await get(models.Delivery_Valoracion.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un name_min.',
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
  if(name_min==null) return res.status(404).json({message: `Delivery_Valoracions nulos`})
  res.status(200).json(name_min)
}


async function deleteDelivery_Valoracion(req,res){
  let [err,name_min]=await get(models.Delivery_Valoracion.update({
    estado: 'I',

    accion_usuario: 'Elimino un name_min.',
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
  if(name_min==null) return res.status(404).json({message: `Delivery_Valoracions nulos`})
  res.status(200).json(name_min)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDelivery_Valoracions,
  getDelivery_Valoracion,
  createDelivery_Valoracion,
  updateDelivery_Valoracion,
  deleteDelivery_Valoracion
}