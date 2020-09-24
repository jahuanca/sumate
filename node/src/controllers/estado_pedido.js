'use strict'
const models=require('../models')

async function getEstado_Pedidos(req,res){
  let [err,estado_pedidos]=await get(models.Estado_Pedido.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estado_pedidos==null) return res.status(404).json({message: `Estado_Pedidos nulos`})
  res.status(200).json(estado_pedidos)
}

async function getEstado_Pedido(req,res){
  let [err,estado_pedido]=await get(models.Estado_Pedido.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estado_pedido==null) return res.status(404).json({message: `Estado_Pedidos nulos`})
  res.status(200).json(estado_pedido)
}

async function createEstado_Pedido(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'I',
    accion_usuario: 'Creo un nuevo estado del pedido.',
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
  let [err,estado_pedido]=await get(models.Estado_Pedido.create(p))
  if(err) return res.status(500).json({message: `${err}`})
  if(estado_pedido==null) return res.status(404).json({message: `Estado_Pedidos nulos`})
  res.status(200).json(estado_pedido)
}

async function createAllEstado_Pedido(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Estado_Pedido.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        estado_pedido: 0,
        ip: req.ip,
        accion_estado_pedido: 'Creo un nuevo estado_pedido estado_pedido.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_estado_pedido: 'Creo una nueva persona estado_pedido.',
        accion: 'I',
        ip: req.ip,
        estado_pedido: 0
      }, { transaction: t });
  
      await models.Estado_Pedido.create({
        id_persona: persona.id,
        id_estado_pedido: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_estado_pedido: 'Creo un nuevo estado_pedido.',
        ip: req.ip,
        estado_pedido: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateEstado_Pedido(req,res){
  let p={
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    
    accion: 'U',
    accion_usuario: 'Edito un estado del pedido.',
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
  let [err,estado_pedido]=await get(models.Estado_Pedido.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(estado_pedido==null) return res.status(404).json({message: `Estado_Pedidos nulos`})
  res.status(200).json(estado_pedido[1][0].dataValues)
}

async function deleteEstado_Pedido(req,res){
  let [err,estado_pedido]=await get(models.Estado_Pedido.update({
    estado: 'I',

    accion_estado_pedido: 'Elimino un estado_pedido.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estado_pedido==null) return res.status(404).json({message: `Estado_Pedidos nulos`})
  res.status(200).json(estado_pedido)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEstado_Pedidos,
  getEstado_Pedido,
  createEstado_Pedido,
  createAllEstado_Pedido,
  updateEstado_Pedido,
  deleteEstado_Pedido
}