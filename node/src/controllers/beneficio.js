'use strict'
const models=require('../models')

async function getBeneficios(req,res){
  let [err,beneficios]=await get(models.Beneficio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(beneficios==null) return res.status(404).json({message: `Beneficios nulos`})
  res.status(200).json(beneficios)
}

async function getBeneficio(req,res){
  let [err,beneficio]=await get(models.Beneficio.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(beneficio==null) return res.status(404).json({message: `Beneficios nulos`})
  res.status(200).json(beneficio)
}

async function createBeneficio(req,res){
  let [err,beneficio]=await get(models.Beneficio.create({
      icono: req.body.icono,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      restriccion: models.limpiar(req.body.restriccion),
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo beneficio.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(beneficio==null) return res.status(404).json({message: `Beneficios nulos`})
  res.status(200).json(beneficio)
}


async function updateBeneficio(req,res){
  let [err,beneficio]=await get(models.Beneficio.update({
    icono: req.body.icono,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    restriccion: models.limpiar(req.body.restriccion),
    
    accion: 'U',
    accion_usuario: 'Edito un beneficio.',
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
  if(beneficio==null) return res.status(404).json({message: `Beneficios nulos`})
  res.status(200).json(beneficio[1][0].dataValues)
}


async function deleteBeneficio(req,res){
  let [err,beneficio]=await get(models.Beneficio.update({
    estado: 'I',

    accion_usuario: 'Elimino un beneficio.',
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
  if(beneficio==null) return res.status(404).json({message: `Beneficios nulos`})
  res.status(200).json(beneficio)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getBeneficios,
  getBeneficio,
  createBeneficio,
  updateBeneficio,
  deleteBeneficio
}