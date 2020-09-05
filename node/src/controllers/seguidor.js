'use strict'
const models=require('../models')

async function getSeguidors(req,res){
  let [err,seguidors]=await get(models.Seguidor.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(seguidors==null) return res.status(404).json({message: `Seguidors nulos`})
  res.status(200).json(seguidors)
}

async function getSeguidor(req,res){
  let [err,seguidor]=await get(models.Seguidor.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(seguidor==null) return res.status(404).json({message: `Seguidors nulos`})
  res.status(200).json(seguidor)
}

async function getSeguidorComercio(req,res){
  let [err,seguidor]=await get(models.Seguidor.count({
    where:{id_comercio: req.params.id, id_usuario: req.usuario ,estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(seguidor==null) return res.status(404).json({message: `Seguidors nulos`})
  if(seguidor>0){
    res.status(200).json(true)
  }else{
    res.status(200).json(false)
  }
}

async function createSeguidor(req,res){
  let [err,seguidor]=await get(models.Seguidor.create({
      id_usuario: req.usuario,
      id_comercio: req.body.id_comercio,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo seguidor.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(seguidor==null) return res.status(404).json({message: `Seguidors nulos`})
  res.status(200).json(seguidor)
}


async function updateSeguidor(req,res){
  let [err,seguidor]=await get(models.Seguidor.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un seguidor.',
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
  if(seguidor==null) return res.status(404).json({message: `Seguidors nulos`})
  res.status(200).json(seguidor)
}


async function deleteSeguidor(req,res){
  let [err,seguidor]=await get(models.Seguidor.destroy({
    where:{
      id_comercio: req.params.id, id_usuario: req.usuario, estado:'A'
  }}));
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(seguidor==null) return res.status(404).json({message: `Seguidors nulos`})
  res.status(200).json(false)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getSeguidors,
  getSeguidor,
  getSeguidorComercio,
  createSeguidor,
  updateSeguidor,
  deleteSeguidor
}