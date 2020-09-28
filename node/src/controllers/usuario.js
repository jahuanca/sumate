'use strict'
const models=require('../models')
const moment=require('moment')

async function getUsuarios(req,res){
  let [err,usuarios]=await get(models.Usuario.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuarios==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuarios)
}

async function getUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{model: models.Cliente},
      {model: models.Delivery},
      {model: models.Comercio},
      {model: models.Administrador}
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}




async function getSoyPremium(req,res){
  
  let [err,subscripcion]=await get(models.Subscripcion.findOne({
    where:{
      id_usuario: req.usuario, estado: 'A', atendido: true, 
      fin: {
        [models.Sequelize.Op.gte]: moment()
      }
    },
    include: [{model: models.Plan}]
  }));
  
  if(err) return res.status(500).json({message: `${err}`})
  if(subscripcion==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(subscripcion);
}

async function getUsuarioUsername(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{username: req.params.username, estado: 'A'},
    include: [{model: models.Cliente},
      {model: models.Delivery},
      {model: models.Comercio},
      {model: models.Administrador}
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}

async function getUsuarioCodigoInvitado(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{codigo_invitado: req.params.codigo, estado: 'A'},
    include: [{model: models.Cliente},
      {model: models.Delivery},
      {model: models.Comercio},
      {model: models.Administrador}
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}

async function createUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo usuario.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}

async function createAllUsuario(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Usuario.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo usuario usuario.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona usuario.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Usuario.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo usuario.',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_usuario: 'Edito un usuario.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}

async function updatePassword(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{id: req.usuario, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  if(!usuario.correctPassword(req.body.lastPassword)){
    return res.status(402).json({message: `Codigos no coinciden`})
  }
  usuario.password=req.body.password;
  usuario.save();
  res.status(200).json(usuario)
}

async function updateCorreo(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{id: req.usuario, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  if(!usuario.correctPassword(req.body.password)){
    return res.status(402).json({message: `Codigos no coinciden`})
  }
  usuario.username=req.body.username;
  usuario.save();
  res.status(200).json(usuario)
}

async function deleteUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.update({
    estado: 'I',

    accion_usuario: 'Elimino un usuario.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}

async function validateCorreo(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{id: req.usuario, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  if(!usuario.correctCodigo(req.body.codigo)){
    return res.status(402).json({message: `Codigos no coinciden`})
  }
  usuario.validado=true;
  usuario.save();
  res.status(200).json(usuario)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getUsuarios,
  getUsuario,
  getSoyPremium,
  getUsuarioUsername,
  getUsuarioCodigoInvitado,
  createUsuario,
  createAllUsuario,
  updateUsuario,
  updatePassword,
  updateCorreo,
  deleteUsuario,
  validateCorreo
}