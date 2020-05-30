'use strict'
const models=require('../models')

async function getClientes(req,res){
  let [err,clientes]=await get(models.Cliente.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(clientes==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(clientes)
}

async function getCliente(req,res){
  let [err,cliente]=await get(models.Cliente.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente)
}

async function createCliente(req,res){
  let [err,cliente]=await get(models.Cliente.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_cliente: 'Creo un nuevo cliente.',
      ip: req.ip,
      cliente: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente)
}

async function createAllCliente(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Cliente.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        cliente: 0,
        ip: req.ip,
        accion_cliente: 'Creo un nuevo cliente cliente.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_cliente: 'Creo una nueva persona cliente.',
        accion: 'I',
        ip: req.ip,
        cliente: 0
      }, { transaction: t });
  
      await models.Cliente.create({
        id_persona: persona.id,
        id_cliente: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_cliente: 'Creo un nuevo cliente.',
        ip: req.ip,
        cliente: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateCliente(req,res){
  let [err,cliente]=await get(models.Cliente.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_cliente: 'Edito un cliente.',
    ip: req.ip,
    cliente: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente)
}

async function deleteCliente(req,res){
  let [err,cliente]=await get(models.Cliente.update({
    estado: 'I',

    accion_cliente: 'Elimino un cliente.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getClientes,
  getCliente,
  createCliente,
  createAllCliente,
  updateCliente,
  deleteCliente
}