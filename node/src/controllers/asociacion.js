'use strict'
const models=require('../models')

async function getAsociacions(req,res){
  let [err,asociacions]=await get(models.Asociacion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacions==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacions)
}

async function getAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}

async function createAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_asociacion: 'Creo un nuevo asociacion.',
      ip: req.ip,
      asociacion: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}

async function createAllAsociacion(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Asociacion.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        asociacion: 0,
        ip: req.ip,
        accion_asociacion: 'Creo un nuevo asociacion asociacion.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_asociacion: 'Creo una nueva persona asociacion.',
        accion: 'I',
        ip: req.ip,
        asociacion: 0
      }, { transaction: t });
  
      await models.Asociacion.create({
        id_persona: persona.id,
        id_asociacion: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_asociacion: 'Creo un nuevo asociacion.',
        ip: req.ip,
        asociacion: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_asociacion: 'Edito un asociacion.',
    ip: req.ip,
    asociacion: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}

async function deleteAsociacion(req,res){
  let [err,asociacion]=await get(models.Asociacion.update({
    estado: 'I',

    accion_asociacion: 'Elimino un asociacion.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(asociacion==null) return res.status(404).json({message: `Asociacions nulos`})
  res.status(200).json(asociacion)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getAsociacions,
  getAsociacion,
  createAsociacion,
  createAllAsociacion,
  updateAsociacion,
  deleteAsociacion
}