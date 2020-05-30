'use strict'
const models=require('../models')

async function getPago_Comercios(req,res){
  let [err,pago_comercios]=await get(models.Pago_Comercio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_comercios==null) return res.status(404).json({message: `Pago_Comercios nulos`})
  res.status(200).json(pago_comercios)
}

async function getPago_Comercio(req,res){
  let [err,pago_comercio]=await get(models.Pago_Comercio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_comercio==null) return res.status(404).json({message: `Pago_Comercios nulos`})
  res.status(200).json(pago_comercio)
}

async function createPago_Comercio(req,res){
  let [err,pago_comercio]=await get(models.Pago_Comercio.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_pago_comercio: 'Creo un nuevo pago_comercio.',
      ip: req.ip,
      pago_comercio: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_comercio==null) return res.status(404).json({message: `Pago_Comercios nulos`})
  res.status(200).json(pago_comercio)
}

async function createAllPago_Comercio(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Pago_Comercio.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        pago_comercio: 0,
        ip: req.ip,
        accion_pago_comercio: 'Creo un nuevo pago_comercio pago_comercio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_pago_comercio: 'Creo una nueva persona pago_comercio.',
        accion: 'I',
        ip: req.ip,
        pago_comercio: 0
      }, { transaction: t });
  
      await models.Pago_Comercio.create({
        id_persona: persona.id,
        id_pago_comercio: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_pago_comercio: 'Creo un nuevo pago_comercio.',
        ip: req.ip,
        pago_comercio: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updatePago_Comercio(req,res){
  let [err,pago_comercio]=await get(models.Pago_Comercio.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_pago_comercio: 'Edito un pago_comercio.',
    ip: req.ip,
    pago_comercio: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_comercio==null) return res.status(404).json({message: `Pago_Comercios nulos`})
  res.status(200).json(pago_comercio)
}

async function deletePago_Comercio(req,res){
  let [err,pago_comercio]=await get(models.Pago_Comercio.update({
    estado: 'I',

    accion_pago_comercio: 'Elimino un pago_comercio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_comercio==null) return res.status(404).json({message: `Pago_Comercios nulos`})
  res.status(200).json(pago_comercio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPago_Comercios,
  getPago_Comercio,
  createPago_Comercio,
  createAllPago_Comercio,
  updatePago_Comercio,
  deletePago_Comercio
}