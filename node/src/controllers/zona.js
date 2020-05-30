'use strict'
const models=require('../models')

async function getZonas(req,res){
  let [err,zonas]=await get(models.Zona.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(zonas==null) return res.status(404).json({message: `Zonas nulos`})
  res.status(200).json(zonas)
}

async function getZona(req,res){
  let [err,zona]=await get(models.Zona.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(zona==null) return res.status(404).json({message: `Zonas nulos`})
  res.status(200).json(zona)
}

async function createZona(req,res){
  let [err,zona]=await get(models.Zona.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_zona: 'Creo un nuevo zona.',
      ip: req.ip,
      zona: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(zona==null) return res.status(404).json({message: `Zonas nulos`})
  res.status(200).json(zona)
}

async function createAllZona(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Zona.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        zona: 0,
        ip: req.ip,
        accion_zona: 'Creo un nuevo zona zona.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_zona: 'Creo una nueva persona zona.',
        accion: 'I',
        ip: req.ip,
        zona: 0
      }, { transaction: t });
  
      await models.Zona.create({
        id_persona: persona.id,
        id_zona: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_zona: 'Creo un nuevo zona.',
        ip: req.ip,
        zona: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateZona(req,res){
  let [err,zona]=await get(models.Zona.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_zona: 'Edito un zona.',
    ip: req.ip,
    zona: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(zona==null) return res.status(404).json({message: `Zonas nulos`})
  res.status(200).json(zona)
}

async function deleteZona(req,res){
  let [err,zona]=await get(models.Zona.update({
    estado: 'I',

    accion_zona: 'Elimino un zona.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(zona==null) return res.status(404).json({message: `Zonas nulos`})
  res.status(200).json(zona)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getZonas,
  getZona,
  createZona,
  createAllZona,
  updateZona,
  deleteZona
}