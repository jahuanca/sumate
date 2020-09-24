'use strict'
const models=require('../models')

async function getProducto_Valoracions(req,res){
  let [err,producto_valoracions]=await get(models.Producto_Valoracion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto_valoracions==null) return res.status(404).json({message: `Producto_Valoracions nulos`})
  res.status(200).json(producto_valoracions)
}

async function getProducto_Valoracion(req,res){
  let [err,producto_valoracion]=await get(models.Producto_Valoracion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(producto_valoracion==null) return res.status(404).json({message: `Producto_Valoracions nulos`})
  res.status(200).json(producto_valoracion)
}

async function createProducto_Valoracion(req,res){
  let [err,producto_valoracion]=await get(models.Producto_Valoracion.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo producto_valoracion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto_valoracion==null) return res.status(404).json({message: `Producto_Valoracions nulos`})
  res.status(200).json(producto_valoracion)
}


async function updateProducto_Valoracion(req,res){
  let [err,producto_valoracion]=await get(models.Producto_Valoracion.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un producto_valoracion.',
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
  if(producto_valoracion==null) return res.status(404).json({message: `Producto_Valoracions nulos`})
  res.status(200).json(producto_valoracion)
}


async function deleteProducto_Valoracion(req,res){
  let [err,producto_valoracion]=await get(models.Producto_Valoracion.update({
    estado: 'I',

    accion_usuario: 'Elimino un producto_valoracion.',
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
  if(producto_valoracion==null) return res.status(404).json({message: `Producto_Valoracions nulos`})
  res.status(200).json(producto_valoracion)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getProducto_Valoracions,
  getProducto_Valoracion,
  createProducto_Valoracion,
  updateProducto_Valoracion,
  deleteProducto_Valoracion
}