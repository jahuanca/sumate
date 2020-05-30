'use strict'
const models=require('../models')

async function getPersonas(req,res){
  let [err,personas]=await get(models.Persona.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(personas==null) return res.status(404).json({message: `Personas nulos`})
  res.status(200).json(personas)
}

async function getPersona(req,res){
  let [err,persona]=await get(models.Persona.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(persona==null) return res.status(404).json({message: `Personas nulos`})
  res.status(200).json(persona)
}

async function createPersona(req,res){
  let [err,persona]=await get(models.Persona.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_persona: 'Creo un nuevo persona.',
      ip: req.ip,
      persona: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(persona==null) return res.status(404).json({message: `Personas nulos`})
  res.status(200).json(persona)
}

async function createAllPersona(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Persona.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        persona: 0,
        ip: req.ip,
        accion_persona: 'Creo un nuevo persona persona.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_persona: 'Creo una nueva persona persona.',
        accion: 'I',
        ip: req.ip,
        persona: 0
      }, { transaction: t });
  
      await models.Persona.create({
        id_persona: persona.id,
        id_persona: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_persona: 'Creo un nuevo persona.',
        ip: req.ip,
        persona: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updatePersona(req,res){
  let [err,persona]=await get(models.Persona.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_persona: 'Edito un persona.',
    ip: req.ip,
    persona: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(persona==null) return res.status(404).json({message: `Personas nulos`})
  res.status(200).json(persona)
}

async function deletePersona(req,res){
  let [err,persona]=await get(models.Persona.update({
    estado: 'I',

    accion_persona: 'Elimino un persona.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(persona==null) return res.status(404).json({message: `Personas nulos`})
  res.status(200).json(persona)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonas,
  getPersona,
  createPersona,
  createAllPersona,
  updatePersona,
  deletePersona
}