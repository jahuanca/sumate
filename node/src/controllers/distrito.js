'use strict'
const models=require('../models')

async function getDistritos(req,res){
  let [err,distritos]=await get(models.Distrito.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(distritos==null) return res.status(404).json({message: `Distritos nulos`})
  res.status(200).json(distritos)
}

async function getDistrito(req,res){
  let [err,distrito]=await get(models.Distrito.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(distrito==null) return res.status(404).json({message: `Distritos nulos`})
  res.status(200).json(distrito)
}

async function createDistrito(req,res){
  let p={
    id_distrito: req.body.id_distrito,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    
    accion: 'I',
    accion_usuario: 'Creo un nuevo distrito.',
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
  let [err,distrito]=await get(models.Distrito.create(p))
  if(err) return res.status(500).json({message: `${err}`})
  if(distrito==null) return res.status(404).json({message: `Distritos nulos`})
  res.status(200).json(distrito)
}

async function createAllDistrito(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Distrito.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        distrito: 0,
        ip: req.ip,
        accion_distrito: 'Creo un nuevo distrito distrito.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_distrito: 'Creo una nueva persona distrito.',
        accion: 'I',
        ip: req.ip,
        distrito: 0
      }, { transaction: t });
  
      await models.Distrito.create({
        id_persona: persona.id,
        id_distrito: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_distrito: 'Creo un nuevo distrito.',
        ip: req.ip,
        distrito: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateDistrito(req,res){
  let p={
    id_provincia: req.body.provincia,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    
    accion: 'U',
    accion_usuario: 'Edito un departamento.',
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

  let [err,distrito]=await get(models.Distrito.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(distrito==null) return res.status(404).json({message: `Distritos nulos`})
  res.status(200).json(distrito)
}

async function deleteDistrito(req,res){
  let [err,distrito]=await get(models.Distrito.update({
    estado: 'I',

    accion_distrito: 'Elimino un distrito.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(distrito==null) return res.status(404).json({message: `Distritos nulos`})
  res.status(200).json(distrito)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDistritos,
  getDistrito,
  createDistrito,
  createAllDistrito,
  updateDistrito,
  deleteDistrito
}