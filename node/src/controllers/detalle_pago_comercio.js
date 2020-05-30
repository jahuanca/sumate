'use strict'
const models=require('../models')

async function getDetalle_Pago_Comercios(req,res){
  let [err,detalle_pago_comercios]=await get(models.Detalle_Pago_Comercio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_comercios==null) return res.status(404).json({message: `Detalle_Pago_Comercios nulos`})
  res.status(200).json(detalle_pago_comercios)
}

async function getDetalle_Pago_Comercio(req,res){
  let [err,detalle_pago_comercio]=await get(models.Detalle_Pago_Comercio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_comercio==null) return res.status(404).json({message: `Detalle_Pago_Comercios nulos`})
  res.status(200).json(detalle_pago_comercio)
}

async function createDetalle_Pago_Comercio(req,res){
  let [err,detalle_pago_comercio]=await get(models.Detalle_Pago_Comercio.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_detalle_pago_comercio: 'Creo un nuevo detalle_pago_comercio.',
      ip: req.ip,
      detalle_pago_comercio: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_comercio==null) return res.status(404).json({message: `Detalle_Pago_Comercios nulos`})
  res.status(200).json(detalle_pago_comercio)
}

async function createAllDetalle_Pago_Comercio(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Detalle_Pago_Comercio.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        detalle_pago_comercio: 0,
        ip: req.ip,
        accion_detalle_pago_comercio: 'Creo un nuevo detalle_pago_comercio detalle_pago_comercio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_detalle_pago_comercio: 'Creo una nueva persona detalle_pago_comercio.',
        accion: 'I',
        ip: req.ip,
        detalle_pago_comercio: 0
      }, { transaction: t });
  
      await models.Detalle_Pago_Comercio.create({
        id_persona: persona.id,
        id_detalle_pago_comercio: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_detalle_pago_comercio: 'Creo un nuevo detalle_pago_comercio.',
        ip: req.ip,
        detalle_pago_comercio: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateDetalle_Pago_Comercio(req,res){
  let [err,detalle_pago_comercio]=await get(models.Detalle_Pago_Comercio.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_detalle_pago_comercio: 'Edito un detalle_pago_comercio.',
    ip: req.ip,
    detalle_pago_comercio: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_comercio==null) return res.status(404).json({message: `Detalle_Pago_Comercios nulos`})
  res.status(200).json(detalle_pago_comercio)
}

async function deleteDetalle_Pago_Comercio(req,res){
  let [err,detalle_pago_comercio]=await get(models.Detalle_Pago_Comercio.update({
    estado: 'I',

    accion_detalle_pago_comercio: 'Elimino un detalle_pago_comercio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_comercio==null) return res.status(404).json({message: `Detalle_Pago_Comercios nulos`})
  res.status(200).json(detalle_pago_comercio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDetalle_Pago_Comercios,
  getDetalle_Pago_Comercio,
  createDetalle_Pago_Comercio,
  createAllDetalle_Pago_Comercio,
  updateDetalle_Pago_Comercio,
  deleteDetalle_Pago_Comercio
}