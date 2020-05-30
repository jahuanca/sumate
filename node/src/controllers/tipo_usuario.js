'use strict'
const models=require('../models')

async function getTipo_Usuarios(req,res){
  let [err,tipo_usuarios]=await get(models.Tipo_Usuario.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_usuarios==null) return res.status(404).json({message: `Tipo_Usuarios nulos`})
  res.status(200).json(tipo_usuarios)
}

async function getTipo_Usuario(req,res){
  let [err,tipo_usuario]=await get(models.Tipo_Usuario.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_usuario==null) return res.status(404).json({message: `Tipo_Usuarios nulos`})
  res.status(200).json(tipo_usuario)
}

async function createTipo_Usuario(req,res){
  let [err,tipo_usuario]=await get(models.Tipo_Usuario.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_tipo_usuario: 'Creo un nuevo tipo_usuario.',
      ip: req.ip,
      tipo_usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_usuario==null) return res.status(404).json({message: `Tipo_Usuarios nulos`})
  res.status(200).json(tipo_usuario)
}

async function createAllTipo_Usuario(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Tipo_Usuario.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        tipo_usuario: 0,
        ip: req.ip,
        accion_tipo_usuario: 'Creo un nuevo tipo_usuario tipo_usuario.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_tipo_usuario: 'Creo una nueva persona tipo_usuario.',
        accion: 'I',
        ip: req.ip,
        tipo_usuario: 0
      }, { transaction: t });
  
      await models.Tipo_Usuario.create({
        id_persona: persona.id,
        id_tipo_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_tipo_usuario: 'Creo un nuevo tipo_usuario.',
        ip: req.ip,
        tipo_usuario: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateTipo_Usuario(req,res){
  let [err,tipo_usuario]=await get(models.Tipo_Usuario.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_tipo_usuario: 'Edito un tipo_usuario.',
    ip: req.ip,
    tipo_usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_usuario==null) return res.status(404).json({message: `Tipo_Usuarios nulos`})
  res.status(200).json(tipo_usuario)
}

async function deleteTipo_Usuario(req,res){
  let [err,tipo_usuario]=await get(models.Tipo_Usuario.update({
    estado: 'I',

    accion_tipo_usuario: 'Elimino un tipo_usuario.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipo_usuario==null) return res.status(404).json({message: `Tipo_Usuarios nulos`})
  res.status(200).json(tipo_usuario)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipo_Usuarios,
  getTipo_Usuario,
  createTipo_Usuario,
  createAllTipo_Usuario,
  updateTipo_Usuario,
  deleteTipo_Usuario
}