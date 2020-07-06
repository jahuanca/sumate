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

async function getClienteUsuario(req,res){
  let [err,cliente]=await get(models.Cliente.findOne({
    where:{id_usuario: req.params.id, estado: 'A'},
    include:[{model: models.Usuario}]
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
      const user=await models.Usuario.create({
        id_tipo_usuario: 1,
        username: req.body.username,
        password: req.body.password,
        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo cliente-usuario-all.',
      }, { transaction: t });

      const cliente=await models.Cliente.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        id_usuario: user.id, 

        accion: 'I',
        accion_usuario: 'Creo un nuevo cliente-all.',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
      return cliente;
    });
    res.status(200).json(result)
  
  }catch (error) {
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

async function updateMiCuenta(req,res){
  let [err,cliente]=await get(models.Cliente.update({
    dni: models.limpiar(req.body.dni),
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    celular:  req.body.celular,
    
    accion: 'U',
    accion_usuario: 'Edito un cliente.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.cliente, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente[1][0].dataValues)
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

async function validateCelular(req,res){
  let [err,cliente]=await get(models.Cliente.findOne({
    where:{id: req.cliente, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(cliente==null) return res.status(404).json({message: `Cliente nulos`})
  if(!cliente.correctCodigo(req.body.codigo)){
    return res.status(401).json({message: `Codigos no coinciden`})
  }
  cliente.validado=true;
  cliente.save();
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
  getClienteUsuario,
  createCliente,
  createAllCliente,
  updateCliente,
  updateMiCuenta,
  deleteCliente,
  validateCelular
}