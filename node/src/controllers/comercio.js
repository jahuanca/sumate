'use strict'
const models=require('../models')

async function getComercios(req,res){
  let [err,comercios]=await get(models.Comercio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercios==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercios)
}

async function getComercio(req,res){
  let [err,comercio]=await get(models.Comercio.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function getComercioUsuario(req,res){
  let [err,comercio]=await get(models.Comercio.findOne({
    where:{id_usuario: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function createComercio(req,res){
  let [err,comercio]=await get(models.Comercio.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_comercio: 'Creo un nuevo comercio.',
      ip: req.ip,
      comercio: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function createAllComercio(req,res){
  
  try {
    const result = await models.sequelize.transaction(async (t) => {
      let usuario=null;
      if(req.body.Usuario){
        let u=JSON.parse(req.body.Usuario);
        //validar si las passwods se parecen o si los correos y si no envia usuario que retorne 500
        usuario=await models.Usuario.create({
          id_tipo_usuario: 3,
          username: u.username,
          password: u.password,
          accion: 'I',
          usuario: req.usuario,
          ip: req.ip,
          accion_usuario: 'Creo un nuevo usuario de comercio.',
        }, { transaction: t });
      }

      let c={
        id_tipo_comercio: req.body.id_tipo_comercio,
        id_usuario: usuario.id,
        ruc: req.body.ruc,
        nombre: req.body.nombre,
        razon_social: req.body.razon_social,
        direccion: req.body.direccion,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        celular: req.body.celular,

        facebook: models.limpiar(req.body.facebook),
        instagram: models.limpiar(req.body.instagram),
        whatsapp: models.limpiar(req.body.whatsapp),

        hora_apertura: req.body.hora_apertura,
        hora_cierre: req.body.hora_cierre,
        descripcion: models.limpiar(req.body.descripcion),
        observacion: models.limpiar(req.body.observacion),

        accion: 'I',
        accion_usuario: 'Creo un nuevo comercio completo.',
        ip: req.ip,
        usuario: req.usuario
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

      let comercio=await models.Comercio.create(c,{ transaction: t});
      comercio.Usuario=usuario;
      return comercio;
    });
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})
  }
}

async function updateAllComercio(req,res){
  try {
    const result = await models.sequelize.transaction(async (t) => {
      let usuario=null;
      if(req.body.Usuario){
        let u=JSON.parse(req.body.Usuario);
        //validar si las passwods se parecen o si los correos y si no envia usuario que retorne 500
        const user={
          id_tipo_usuario: 3,
          username: u.username,
          accion: 'I',
          usuario: 1,
          ip: req.ip,
          accion_usuario: 'Edito el usuario de un comercio.',
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
        id_tipo_comercio: req.body.id_tipo_comercio,
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
        facebook: models.limpiar(req.body.facebook),
        instagram: models.limpiar(req.body.instagram),
        whatsapp: models.limpiar(req.body.whatsapp),
        descripcion: models.limpiar(req.body.descripcion),
        observacion: models.limpiar(req.body.observacion),

        accion: 'I',
        accion_usuario: 'Edito un comercio.',
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
      let comercio=await models.Comercio.update(c,{
        where:{
          id: req.body.id, estado:'A'
        },
        individualHooks: true
      },{ transaction: t })
      usuario[1][0].dataValues.password=null;
      usuario[1][0].dataValues.salt=null;
      comercio[1][0].dataValues.Usuario=usuario[1][0].dataValues;
      console.log(comercio[1][0].dataValues)
      return comercio[1][0].dataValues;
    });
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})
  }

  
}

async function updateComercio(req,res){
  let [err,comercio]=await get(models.Comercio.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_comercio: 'Edito un comercio.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

async function deleteComercio(req,res){
  let [err,comercio]=await get(models.Comercio.update({
    estado: 'I',

    accion_comercio: 'Elimino un comercio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(comercio==null) return res.status(404).json({message: `Comercios nulos`})
  res.status(200).json(comercio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getComercios,
  getComercio,
  getComercioUsuario,
  createComercio,
  createAllComercio,
  updateAllComercio,
  updateComercio,
  deleteComercio
}