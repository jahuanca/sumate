'use strict'
const models=require('../models')

async function getPago_Deliverys(req,res){
  let [err,pago_deliverys]=await get(models.Pago_Delivery.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_deliverys==null) return res.status(404).json({message: `Pago_Deliverys nulos`})
  res.status(200).json(pago_deliverys)
}

async function getPago_Delivery(req,res){
  let [err,pago_delivery]=await get(models.Pago_Delivery.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_delivery==null) return res.status(404).json({message: `Pago_Deliverys nulos`})
  res.status(200).json(pago_delivery)
}

async function createPago_Delivery(req,res){
  let [err,pago_delivery]=await get(models.Pago_Delivery.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_pago_delivery: 'Creo un nuevo pago_delivery.',
      ip: req.ip,
      pago_delivery: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_delivery==null) return res.status(404).json({message: `Pago_Deliverys nulos`})
  res.status(200).json(pago_delivery)
}

async function createAllPago_Delivery(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Pago_Delivery.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        pago_delivery: 0,
        ip: req.ip,
        accion_pago_delivery: 'Creo un nuevo pago_delivery pago_delivery.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_pago_delivery: 'Creo una nueva persona pago_delivery.',
        accion: 'I',
        ip: req.ip,
        pago_delivery: 0
      }, { transaction: t });
  
      await models.Pago_Delivery.create({
        id_persona: persona.id,
        id_pago_delivery: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_pago_delivery: 'Creo un nuevo pago_delivery.',
        ip: req.ip,
        pago_delivery: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updatePago_Delivery(req,res){
  let [err,pago_delivery]=await get(models.Pago_Delivery.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_pago_delivery: 'Edito un pago_delivery.',
    ip: req.ip,
    pago_delivery: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_delivery==null) return res.status(404).json({message: `Pago_Deliverys nulos`})
  res.status(200).json(pago_delivery)
}

async function deletePago_Delivery(req,res){
  let [err,pago_delivery]=await get(models.Pago_Delivery.update({
    estado: 'I',

    accion_pago_delivery: 'Elimino un pago_delivery.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago_delivery==null) return res.status(404).json({message: `Pago_Deliverys nulos`})
  res.status(200).json(pago_delivery)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPago_Deliverys,
  getPago_Delivery,
  createPago_Delivery,
  createAllPago_Delivery,
  updatePago_Delivery,
  deletePago_Delivery
}