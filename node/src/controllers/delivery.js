'use strict'
const models=require('../models')

async function getDeliverys(req,res){
  let [err,deliverys]=await get(models.Delivery.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(deliverys==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(deliverys)
}

async function getDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

async function getDeliveryUsuario(req,res){
  let [err,delivery]=await get(models.Delivery.findOne({
    where:{id_usuario: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Delivery nulos`})
  res.status(200).json(delivery)
}

async function createDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_delivery: 'Creo un nuevo delivery.',
      ip: req.ip,
      delivery: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

async function createAllDelivery(req,res){
  try {
    const result = await models.sequelize.transaction(async (t) => {
      let usuario=null;
      if(req.body.Usuario){
        let u=JSON.parse(req.body.Usuario);
        //validar si las passwods se parecen o si los correos y si no envia usuario que retorne 500
        usuario=await models.Usuario.create({
          id_tipo_usuario: 2,
          username: u.username,
          password: u.password,
          accion: 'I',
          usuario: 1,
          ip: req.ip,
          accion_usuario: 'Creo un nuevo usuario de delivery.',
        }, { transaction: t });
      }else{
        return res.status(500).json({message: `Error en el servidor Usuario no enviado.`})
      }

      let c={
        id_usuario: usuario.id,
        ruc: req.body.ruc,
        nombre: req.body.nombre,
        razon_social: req.body.razon_social,
        direccion: req.body.direccion,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        celular: req.body.celular,
        hora_apertura: req.body.hora_apertura,
        hora_cierre: req.body.hora_cierre,
        restriccion: models.limpiar(req.body.restriccion),
        condicion: models.limpiar(req.body.condicion),
        descripcion: models.limpiar(req.body.descripcion),
        observacion: models.limpiar(req.body.observacion),

        accion: 'I',
        accion_usuario: 'Creo un nuevo delivery completo.',
        ip: req.ip,
        usuario: 0
      }
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
      let delivery=await get(models.Delivery.create(c,{ transaction: t }))
      delivery.Usuario=usuario;
      return delivery;
    });
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})
  }
}

async function updateAllDelivery(req,res){
  try {
    const result = await models.sequelize.transaction(async (t) => {
      let usuario=null;
      if(req.body.Usuario){
        let u=JSON.parse(req.body.Usuario);
        //validar si las passwods se parecen o si los correos y si no envia usuario que retorne 500
        const user={
          id_tipo_usuario: 2,
          username: u.username,
          accion: 'I',
          usuario: 1,
          ip: req.ip,
          accion_usuario: 'Edito el usuario de un delivery.',
        }
        if(u.password) user.password=u.password
        usuario=await models.Usuario.update(user,{
          where:{
            id: u.id, estado:'A'
          },
          individualHooks: true          
        }, { transaction: t });
      }else{
        return res.status(500).json({message: `Error en el servidor Usuario no enviado.`})
      }

      let c={
        id_usuario: usuario[1][0].dataValues.id,
        ruc: req.body.ruc,
        nombre: req.body.nombre,
        razon_social: req.body.razon_social,
        direccion: req.body.direccion,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        celular: req.body.celular,
        hora_apertura: req.body.hora_apertura,
        hora_cierre: req.body.hora_cierre,
        condicion: models.limpiar(req.body.condicion),
        restriccion: models.limpiar(req.body.restriccion),
        descripcion: models.limpiar(req.body.descripcion),
        observacion: models.limpiar(req.body.observacion),

        accion: 'I',
        accion_usuario: 'Edito un delivery.',
        ip: req.ip,
        usuario: 0
      }
      if(req.files){
        c.imagenes='';
        for (let i = 0; i < req.files.length; i++) {
          if(req.files[i].originalname.includes('sum2020_')){
            c.imagenes=c.imagenes+req.files[i].originalname;
          }else{
            c.imagenes=c.imagenes+req.files[i].filename;
          }
          if(i!=req.files.length-1){
            c.imagenes=c.imagenes+','
          }
        }
        c.imagenes=models.limpiar(c.imagenes)
      }
      let delivery=await models.Delivery.update(c,{
        where:{
          id: req.body.id, estado:'A'
        },
        individualHooks: true
      },{ transaction: t })
      usuario[1][0].dataValues.password=null;
      usuario[1][0].dataValues.salt=null;
      delivery[1][0].dataValues.Usuario=usuario[1][0].dataValues;
      console.log(delivery[1][0].dataValues)
      return delivery[1][0].dataValues;
    });
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})
  }

  
}

async function updateDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_delivery: 'Edito un delivery.',
    ip: req.ip,
    delivery: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

async function deleteDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.update({
    estado: 'I',

    accion_delivery: 'Elimino un delivery.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDeliverys,
  getDelivery,
  getDeliveryUsuario,
  createDelivery,
  createAllDelivery,
  updateAllDelivery,
  updateDelivery,
  deleteDelivery
}