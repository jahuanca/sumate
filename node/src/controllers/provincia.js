'use strict'
const models=require('../models')

async function getProvincias(req,res){
  let [err,provincias]=await get(models.Provincia.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(provincias==null) return res.status(404).json({message: `Provincias nulos`})
  res.status(200).json(provincias)
}

async function getProvincia(req,res){
  let [err,provincia]=await get(models.Provincia.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(provincia==null) return res.status(404).json({message: `Provincias nulos`})
  res.status(200).json(provincia)
}

async function createProvincia(req,res){
  let p={
    id_provincia: req.body.id_provincia,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    
    accion: 'I',
    accion_usuario: 'Creo una nueva provincia.',
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
  let [err,provincia]=await get(models.Provincia.create(p))
  if(err) return res.status(500).json({message: `${err}`})
  if(provincia==null) return res.status(404).json({message: `Provincias nulos`})
  res.status(200).json(provincia)
}

async function createAllProvincia(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Provincia.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        provincia: 0,
        ip: req.ip,
        accion_provincia: 'Creo un nuevo provincia provincia.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_provincia: 'Creo una nueva persona provincia.',
        accion: 'I',
        ip: req.ip,
        provincia: 0
      }, { transaction: t });
  
      await models.Provincia.create({
        id_persona: persona.id,
        id_provincia: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_provincia: 'Creo un nuevo provincia.',
        ip: req.ip,
        provincia: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateProvincia(req,res){
  let p={
    id_departamento: req.body.departamento,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    
    accion: 'U',
    accion_usuario: 'Edito una provincia.',
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

  let [err,provincia]=await get(models.Provincia.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(provincia==null) return res.status(404).json({message: `Provincias nulos`})
  res.status(200).json(provincia)
}

async function deleteProvincia(req,res){
  let [err,provincia]=await get(models.Provincia.update({
    estado: 'I',

    accion_provincia: 'Elimino un provincia.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(provincia==null) return res.status(404).json({message: `Provincias nulos`})
  res.status(200).json(provincia)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getProvincias,
  getProvincia,
  createProvincia,
  createAllProvincia,
  updateProvincia,
  deleteProvincia
}