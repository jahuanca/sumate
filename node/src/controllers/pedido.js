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

async function getPedidosAtendiendo(req,res){
  let [err,pedidos]=await get(models.Pedido.findAll({
    where:{estado: 'A', id_estado_pedido: req.body},
    include: [{model: models.Cliente},
      {model: models.Forma_Pago},
      {model: models.Estado_Pedido},
      {model: models.Tipo_Envio},
      {model: models.Detalle_Pedido, include: [{model: models.Producto}]},
      {model: models.Tarifario, include: [{model: models.Zona},
        {model: models.Asociacion,include: [{all: true}]}]}
    ],
    order: [['createdAt','ASC']]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedidos==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedidos)
}

//crear dos traer el pedido del cliente y traer mis pedidos

async function getPedidosCliente(req,res){
  let [err,pedido]=await get(models.Pedido.findAll({
    where:{id_cliente: req.params.id_cliente, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function getMisPedidos(req,res){
  let [err,pedido]=await get(models.Pedido.findAll({
    where:{id_cliente: req.cliente, estado: 'A'},
    include: [{model: models.Detalle_Pedido, 
                include: [{model: models.Producto, include: [{model: models.Comercio, include: [{model: models.Tipo_Comercio}]}]}]}
      ,{model: models.Forma_Pago_Comercio},{model: models.Estado_Pedido}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
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
    const result = await models.sequelize.transaction(async (t) => {
      const pedido=await models.Pedido.create({
        id_cliente: req.cliente,
        id_tarifario: models.limpiar(req.body.id_tarifario),
        id_tipo_envio: req.body.id_tipo_envio,
        id_estado_pedido: req.body.id_estado_pedido,
        id_forma_pago_comercio: req.body.id_forma_pago_comercio,
        direccion: models.limpiar(req.body.direccion),
        referencia: models.limpiar(req.body.referencia),
        latitud: models.limpiar(req.body.longitud),
        longitud: models.limpiar(req.body.longitud),
        tarifa: req.body.tarifa,
        total: req.body.total,
        accion: 'I',
        usuario: req.user,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo pedido completo.',
      }, { transaction: t });
      
      for (let i = 0; i < req.body.Detalle_Pedidos.length; i++) {
        let d=req.body.Detalle_Pedidos[i];
        await models.Detalle_Pedido.create({
          id_pedido: pedido.id,
          id_producto: d.id_producto,
          cantidad: d.cantidad,
          precio: d.precio,
          subtotal: d.subtotal,
          peso: d.peso,

          accion: 'I',
          accion_usuario: 'Creo un nuevo detalle de pedido.',
          ip: req.ip,
          usuario: req.user
        }, { transaction: t });
      }
      return pedido;
    });
    res.status(200).json(result)
    
  
  } catch (error) {
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

async function cambiarEstadoPedido(req,res){

  let [err,pedido]=await get(models.Pedido.update({
    id_estado_pedido: (req.body.id_estado_pedido+1)
  },
  {
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true
  }  
  ))
  console.log(err)
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido[1][0].dataValues)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPedidos,
  getPedidosCliente,
  getMisPedidos,
  getPedido,
  getPedidosAtendiendo,
  createPedido,
  createAllPedido,
  updatePedido,
  deletePedido,
  cambiarEstadoPedido
}