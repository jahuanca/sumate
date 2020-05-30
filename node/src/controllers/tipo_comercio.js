'use strict'
const models=require('../models')

async function getTipo_Comercios(req,res){
  let [err,tipo_comercios]=await get(models.Tipo_Comercio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_comercios==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercios)
}

async function getTipo_Comercio(req,res){
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_comercio==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercio)
}

async function createTipo_Comercio(req,res){
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_tipo_comercio: 'Creo un nuevo tipo_comercio.',
      ip: req.ip,
      tipo_comercio: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_comercio==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercio)
}

async function createAllTipo_Comercio(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Tipo_Comercio.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        tipo_comercio: 0,
        ip: req.ip,
        accion_tipo_comercio: 'Creo un nuevo tipo_comercio tipo_comercio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_tipo_comercio: 'Creo una nueva persona tipo_comercio.',
        accion: 'I',
        ip: req.ip,
        tipo_comercio: 0
      }, { transaction: t });
  
      await models.Tipo_Comercio.create({
        id_persona: persona.id,
        id_tipo_comercio: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_tipo_comercio: 'Creo un nuevo tipo_comercio.',
        ip: req.ip,
        tipo_comercio: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateTipo_Comercio(req,res){
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_tipo_comercio: 'Edito un tipo_comercio.',
    ip: req.ip,
    tipo_comercio: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_comercio==null) return res.status(404).json({message: `Tipo_Comercios nulos`})
  res.status(200).json(tipo_comercio)
}

async function deleteTipo_Comercio(req,res){
  let [err,tipo_comercio]=await get(models.Tipo_Comercio.update({
    estado: 'I',

    accion_tipo_comercio: 'Elimino un tipo_comercio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
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
  getTipo_Comercio,
  createTipo_Comercio,
  createAllTipo_Comercio,
  updateTipo_Comercio,
  deleteTipo_Comercio
}