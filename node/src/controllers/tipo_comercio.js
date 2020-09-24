'use strict'
const models=require('../models')

async function getTipo_Comercios(req,res){
  let [err,tipo_comercios]=await get(models.Tipo_Comercio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(tipo_comercios==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercios)
}

async function getTipo_ComerciosAll(req,res){
  let [err,tipo_comercios]=await get(models.Tipo_Comercio.findAll({
    where:{estado: 'A'},
    include: [{model: models.Comercio, required: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(tipo_comercios==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercios)
}

async function getTipo_Comercio(req,res){
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(tipo_comercio==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercio)
}

async function createTipo_Comercio(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'I',
    accion_usuario: 'Creo un nuevo tipo_comercio.',
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
  
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.create(p))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(tipo_comercio==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(tipo_comercio)
}


async function updateTipo_Comercio(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'U',
    accion_usuario: 'Edito un tipo de comercio.',
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

  let [err,tipo_comercio]=await get(models.Tipo_Comercio.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(tipo_comercio==null) return res.status(404).json({message: `Tipo de comercio nulos`})
  res.status(200).json(tipo_comercio[1][0].dataValues)
}

async function deleteTipo_Comercio(req,res){
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.update({
    estado: 'I',

    accion_usuario: 'Elimino un tipo_comercio.',
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
  if(tipo_comercio==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipo_Comercios,
  getTipo_ComerciosAll,
  getTipo_Comercio,
  createTipo_Comercio,
  updateTipo_Comercio,
  deleteTipo_Comercio
}