'use strict'
const models=require('../models')

async function getForma_Pago_Comercios(req,res){
  let [err,forma_pago_comercios]=await get(models.Forma_Pago_Comercio.findAll({
    where:{estado: 'A'},
    include: [{model: models.Forma_Pago}, {model: models.Comercio}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercios==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercios)
}

async function getMisFormasPagoComercio(req,res){
  let [err,forma_pago_comercios]=await get(models.Forma_Pago_Comercio.findAll({
    where:{estado: 'A', id_comercio: req.comercio},
    include: [{model: models.Forma_Pago}, {model: models.Comercio}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercios==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercios)
}

async function postForma_Pago_ComerciosSome(req,res){
  let [err,forma_pago_comercios]=await get(models.Forma_Pago_Comercio.findAll({
    where:{estado: 'A', id_forma_pago: req.body.id_forma_pago, id_comercio: req.body.id_comercios},
    include: [{model: models.Forma_Pago}, {model: models.Comercio}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercios==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercios)
}

async function getForma_Pago_Comercio(req,res){
  let [err,forma_pago_comercio]=await get(models.Forma_Pago_Comercio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercio==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercio)
}

async function createForma_Pago_Comercio(req,res){
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
  let [err,forma_pago_comercio]=await get(models.Forma_Pago_Comercio.create(p))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercio==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercio)
}

async function createAllForma_Pago_Comercio(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Forma_Pago_Comercio.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        forma_pago_comercio: 0,
        ip: req.ip,
        accion_forma_pago_comercio: 'Creo un nuevo forma_pago_comercio forma_pago_comercio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_forma_pago_comercio: 'Creo una nueva persona forma_pago_comercio.',
        accion: 'I',
        ip: req.ip,
        forma_pago_comercio: 0
      }, { transaction: t });
  
      await models.Forma_Pago_Comercio.create({
        id_persona: persona.id,
        id_forma_pago_comercio: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_forma_pago_comercio: 'Creo un nuevo forma_pago_comercio.',
        ip: req.ip,
        forma_pago_comercio: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateForma_Pago_Comercio(req,res){
  let p={
    cuenta: req.body.cuenta,
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

  let [err,forma_pago_comercio]=await get(models.Forma_Pago_Comercio.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercio==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercio[1][0].dataValues)
}

async function deleteForma_Pago_Comercio(req,res){
  let [err,forma_pago_comercio]=await get(models.Forma_Pago_Comercio.update({
    estado: 'I',

    accion_forma_pago_comercio: 'Elimino un forma_pago_comercio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(forma_pago_comercio==null) return res.status(404).json({message: `Forma_Pago_Comercios nulos`})
  res.status(200).json(forma_pago_comercio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getForma_Pago_Comercios,
  getMisFormasPagoComercio,
  postForma_Pago_ComerciosSome,
  getForma_Pago_Comercio,
  createForma_Pago_Comercio,
  createAllForma_Pago_Comercio,
  updateForma_Pago_Comercio,
  deleteForma_Pago_Comercio
}