'use strict'
const models=require('../models')

async function getDetalle_Combos(req,res){
  let [err,detalle_combos]=await get(models.Detalle_Combo.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(detalle_combos==null) return res.status(404).json({message: `Detalle_Combos nulos`})
  res.status(200).json(detalle_combos)
}

async function getDetalle_Combo(req,res){
  let [err,detalle_combo]=await get(models.Detalle_Combo.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(detalle_combo==null) return res.status(404).json({message: `Detalle_Combos nulos`})
  res.status(200).json(detalle_combo)
}

async function getDetalle_ComboPedido(req,res){
  let [err,detalle_combo]=await get(models.Detalle_Combo.findAll({
    where:{id_pedido: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(detalle_combo==null) return res.status(404).json({message: `Detalle_Combos nulos`})
  res.status(200).json(detalle_combo)
}

async function createDetalle_Combo(req,res){
  let [err,detalle_combo]=await get(models.Detalle_Combo.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_detalle_combo: 'Creo un nuevo detalle_combo.',
      ip: req.ip,
      detalle_combo: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(detalle_combo==null) return res.status(404).json({message: `Detalle_Combos nulos`})
  res.status(200).json(detalle_combo)
}

async function createAllDetalle_Combo(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Detalle_Combo.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        detalle_combo: 0,
        ip: req.ip,
        accion_detalle_combo: 'Creo un nuevo detalle_combo detalle_combo.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_detalle_combo: 'Creo una nueva persona detalle_combo.',
        accion: 'I',
        ip: req.ip,
        detalle_combo: 0
      }, { transaction: t });
  
      await models.Detalle_Combo.create({
        id_persona: persona.id,
        id_detalle_combo: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_detalle_combo: 'Creo un nuevo detalle_combo.',
        ip: req.ip,
        detalle_combo: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateDetalle_Combo(req,res){
  let [err,detalle_combo]=await get(models.Detalle_Combo.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_detalle_combo: 'Edito un detalle_combo.',
    ip: req.ip,
    detalle_combo: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(detalle_combo==null) return res.status(404).json({message: `Detalle_Combos nulos`})
  res.status(200).json(detalle_combo)
}

async function deleteDetalle_Combo(req,res){
  let [err,detalle_combo]=await get(models.Detalle_Combo.update({
    estado: 'I',

    accion_detalle_combo: 'Elimino un detalle_combo.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(detalle_combo==null) return res.status(404).json({message: `Detalle_Combos nulos`})
  res.status(200).json(detalle_combo)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDetalle_Combos,
  getDetalle_Combo,
  getDetalle_ComboPedido,
  createDetalle_Combo,
  createAllDetalle_Combo,
  updateDetalle_Combo,
  deleteDetalle_Combo
}