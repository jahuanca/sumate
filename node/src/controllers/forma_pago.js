'use strict'
const models=require('../models')

async function getForma_Pagos(req,res){
  let [err,forma_pagos]=await get(models.Forma_Pago.findAll({
    where:{estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pagos==null) return res.status(404).json({message: `Forma_Pagos nulos`})
  res.status(200).json(forma_pagos)
}

async function getForma_Pago(req,res){
  let [err,forma_pago]=await get(models.Forma_Pago.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago==null) return res.status(404).json({message: `Forma_Pagos nulos`})
  res.status(200).json(forma_pago)
}

async function createForma_Pago(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'I',
    accion_usuario: 'Creo una nueva forma de pago.',
    ip: req.ip,
    usuario: 0
  }
  if(req.files){
    p.imagenes='';
    for (let i = 0; i < req.files.length; i++) {
      p.imagenes=p.imagenes+req.files[i].filename;
      if(i!=req.files.length-1){
        p.imagenes=p.imagenes+','
      }
    }
    p.imagenes=models.limpiar(p.imagenes)
  }
  let [err,forma_pago]=await get(models.Forma_Pago.create(p))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago==null) return res.status(404).json({message: `Forma_Pagos nulos`})
  res.status(200).json(forma_pago)
}

async function createAllForma_Pago(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Forma_Pago.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        forma_pago: 0,
        ip: req.ip,
        accion_forma_pago: 'Creo un nuevo forma_pago forma_pago.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_forma_pago: 'Creo una nueva persona forma_pago.',
        accion: 'I',
        ip: req.ip,
        forma_pago: 0
      }, { transaction: t });
  
      await models.Forma_Pago.create({
        id_persona: persona.id,
        id_forma_pago: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_forma_pago: 'Creo un nuevo forma_pago.',
        ip: req.ip,
        forma_pago: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateForma_Pago(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'U',
    accion_usuario: 'Edito una forma de pago.',
    ip: req.ip,
    usuario: 0
  }
  if(req.files){
    p.imagenes='';
    for (let i = 0; i < req.files.length; i++) {
      if(req.files[i].originalname.includes('sum2020_')){
        p.imagenes=p.imagenes+req.files[i].originalname;
      }else{
        p.imagenes=p.imagenes+req.files[i].filename;
      }
      if(i!=req.files.length-1){
        p.imagenes=p.imagenes+','
      }
    }
    p.imagenes=models.limpiar(p.imagenes)
  }

  let [err,forma_pago]=await get(models.Forma_Pago.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago==null) return res.status(404).json({message: `Forma_Pagos nulos`})
  res.status(200).json(forma_pago)
}

async function deleteForma_Pago(req,res){
  let [err,forma_pago]=await get(models.Forma_Pago.update({
    estado: 'I',

    accion_forma_pago: 'Elimino un forma_pago.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago==null) return res.status(404).json({message: `Forma_Pagos nulos`})
  res.status(200).json(forma_pago)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getForma_Pagos,
  getForma_Pago,
  createForma_Pago,
  createAllForma_Pago,
  updateForma_Pago,
  deleteForma_Pago
}