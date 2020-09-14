'use strict'
const models=require('../models')

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
  }, {individualHooks: true}))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion)
}

async function createAdminSubscripcion(req,res){
  
  let file=(req.file) ? req.file.filename : null;
  let [err,subscripcion]=await get(models.Subscripcion.create({
      id_usuario: req.body.id_usuario,
      id_usuario_invito: models.limpiar(req.body.id_usuario_invito),
      nota: models.limpiar(req.body.nota),
      id_plan: req.body.id_plan,
      imagenes: file,
      monto: req.body.monto,
      atendido: req.body.atendido,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo subscripcion.',
      ip: req.ip,
      usuario: 0
  }, {validate: true,individualHooks: true}));
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion)
}

async function atenderSubscripcion(req,res){
  let [err,subscripcion]=await get(models.Subscripcion.update({
    id_plan: req.body.id_plan,
    monto: req.body.monto,
    atendido: true,
    id_usuario: req.body.id_usuario,
    
    accion: 'U',
    accion_usuario: 'Atendio una subscripcion.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    validate: true,
    individualHooks: true
  }))
  
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  return res.status(200).json(subscripcion[1][0].dataValues);
}


async function updateSubscripcion(req,res){
  let s={
    nota: models.limpiar(req.body.nota),
    monto: req.body.monto,
    dias_agregar: req.body.dias_agregar,
    atendido: req.body.atendido,
    
    accion: 'U',
    accion_usuario: 'Edito un subscripcion.',
    ip: req.ip,
    usuario: 0
  };
  if(req.body.imagen_cambio==true){
    s.imagenes=(req.file) ? req.file.filename : null;
  }
  s.id_usuario_invito= (req.body.id_usuario_invito!='undefined') ? req.body.id_usuario_invito : null;
  
  let [err,subscripcion]=await get(models.Subscripcion.update(s,{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }));  
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(subscripcion==null) return res.status(404).json({message: `Subscripcions nulos`})
  res.status(200).json(subscripcion[1][0].dataValues);

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
    individualHooks: true,
    validate: false
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
  createAdminSubscripcion,
  atenderSubscripcion,
  updateSubscripcion,
  deleteSubscripcion
}