'use strict'
const models=require('../models')

async function getCategorias(req,res){
  let [err,categorias]=await get(models.Categoria.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(categorias==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categorias)
}

async function getCategoriasOnly(req,res){
  let [err,categorias]=await get(models.Categoria.findAll({
    where:{estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(categorias==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categorias)
}

async function getCategoriasAllComercio(req,res){
  let [err,categorias]=await get(models.Categoria.findAll({
    where:{estado: 'A'},
    include: [{model: models.Producto, required: true, where: {id_comercio: req.params.id}}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(categorias==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categorias)
}

async function getCategoria(req,res){
  let [err,categoria]=await get(models.Categoria.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria)
}

async function createCategoria(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'I',
    accion_usuario: 'Creo una nueva categoria.',
    ip: req.ip,
    usuario: 0
  }
  if(req.files){
    p.imagenes='';
    for (let i = 0; i < req.files.length; i++) {
      p.imagenes=p.imagenes+req.files[i].filename;
      if(i!=req.files.length-1){
        p.imagenes=p.imagenes+','
      }
    }
    p.imagenes=models.limpiar(p.imagenes)
  }
  
  let [err,categoria]=await get(models.Categoria.create(p))
  if(err) return res.status(500).json({message: `${err}`})
  if(categoria==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(categoria)
}

async function updateCategoria(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'U',
    accion_usuario: 'Edito una categoria.',
    ip: req.ip,
    usuario: 0
  }
  if(req.files){
    p.imagenes='';
    for (let i = 0; i < req.files.length; i++) {
      if(req.files[i].originalname.includes('sum2020_')){
        p.imagenes=p.imagenes+req.files[i].originalname;
      }else{
        p.imagenes=p.imagenes+req.files[i].filename;
      }
      if(i!=req.files.length-1){
        p.imagenes=p.imagenes+','
      }
    }
    p.imagenes=models.limpiar(p.imagenes)
  }

  let [err,categoria]=await get(models.Categoria.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria[1][0].dataValues)
}

async function deleteCategoria(req,res){
  let [err,categoria]=await get(models.Categoria.update({
    estado: 'I',

    accion_usuario: 'Elimino un categoria.',
    accion: 'D',
    ip: req.ip,
    usuario: 0,
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCategorias,
  getCategoriasOnly,
  getCategoriasAllComercio,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria
}