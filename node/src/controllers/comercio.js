'use strict'
const models=require('../models')

async function getComercios(req,res){
  let [err,comercios]=await get(models.Comercio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercios==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercios)
}

async function getComercio(req,res){
  let [err,comercio]=await get(models.Comercio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function getComercioUsuario(req,res){
  let [err,comercio]=await get(models.Comercio.findOne({
    where:{id_usuario: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function createComercio(req,res){
  let [err,comercio]=await get(models.Comercio.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_comercio: 'Creo un nuevo comercio.',
      ip: req.ip,
      comercio: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function createAllComercio(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Comercio.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        comercio: 0,
        ip: req.ip,
        accion_comercio: 'Creo un nuevo comercio comercio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_comercio: 'Creo una nueva persona comercio.',
        accion: 'I',
        ip: req.ip,
        comercio: 0
      }, { transaction: t });
  
      await models.Comercio.create({
        id_persona: persona.id,
        id_comercio: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_comercio: 'Creo un nuevo comercio.',
        ip: req.ip,
        comercio: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateComercio(req,res){
  let [err,comercio]=await get(models.Comercio.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_comercio: 'Edito un comercio.',
    ip: req.ip,
    comercio: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function deleteComercio(req,res){
  let [err,comercio]=await get(models.Comercio.update({
    estado: 'I',

    accion_comercio: 'Elimino un comercio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getComercios,
  getComercio,
  getComercioUsuario,
  createComercio,
  createAllComercio,
  updateComercio,
  deleteComercio
}