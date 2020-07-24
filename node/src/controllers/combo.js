'use strict'
const models=require('../models')

async function getCombos(req,res){
  let [err,combos]=await get(models.Combo.findAll({
    where:{estado: 'A'},
    include: [{model: models.Detalle_Combo, where: {estado: 'A'}}]
  }))
  
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combos==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combos)
}

async function getCombosAtendiendo(req,res){
  let [err,combos]=await get(models.Combo.findAll({
    where:{estado: 'A', id_estado_combo: req.body},
    include: [{model: models.Cliente},
      {model: models.Forma_Pago},
      {model: models.Estado_Combo},
      {model: models.Tipo_Envio},
      {model: models.Detalle_Combo, include: [{model: models.Producto}]},
      {model: models.Tarifario, include: [{model: models.Zona},
        {model: models.Asociacion,include: [{all: true}]}]}
    ],
    order: [['createdAt','ASC']]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combos==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combos)
}

//crear dos traer el combo del cliente y traer mis combos
async function getCombosComercio(req,res){
  let [err,combo]=await get(models.Combo.findAll({
    where:{estado: 'A'},
    include: [{model: models.Detalle_Combo ,where: {estado: 'A'},
      require: true, include: [{model: models.Producto, require: true, where: {id_comercio: req.params.id}}]}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo)
}



async function getCombosCliente(req,res){
  let [err,combo]=await get(models.Combo.findAll({
    where:{id_cliente: req.params.id_cliente, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo)
}

async function getMisCombos(req,res){
  let [err,combo]=await get(models.Combo.findAll({
    where:{ estado: 'A'},
    include: [{model: models.Detalle_Combo, where: {estado: 'A'},
      include: [{model: models.Producto, where: {id_comercio: req.comercio, estado: 'A'}}]}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo)
}

async function getCombo(req,res){
  let [err,combo]=await get(models.Combo.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo)
}

async function createCombo(req,res){
  let p={
    id_combo: req.body.id_combo,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'I',
    accion_usuario: 'Creo una nueva combo.',
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
  let [err,combo]=await get(models.Combo.create(p))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo)
}

async function createAllCombo(req,res){
  try {
    const result = await models.sequelize.transaction(async (t) => {
      let c={
        nombre: req.body.nombre,
        precio: req.body.precio,
        peso: req.body.peso,
        descripcion: models.limpiar(req.body.descripcion),
        
        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo combo.',
      };
      if(req.files){
        c.imagenes='';
        for (let i = 0; i < req.files.length; i++) {
          c.imagenes=c.imagenes+req.files[i].filename;
          if(i!=req.files.length-1){
            c.imagenes=c.imagenes+','
          }
        }
        c.imagenes=models.limpiar(c.imagenes)
      }
      const combo=await models.Combo.create(c, { transaction: t });
      let detalles=JSON.parse(req.body.Detalle_Combos);
      for (let i = 0; i < detalles.length; i++) {
        let d=detalles[i];
        await models.Detalle_Combo.create({
          id_combo: combo.id,
          id_producto: d.id_producto,
          cantidad: d.cantidad,
          
          accion: 'I',
          accion_usuario: 'Creo un nuevo detalle de combo.',
          ip: req.ip,
          usuario: 0
        }, { transaction: t });
      }
      return combo;
    });
    res.status(200).json(result)
  
  } catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }
}

async function updateCombo(req,res){
  let p={
    nombre: req.body.nombre,
    precio: req.body.precio,
    peso: req.body.peso,
    descripcion: models.limpiar(req.body.descripcion),
    
    accion: 'U',
    accion_usuario: 'Edito un combo.',
    ip: req.ip,
    usuario: req.usuario
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

  try {
    const result = await models.sequelize.transaction(async (t) => {
      let [err,combo]=await get(models.Combo.update(p,
        {
          where:{
            id: req.body.id, estado:'A'
          },
          individualHooks: true
        },{transaction: t} 
      ));
      await models.Detalle_Combo.update({estado: 'I'}, {where: {id_combo: req.body.id}},{transaction: t})
      let detalles=[]
      if(req.body.Detalle_Combos){
        detalles=JSON.parse(req.body.Detalle_Combos);
        for (let i = 0; i < detalles.length; i++) {
          detalles[i].id_combo=req.body.id;
          detalles[i].estado='A';
          detalles[i]=await models.Detalle_Combo
              .findOne({ where: {id: detalles[i].id}},{transaction: t})
              .then(function(obj) {
                  if(obj){
                    return obj.update(detalles[i],{
                      hooks: false 
                    },{transaction: t});
                  }
                  return models.Detalle_Combo.create(detalles[i],{
                    hooks: false 
                  },{transaction: t});
              })
        }
      }
      return {id: combo[1][0].dataValues.id, nombre: combo[1][0].dataValues.nombre,
        imagenes: combo[1][0].dataValues.imagenes,
        precio: combo[1][0].dataValues.precio, 
        peso: combo[1][0].dataValues.peso, descripcion: combo[1][0].dataValues.descripcion, 
        Detalle_Combos: detalles};
    });
    res.status(200).json(result)
  
  } catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }
}

async function deleteCombo(req,res){
  let [err,combo]=await get(models.Combo.update({
    estado: 'I',

    accion_combo: 'Elimino un combo.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo)
}

async function cambiarEstadoCombo(req,res){

  let [err,combo]=await get(models.Combo.update({
    id_estado_combo: (req.body.id_estado_combo+1)
  },
  {
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true
  }  
  ))
  
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(combo==null) return res.status(404).json({message: `Combos nulos`})
  res.status(200).json(combo[1][0].dataValues)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCombos,
  getCombosCliente,
  getCombosComercio,
  getMisCombos,
  getCombo,
  getCombosAtendiendo,
  createCombo,
  createAllCombo,
  updateCombo,
  deleteCombo,
  cambiarEstadoCombo
}