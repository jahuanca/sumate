'use strict'
const models=require('../models')

async function getCategorias(req,res){
  let [err,categorias]=await get(models.Categoria.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(categorias==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categorias)
}

async function getCategoria(req,res){
  let [err,categoria]=await get(models.Categoria.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria)
}

async function createCategoria(req,res){
  let [err,categoria]=await get(models.Categoria.create({
      id_tipo: req.body.id_tipo,
      username: req.body.username,
      password: req.body.password,
      
      accion: 'I',
      accion_categoria: 'Creo un nuevo categoria.',
      ip: req.ip,
      categoria: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria)
}

async function createAllCategoria(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Categoria.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        categoria: 0,
        ip: req.ip,
        accion_categoria: 'Creo un nuevo categoria categoria.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_categoria: 'Creo una nueva persona categoria.',
        accion: 'I',
        ip: req.ip,
        categoria: 0
      }, { transaction: t });
  
      await models.Categoria.create({
        id_persona: persona.id,
        id_categoria: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_categoria: 'Creo un nuevo categoria.',
        ip: req.ip,
        categoria: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateCategoria(req,res){
  let [err,categoria]=await get(models.Categoria.update({
    id_tipo: req.body.id_tipo,
    username: req.body.username,
    password: req.body.password,
    
    accion: 'U',
    accion_categoria: 'Edito un categoria.',
    ip: req.ip,
    categoria: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria)
}

async function deleteCategoria(req,res){
  let [err,categoria]=await get(models.Categoria.update({
    estado: 'I',

    accion_categoria: 'Elimino un categoria.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(categoria==null) return res.status(404).json({message: `Categorias nulos`})
  res.status(200).json(categoria)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCategorias,
  getCategoria,
  createCategoria,
  createAllCategoria,
  updateCategoria,
  deleteCategoria
}