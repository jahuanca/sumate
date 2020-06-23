'use strict'
const models=require('../models')

async function getDetalle_Pedidos(req,res){
  let [err,detalle_pedidos]=await get(models.Detalle_Pedido.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pedidos==null) return res.status(404).json({message: `Detalle_Pedidos nulos`})
  res.status(200).json(detalle_pedidos)
}

async function getDetalle_Pedido(req,res){
  let [err,detalle_pedido]=await get(models.Detalle_Pedido.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pedido==null) return res.status(404).json({message: `Detalle_Pedidos nulos`})
  res.status(200).json(detalle_pedido)
}

async function getDetalle_PedidoPedido(req,res){
  let [err,detalle_pedido]=await get(models.Detalle_Pedido.findAll({
    where:{id_pedido: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pedido==null) return res.status(404).json({message: `Detalle_Pedidos nulos`})
  res.status(200).json(detalle_pedido)
}

async function createDetalle_Pedido(req,res){
  let [err,detalle_pedido]=await get(models.Detalle_Pedido.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_detalle_pedido: 'Creo un nuevo detalle_pedido.',
      ip: req.ip,
      detalle_pedido: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pedido==null) return res.status(404).json({message: `Detalle_Pedidos nulos`})
  res.status(200).json(detalle_pedido)
}

async function createAllDetalle_Pedido(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Detalle_Pedido.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        detalle_pedido: 0,
        ip: req.ip,
        accion_detalle_pedido: 'Creo un nuevo detalle_pedido detalle_pedido.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_detalle_pedido: 'Creo una nueva persona detalle_pedido.',
        accion: 'I',
        ip: req.ip,
        detalle_pedido: 0
      }, { transaction: t });
  
      await models.Detalle_Pedido.create({
        id_persona: persona.id,
        id_detalle_pedido: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_detalle_pedido: 'Creo un nuevo detalle_pedido.',
        ip: req.ip,
        detalle_pedido: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateDetalle_Pedido(req,res){
  let [err,detalle_pedido]=await get(models.Detalle_Pedido.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_detalle_pedido: 'Edito un detalle_pedido.',
    ip: req.ip,
    detalle_pedido: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pedido==null) return res.status(404).json({message: `Detalle_Pedidos nulos`})
  res.status(200).json(detalle_pedido)
}

async function deleteDetalle_Pedido(req,res){
  let [err,detalle_pedido]=await get(models.Detalle_Pedido.update({
    estado: 'I',

    accion_detalle_pedido: 'Elimino un detalle_pedido.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pedido==null) return res.status(404).json({message: `Detalle_Pedidos nulos`})
  res.status(200).json(detalle_pedido)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDetalle_Pedidos,
  getDetalle_Pedido,
  getDetalle_PedidoPedido,
  createDetalle_Pedido,
  createAllDetalle_Pedido,
  updateDetalle_Pedido,
  deleteDetalle_Pedido
}