'use strict'
const models=require('../models')

async function getTarifarios(req,res){
  let [err,tarifarios]=await get(models.Tarifario.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tarifarios==null) return res.status(404).json({message: `Tarifarios nulos`})
  res.status(200).json(tarifarios)
}

async function getTarifario(req,res){
  let [err,tarifario]=await get(models.Tarifario.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tarifario==null) return res.status(404).json({message: `Tarifarios nulos`})
  res.status(200).json(tarifario)
}

async function createTarifario(req,res){
  let [err,tarifario]=await get(models.Tarifario.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_tarifario: 'Creo un nuevo tarifario.',
      ip: req.ip,
      tarifario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tarifario==null) return res.status(404).json({message: `Tarifarios nulos`})
  res.status(200).json(tarifario)
}

async function createAllTarifario(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Tarifario.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        tarifario: 0,
        ip: req.ip,
        accion_tarifario: 'Creo un nuevo tarifario tarifario.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_tarifario: 'Creo una nueva persona tarifario.',
        accion: 'I',
        ip: req.ip,
        tarifario: 0
      }, { transaction: t });
  
      await models.Tarifario.create({
        id_persona: persona.id,
        id_tarifario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_tarifario: 'Creo un nuevo tarifario.',
        ip: req.ip,
        tarifario: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateTarifario(req,res){
  let [err,tarifario]=await get(models.Tarifario.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_tarifario: 'Edito un tarifario.',
    ip: req.ip,
    tarifario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tarifario==null) return res.status(404).json({message: `Tarifarios nulos`})
  res.status(200).json(tarifario)
}

async function deleteTarifario(req,res){
  let [err,tarifario]=await get(models.Tarifario.update({
    estado: 'I',

    accion_tarifario: 'Elimino un tarifario.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tarifario==null) return res.status(404).json({message: `Tarifarios nulos`})
  res.status(200).json(tarifario)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTarifarios,
  getTarifario,
  createTarifario,
  createAllTarifario,
  updateTarifario,
  deleteTarifario
}