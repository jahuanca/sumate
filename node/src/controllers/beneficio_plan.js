'use strict'
const models=require('../models')

async function getBeneficio_Plans(req,res){
  let [err,beneficio_plans]=await get(models.Beneficio_Plan.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(beneficio_plans==null) return res.status(404).json({message: `Beneficio_Plans nulos`})
  res.status(200).json(beneficio_plans)
}

async function getBeneficio_Plan(req,res){
  let [err,beneficio_plan]=await get(models.Beneficio_Plan.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(beneficio_plan==null) return res.status(404).json({message: `Beneficio_Plans nulos`})
  res.status(200).json(beneficio_plan)
}

async function createBeneficio_Plan(req,res){
  let [err,beneficio_plan]=await get(models.Beneficio_Plan.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo beneficio_plan.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(beneficio_plan==null) return res.status(404).json({message: `Beneficio_Plans nulos`})
  res.status(200).json(beneficio_plan)
}


async function updateBeneficio_Plan(req,res){
  let [err,beneficio_plan]=await get(models.Beneficio_Plan.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un beneficio_plan.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(beneficio_plan==null) return res.status(404).json({message: `Beneficio_Plans nulos`})
  res.status(200).json(beneficio_plan[1][0].dataValues)
}


async function deleteBeneficio_Plan(req,res){
  let [err,beneficio_plan]=await get(models.Beneficio_Plan.update({
    estado: 'I',

    accion_usuario: 'Elimino un beneficio_plan.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(beneficio_plan==null) return res.status(404).json({message: `Beneficio_Plans nulos`})
  res.status(200).json(beneficio_plan)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getBeneficio_Plans,
  getBeneficio_Plan,
  createBeneficio_Plan,
  updateBeneficio_Plan,
  deleteBeneficio_Plan
}