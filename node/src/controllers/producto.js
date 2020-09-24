'use strict'
const models=require('../models')

async function getProductos(req,res){
  let [err,productos]=await get(models.Producto.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(productos==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(productos)
}

async function getProducto(req,res){
  let [err,producto]=await get(models.Producto.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: ['Categoria']
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function getMisProductos(req,res){
  let [err,producto]=await get(models.Producto.findAll({
    where:{id_comercio: req.comercio, estado: 'A'},
    include: ['Categoria']
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function getProductosCategoria(req,res){
  let [err,producto]=await get(models.Producto.findAll({
    where:{id_categoria: req.params.id, estado: 'A'},
    include: ['Categoria']
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function getProductosRandom(req,res){
  let [err,producto]=await get(models.Producto.findAll({
    where:{estado: 'A'},
    order: models.Sequelize.literal('random()'), limit: Number(req.params.cantidad) ,
    include: ['Categoria', {model: models.Comercio}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function obtenerProductosSome(req,res){
  let [err,producto]=await get(models.Producto.findAll({
    where:{id: req.body, estado: 'A'},
    include: ['Categoria', {model: models.Comercio}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function getProductosComercio(req,res){
  let [err,producto]=await get(models.Producto.findAll({
    where:{id_comercio: req.params.id, estado: 'A'},
    include: ['Categoria']
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function getProductosBuscados(req,res){
  let [err,producto]=await get(models.Producto.findAll({
    where:{
    estado: 'A',
    '$col': models.sequelize.where(models.sequelize.fn('lower', models.sequelize.col('Producto.nombre')), {
      [models.Sequelize.Op.like]: `%${req.params.texto}%`
    })
    //nombre: {[models.Sequelize.Op.ilike]: `%${req.params.texto}%`}
    },
    include: ['Categoria']
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}



async function createProducto(req,res){
  console.log(req.body)
  let p={
    id_categoria: req.body.id_categoria,
    id_comercio: req.comercio,
    nombre: req.body.nombre,
    presentacion: req.body.presentacion,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    cantidad: req.body.cantidad,
    peso: req.body.peso,
    precio: req.body.precio,
    precio_premium: models.limpiar(req.body.precio_premium),
    precio_cash: models.limpiar(req.body.precio_cash),
    tiempo_preparacion: req.body.tiempo_preparacion,
    accion: 'I',
    accion_producto: 'Creo un nuevo producto.',
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
  
  let [err,producto]=await get(models.Producto.create(p))
  console.log(err);
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function createAllProducto(req,res){
  console.log(req.body)
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Producto.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo producto producto.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_producto: 'Creo una nueva persona producto.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Producto.create({
        id_persona: persona.id,
        id_producto: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo producto.',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateProducto(req,res){
  let p={
    id_categoria: req.body.id_categoria,
    id_comercio: req.body.id_comercio,
    nombre: req.body.nombre,
    presentacion: req.body.presentacion,
    descripcion: models.limpiar(req.body.descripcion),
    observacion: models.limpiar(req.body.observacion),
    cantidad: req.body.cantidad,
    peso: req.body.peso,
    precio: req.body.precio,
    precio_premium: models.limpiar(req.body.precio_premium),
    precio_cash: models.limpiar(req.body.precio_cash),
    tiempo_preparacion: req.body.tiempo_preparacion,
    
    accion: 'U',
    accion_usuario: 'Edito un producto.',
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

  let [err,producto]=await get(models.Producto.update(p,
    {
      where:{
        id: req.body.id, estado:'A'
      },
      individualHooks: true
    }  
  ))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto[1][0].dataValues)
}

async function deleteProducto(req,res){
  let [err,producto]=await get(models.Producto.update({
    estado: 'I',

    accion_usuario: 'Elimino un producto.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getProductos,
  getProductosRandom,
  getMisProductos,
  getProductosCategoria,
  getProductosComercio,
  getProductosBuscados,
  getProducto,
  obtenerProductosSome,
  createProducto,
  createAllProducto,
  updateProducto,
  deleteProducto
}