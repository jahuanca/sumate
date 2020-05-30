'use strict'
const models=require('../models')

async function getDepartamentos(req,res){
  let [err,departamentos]=await get(models.Departamento.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(departamentos==null) return res.status(404).json({message: `Departamentos nulos`})
  res.status(200).json(departamentos)
}

async function getDepartamento(req,res){
  let [err,departamento]=await get(models.Departamento.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(departamento==null) return res.status(404).json({message: `Departamentos nulos`})
  res.status(200).json(departamento)
}

async function createDepartamento(req,res){
  let [err,departamento]=await get(models.Departamento.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_departamento: 'Creo un nuevo departamento.',
      ip: req.ip,
      departamento: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(departamento==null) return res.status(404).json({message: `Departamentos nulos`})
  res.status(200).json(departamento)
}

async function createAllDepartamento(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Departamento.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        departamento: 0,
        ip: req.ip,
        accion_departamento: 'Creo un nuevo departamento departamento.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_departamento: 'Creo una nueva persona departamento.',
        accion: 'I',
        ip: req.ip,
        departamento: 0
      }, { transaction: t });
  
      await models.Departamento.create({
        id_persona: persona.id,
        id_departamento: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_departamento: 'Creo un nuevo departamento.',
        ip: req.ip,
        departamento: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateDepartamento(req,res){
  let [err,departamento]=await get(models.Departamento.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_departamento: 'Edito un departamento.',
    ip: req.ip,
    departamento: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(departamento==null) return res.status(404).json({message: `Departamentos nulos`})
  res.status(200).json(departamento)
}

async function deleteDepartamento(req,res){
  let [err,departamento]=await get(models.Departamento.update({
    estado: 'I',

    accion_departamento: 'Elimino un departamento.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(departamento==null) return res.status(404).json({message: `Departamentos nulos`})
  res.status(200).json(departamento)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDepartamentos,
  getDepartamento,
  createDepartamento,
  createAllDepartamento,
  updateDepartamento,
  deleteDepartamento
}