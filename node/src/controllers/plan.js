'use strict'
const models=require('../models')

async function getPlans(req,res){
  let [err,plans]=await get(models.Plan.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(plans==null) return res.status(404).json({message: `Plans nulos`})
  res.status(200).json(plans)
}

async function getPlan(req,res){
  let [err,plan]=await get(models.Plan.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(plan==null) return res.status(404).json({message: `Plans nulos`})
  res.status(200).json(plan)
}

async function createPlan(req,res){
  let [err,plan]=await get(models.Plan.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo plan.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor err`})
  if(plan==null) return res.status(404).json({message: `Plans nulos`})
  res.status(200).json(plan)
}

async function createAllPlan(req,res){
  try {

    const result = await models.sequelize.transaction(async (t) => {
      const plan=await models.Plan.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: models.limpiar(req.body.descripcion),
        cash: models.limpiar(req.body.cash),
        deliverys_gratis: models.limpiar(req.body.deliverys_gratis),
        duracion: req.body.duracion,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo producto producto.',
      }, { transaction: t });

      let beneficios=JSON.parse(req.body.Beneficio_Plans);
      for (let i = 0; i < beneficios.length; i++) {
        
        beneficios[i]=await models.Beneficio_Plan.create({
          id_plan: plan.id,
          id_beneficio: beneficios[i].id_beneficio,
          descripcion: models.limpiar(beneficios[i].descripcion),
          restriccion: models.limpiar(req.body.restriccion),
          
          accion_producto: 'Creo una nueva persona producto.',
          accion: 'I',
          ip: req.ip,
          usuario: 0
        }, { transaction: t });
      }
      plan.dataValues.Beneficio_Plans=beneficios;
      return plan;
    }); 
    console.log(result)   
    res.status(200).json(result);
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

}


async function updatePlan(req,res){
  let [err,plan]=await get(models.Plan.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un plan.',
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
  if(plan==null) return res.status(404).json({message: `Plans nulos`})
  res.status(200).json(plan[1][0].dataValues)
}

async function updateAllPlan(req,res){
  console.log(req.body)
  try {

    const result = await models.sequelize.transaction(async (t) => {
      const plan=await models.Plan.update({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: models.limpiar(req.body.descripcion),
        cash: models.limpiar(req.body.cash),
        deliverys_gratis: models.limpiar(req.body.deliverys_gratis),
        duracion: req.body.duracion,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo producto producto.',
      },{
        where:{
          id: req.body.id, estado:'A'
        },
        individualHooks: true,
        validate: false
      }, { transaction: t });
      
      await models.Beneficio_Plan.update({estado: 'I'}, {where: {id_plan: req.body.id}},{transaction: t});

      let beneficios=JSON.parse(req.body.Beneficio_Plans);
      for (let i = 0; i < beneficios.length; i++) {
        beneficios[i]=await models.updateOrCreate(models.Beneficio_Plan, beneficios[i], {estado: 'A', descripcion: beneficios[i].descripcion}, {id: models.limpiar(beneficios[i].id)}, {transaction: t});
      }
      plan[1][0].dataValues.Beneficio_Plans=beneficios;
      return plan;
    });  
    console.log(result[1][0].dataValues)    
    res.status(200).json(result[1][0].dataValues);
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

}

async function deletePlan(req,res){
  try {
    const result = await models.sequelize.transaction(async (t) => {
      const plan=await models.Plan.update({
        estado: 'I',
        accion_usuario: 'Elimino un plan.',
        accion: 'D',
        ip: req.ip,
        usuario: 0
      },{
        where:{
          id: req.params.id, estado:'A'
        },
        individualHooks: true,
        validate: false
      }, { transaction: t });
      
      await models.Beneficio_Plan.update({estado: 'I'}, {where: {id_plan: req.params.id}},{transaction: t});

      return plan;
    });  
    res.status(200).json(result[1][0].dataValues);
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPlans,
  getPlan,
  createPlan,
  createAllPlan,
  updateAllPlan,
  updatePlan,
  deletePlan
}