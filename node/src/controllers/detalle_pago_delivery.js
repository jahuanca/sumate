'use strict'
const models=require('../models')

async function getDetalle_Pago_Deliverys(req,res){
  let [err,detalle_pago_deliverys]=await get(models.Detalle_Pago_Delivery.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_deliverys==null) return res.status(404).json({message: `Detalle_Pago_Deliverys nulos`})
  res.status(200).json(detalle_pago_deliverys)
}

async function getDetalle_Pago_Delivery(req,res){
  let [err,detalle_pago_delivery]=await get(models.Detalle_Pago_Delivery.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_delivery==null) return res.status(404).json({message: `Detalle_Pago_Deliverys nulos`})
  res.status(200).json(detalle_pago_delivery)
}

async function createDetalle_Pago_Delivery(req,res){
  let [err,detalle_pago_delivery]=await get(models.Detalle_Pago_Delivery.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_detalle_pago_delivery: 'Creo un nuevo detalle_pago_delivery.',
      ip: req.ip,
      detalle_pago_delivery: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_delivery==null) return res.status(404).json({message: `Detalle_Pago_Deliverys nulos`})
  res.status(200).json(detalle_pago_delivery)
}

async function createAllDetalle_Pago_Delivery(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Detalle_Pago_Delivery.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        detalle_pago_delivery: 0,
        ip: req.ip,
        accion_detalle_pago_delivery: 'Creo un nuevo detalle_pago_delivery detalle_pago_delivery.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_detalle_pago_delivery: 'Creo una nueva persona detalle_pago_delivery.',
        accion: 'I',
        ip: req.ip,
        detalle_pago_delivery: 0
      }, { transaction: t });
  
      await models.Detalle_Pago_Delivery.create({
        id_persona: persona.id,
        id_detalle_pago_delivery: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_detalle_pago_delivery: 'Creo un nuevo detalle_pago_delivery.',
        ip: req.ip,
        detalle_pago_delivery: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateDetalle_Pago_Delivery(req,res){
  let [err,detalle_pago_delivery]=await get(models.Detalle_Pago_Delivery.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_detalle_pago_delivery: 'Edito un detalle_pago_delivery.',
    ip: req.ip,
    detalle_pago_delivery: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_delivery==null) return res.status(404).json({message: `Detalle_Pago_Deliverys nulos`})
  res.status(200).json(detalle_pago_delivery)
}

async function deleteDetalle_Pago_Delivery(req,res){
  let [err,detalle_pago_delivery]=await get(models.Detalle_Pago_Delivery.update({
    estado: 'I',

    accion_detalle_pago_delivery: 'Elimino un detalle_pago_delivery.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detalle_pago_delivery==null) return res.status(404).json({message: `Detalle_Pago_Deliverys nulos`})
  res.status(200).json(detalle_pago_delivery)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDetalle_Pago_Deliverys,
  getDetalle_Pago_Delivery,
  createDetalle_Pago_Delivery,
  createAllDetalle_Pago_Delivery,
  updateDetalle_Pago_Delivery,
  deleteDetalle_Pago_Delivery
}