'use strict'
const models=require('../models')

async function getPedidos(req,res){
  let [err,pedidos]=await get(models.Pedido.findAll({
    where:{estado: 'A'},
    limit: 30,
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedidos==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedidos)
}

async function getPedido(req,res){
  let [err,pedido]=await get(models.Pedido.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function createPedido(req,res){
  let p={
    id_pedido: req.body.id_pedido,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    
    accion: 'I',
    accion_usuario: 'Creo una nueva pedido.',
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
  let [err,pedido]=await get(models.Pedido.create(p))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function createAllPedido(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Pedido.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        pedido: 0,
        ip: req.ip,
        accion_pedido: 'Creo un nuevo pedido pedido.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_pedido: 'Creo una nueva persona pedido.',
        accion: 'I',
        ip: req.ip,
        pedido: 0
      }, { transaction: t });
  
      await models.Pedido.create({
        id_persona: persona.id,
        id_pedido: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_pedido: 'Creo un nuevo pedido.',
        ip: req.ip,
        pedido: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updatePedido(req,res){
  let p={
    id_departamento: req.body.departamento,
    nombre: req.body.nombre,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    
    accion: 'U',
    accion_usuario: 'Edito una pedido.',
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

  let [err,pedido]=await get(models.Pedido.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function deletePedido(req,res){
  let [err,pedido]=await get(models.Pedido.update({
    estado: 'I',

    accion_pedido: 'Elimino un pedido.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPedidos,
  getPedido,
  createPedido,
  createAllPedido,
  updatePedido,
  deletePedido
}