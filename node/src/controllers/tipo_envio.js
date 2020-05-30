'use strict'
const models=require('../models')

async function getTipo_Envios(req,res){
  let [err,tipo_envios]=await get(models.Tipo_Envio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_envios==null) return res.status(404).json({message: `Tipo_Envios nulos`})
  res.status(200).json(tipo_envios)
}

async function getTipo_Envio(req,res){
  let [err,tipo_envio]=await get(models.Tipo_Envio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_envio==null) return res.status(404).json({message: `Tipo_Envios nulos`})
  res.status(200).json(tipo_envio)
}

async function createTipo_Envio(req,res){
  let [err,tipo_envio]=await get(models.Tipo_Envio.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_tipo_envio: 'Creo un nuevo tipo_envio.',
      ip: req.ip,
      tipo_envio: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_envio==null) return res.status(404).json({message: `Tipo_Envios nulos`})
  res.status(200).json(tipo_envio)
}

async function createAllTipo_Envio(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Tipo_Envio.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        tipo_envio: 0,
        ip: req.ip,
        accion_tipo_envio: 'Creo un nuevo tipo_envio tipo_envio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_tipo_envio: 'Creo una nueva persona tipo_envio.',
        accion: 'I',
        ip: req.ip,
        tipo_envio: 0
      }, { transaction: t });
  
      await models.Tipo_Envio.create({
        id_persona: persona.id,
        id_tipo_envio: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_tipo_envio: 'Creo un nuevo tipo_envio.',
        ip: req.ip,
        tipo_envio: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateTipo_Envio(req,res){
  let [err,tipo_envio]=await get(models.Tipo_Envio.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_tipo_envio: 'Edito un tipo_envio.',
    ip: req.ip,
    tipo_envio: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_envio==null) return res.status(404).json({message: `Tipo_Envios nulos`})
  res.status(200).json(tipo_envio)
}

async function deleteTipo_Envio(req,res){
  let [err,tipo_envio]=await get(models.Tipo_Envio.update({
    estado: 'I',

    accion_tipo_envio: 'Elimino un tipo_envio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_envio==null) return res.status(404).json({message: `Tipo_Envios nulos`})
  res.status(200).json(tipo_envio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipo_Envios,
  getTipo_Envio,
  createTipo_Envio,
  createAllTipo_Envio,
  updateTipo_Envio,
  deleteTipo_Envio
}