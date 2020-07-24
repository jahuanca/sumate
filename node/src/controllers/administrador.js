'use strict'
const models=require('../models')

async function getAdministradors(req,res){
  let [err,administradors]=await get(models.Administrador.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administradors==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administradors)
}

async function getAdministrador(req,res){
  let [err,administrador]=await get(models.Administrador.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administrador)
}

async function getAdministradorUsuario(req,res){
  let [err,administrador]=await get(models.Administrador.findOne({
    where:{id_usuario: req.params.id, estado: 'A'},
    include:[{model: models.Usuario}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administrador)
}

async function createAdministrador(req,res){
  let [err,administrador]=await get(models.Administrador.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_administrador: 'Creo un nuevo administrador.',
      ip: req.ip,
      administrador: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administrador)
}

async function createAllAdministrador(req,res){
  try {
    const result = await sequelize.transaction(async (t) => {
      const user=await models.Usuario.create({
        id_tipo_usuario: 1,
        username: req.body.username,
        password: req.body.password,
        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo administrador-usuario-all.',
      }, { transaction: t });

      const administrador=await models.Administrador.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        id_usuario: user.id, 

        accion: 'I',
        accion_usuario: 'Creo un nuevo administrador-all.',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
      return administrador;
    });
    res.status(200).json(administrador)
  
  }catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }
}

async function updateAdministrador(req,res){
  let [err,administrador]=await get(models.Administrador.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_administrador: 'Edito un administrador.',
    ip: req.ip,
    administrador: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administrador)
}

async function updateMiCuenta(req,res){
  let [err,administrador]=await get(models.Administrador.update({
    dni: models.limpiar(req.body.dni),
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    celular:  req.body.celular,
    
    accion: 'U',
    accion_usuario: 'Edito un administrador.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.administrador, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administrador[1][0].dataValues)
}

async function deleteAdministrador(req,res){
  let [err,administrador]=await get(models.Administrador.update({
    estado: 'I',

    accion_administrador: 'Elimino un administrador.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administradors nulos`})
  res.status(200).json(administrador)
}

async function validateCelular(req,res){
  let [err,administrador]=await get(models.Administrador.findOne({
    where:{id: req.administrador, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(administrador==null) return res.status(404).json({message: `Administrador nulos`})
  if(!administrador.correctCodigo(req.body.codigo)){
    return res.status(401).json({message: `Codigos no coinciden`})
  }
  administrador.validado=true;
  administrador.save();
  res.status(200).json(administrador)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getAdministradors,
  getAdministrador,
  getAdministradorUsuario,
  createAdministrador,
  createAllAdministrador,
  updateAdministrador,
  updateMiCuenta,
  deleteAdministrador,
  validateCelular
}