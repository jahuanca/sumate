'use strict'
const models=require('../models')

async function getFavoritos(req,res){
  let [err,favoritos]=await get(models.Favorito.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(favoritos==null) return res.status(404).json({message: `Favoritos nulos`})
  res.status(200).json(favoritos)
}

async function getFavorito(req,res){
  let [err,favorito]=await get(models.Favorito.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(favorito==null) return res.status(404).json({message: `Favoritos nulos`})
  res.status(200).json(favorito)
}

async function getFavoritoProducto(req,res){
  let [err,favorito]=await get(models.Favorito.count({
    where:{id_producto: req.params.id, id_usuario: req.usuario ,estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(favorito==null) return res.status(404).json({message: `Favoritos nulos`})
  if(favorito>0){
    res.status(200).json(true)
  }else{
    res.status(200).json(false)
  }
}

async function createFavorito(req,res){
  let [err,favorito]=await get(models.Favorito.create({
      id_usuario: req.usuario,
      id_producto: req.body.id_producto,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo favorito.',
      ip: req.ip,
      usuario: 0
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(favorito==null) return res.status(404).json({message: `Favoritos nulos`})
  res.status(200).json(true)
}


async function updateFavorito(req,res){
  let [err,favorito]=await get(models.Favorito.destroy({
    where:{
      id_producto: req.params.id, id_usuario: req.usuario, estado:'A'
  }}));
  if(err) return res.status(500).json({message: `${err}`})
  if(favorito==null) return res.status(404).json({message: `Favoritos nulos`})
  res.status(200).json(false)
}


async function deleteFavorito(req,res){
  let [err,favorito]=await get(models.Favorito.destroy({
    where:{
      id_producto: req.params.id, id_usuario: req.usuario, estado:'A'
  }}));
  if(err) return res.status(500).json({message: `${err}`})
  if(favorito==null) return res.status(404).json({message: `Favoritos nulos`})
  res.status(200).json(false)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getFavoritos,
  getFavorito,
  getFavoritoProducto,
  createFavorito,
  updateFavorito,
  deleteFavorito
}