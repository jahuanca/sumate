const request=require('request')
const r=require('../services/request')
const Promise=require('bluebird')
const models=require('../models')
const fs=require('mz/fs')
const moment=require('moment')
const _=require('lodash')

module.exports={
  scriptDireccion,
  llenarSupervisores,
  llenarTipoUsuarios,
  llenarDepartamentos,
  llenarEstadoPedido,
  llenarFormaPago,
  llenarTipoEnvio,
  llenarUsuarios,
  llenarTipoComercio,
  llenarCategorias
}

function scriptDireccion() {
  fs.readFile('./scripts/ubigeo.sql','utf-16le', function(err, data){
    if(err) console.log(err)
    models.sequelize.query(data)
    //console.log(data)
  });
  //return fs.readFile('./scripts/ubigeo.sql',"utf8").then( sql =>  models.sequelize.query(sql)).catch(e => console.log(e))
}



async function llenarSupervisores(){
    let [err,supervisors]=await get(models.Supervisor.count({where: {estado: 'A'}}))
    if(supervisors==0){
        let [err2,usuario]=await get(models.Usuario.create({
            nombre_usuario: 'jhuanca',
          clave_usuario: '090412',
          fecha_registro: new Date(),
          responsable: 'Ningun responsable.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },{hooks: false}))
        if(err2) console.log(`${err2}`)
        let [err3,supervisors2]=await get(models.Supervisor.create({
            dni: '76208445',
            nombre: 'José Antonio',
            apellido: 'Huanca Ancajima',
            direccion: 'Enace IV Etapa MZ H2 Lt 11',
            telefono: '989743471',
            correo: 'joan.huanca19@gmail.com',
            foto: 'sin_imagen.jpg',
            id_usuario: usuario.id
        }, {hooks: false}))
        if(err3) console.log(`${err3}`)


        let [err4,usuario2]=await get(models.Usuario.create({
          nombre_usuario: 'jvalladares',
        clave_usuario: '090412',
        fecha_registro: new Date(),
        responsable: 'Ningun responsable.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{hooks: false}))
      if(err4) console.log(`${err4}`)
      let [err5,supervisors]=await get(models.Supervisor.create({
          dni: '00112233',
          nombre: 'Julio César',
          apellido: 'Valladares Saavedra',
          direccion: 'SatPiura Centro de Piura - Ubicacion',
          telefono: '919241411',
          correo: 'jvalladares@satp.gob.pe',
          foto: 'sin_imagen.jpg',
          id_usuario: usuario2.id
      }, {hooks: false}))
      if(err5) console.log(`${err5}`)
      console.log('Supervisor creado')

    }else{
        console.log('Ya tiene supervisores')
    }

}

async function llenarUsuarios(){
  let [err,usuario]=await get(models.Usuario.count({where: {estado: 'A'}}))
  if(usuario==0){
    let usuarios=[
      {
        id_tipo_usuario: 2,
        username: 'jose1@gmail.com',
        password: '1234'
      },
      {
        id_tipo_usuario: 3,
        username: 'jose2@gmail.com',
        password: '1234'
      },
      {
        id_tipo_usuario: 4,
        username: 'jose3@gmail.com',
        password: '1234'
      },
      {
        id_tipo_usuario: 5,
        username: 'jose4@gmail.com',
        password: '1234'
      },
    ]
      let [err2,usuario]=await get(models.Usuario.bulkCreate(usuarios,{individualHooks: true}))
      if(err2) console.log(`${err2}`)
      console.log('Usuarios creados')

  }else{
      console.log('Ya tiene usuarios')
  }

}

async function llenarTipoComercio(){
  let [err,tipo]=await get(models.Tipo_Comercio.count({where: {estado: 'A'}}))
  if(tipo==0){
    let tipos=[
      {
        nombre: 'Bebidas y Licores',
        descripcion: 'Venta de bebidas alcoholicas.',
        observacion: 'Ingresado por defecto'
      }
      
    ]
      let [err2,tipo]=await get(models.Tipo_Comercio.bulkCreate(tipos))
      if(err2) console.log(`${err2}`)
      console.log('Tipos de comercios creados')

  }else{
      console.log('Ya tiene tipos de comercios')
  }
}

async function llenarTipoUsuarios(){
  let [err,cantidad]=await get(models.Tipo_Usuario.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      let tipos=[
        {nombre: 'Cliente', descripcion: 'Acceso a todas las tablas y reporte del dia.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Delivery', descripcion: 'Acceso a todas las tablas y reporte del dia.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Comercio', descripcion: 'Acceso a todas las tablas y reporte del dia.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Administrador', descripcion: 'Acceso a todas las tablas y reporte del dia.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Super_Admin', descripcion: 'Acceso todas las tablas y funciones.',  observacion: 'Ingresado por defecto.'}
      ]
      
      let [err2,tipo]=await get(models.Tipo_Usuario.bulkCreate(tipos,{hooks: false}))
      if(err2) console.log(`${err2}`)
      console.log('Tipos de usuarios creados')
  }else{
      console.log('Ya tiene tipos de usuarios')
  }

}

async function llenarCategorias(){
  let [err,categoria]=await get(models.Categoria.count({where: {estado: 'A'}}))
  if(categoria==0){
    let categorias=[
      {
        nombre: 'Bebidas Alcoholicas',
        descripcion: 'Todo tipo de bebidas con alcohol',
        observacion: 'Ingresado por defecto'
      },
      {
        nombre: 'Abarrotes',
        descripcion: 'Todo tipo de abarrotes',
        observacion: 'Ingresado por defecto'
      }
      
    ]
      let [err2,categoria]=await get(models.Categoria.bulkCreate(categorias))
      if(err2) console.log(`${err2}`)
      console.log('Categorias de comercio creadas')

  }else{
      console.log('Ya tiene categorias')
  }

}

async function llenarEstadoPedido(){
  let [err,cantidad]=await get(models.Estado_Pedido.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      let estados=[
        {nombre: 'Realizado', descripcion: 'El pedido ha sido realizado.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Pagado', descripcion: 'Ya se ha pagado el pedido.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Despachado', descripcion: 'Su orden ya se encuentra por recoger.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Recogido', descripcion: 'El pedido ha sido recogido por su delivery.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Entregado', descripcion: 'El pedido ha sido entregado al cliente.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Entregado en buen estado', descripcion: 'El pedido ha sido entregado en buen estado.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Entregado en mal estado', descripcion: 'El pedido ha sido entregado en mal estado.', observacion: 'Ingresado por defecto.'}
      ]
      
      let [err2,tipo]=await get(models.Estado_Pedido.bulkCreate(estados,{hooks: false}))
      if(err2) console.log(`${err2}`)
      console.log('Estados del pedido creados')
  }else{
      console.log('Ya tiene estados del pedido')
  }

}

async function llenarFormaPago(){
  let [err,cantidad]=await get(models.Forma_Pago.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      let formas=[
        {nombre: 'Pago en tienda', descripcion: 'El pedido sera pagado al recogerlo el cliente.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Pago por yape', descripcion: 'El pedido se pagara a la cuenta yape.', observacion: 'Ingresado por defecto.'}
        //pago por pasarela de pago, pago al recibir post
      ]
      
      let [err2,tipo]=await get(models.Forma_Pago.bulkCreate(formas,{hooks: false}))
      if(err2) console.log(`${err2}`)
      console.log('Estados del pedido creados')
  }else{
      console.log('Ya tiene estados del pedido')
  }

}

async function llenarTipoEnvio(){
  let [err,cantidad]=await get(models.Forma_Pago.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      let formas=[
        {nombre: 'Recojo en tienda', descripcion: 'El cliente recogera el pedido.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Delivery', descripcion: 'El pedido sera enviado por delivery.', observacion: 'Ingresado por defecto.'}
      ]
      let [err2,tipo]=await get(models.Forma_Pago.bulkCreate(formas,{hooks: false}))
      if(err2) console.log(`${err2}`)
      console.log('Estados del pedido creados')
  }else{
      console.log('Ya tiene estados del pedido')
  }
}

async function llenarDepartamentos(){
  let [err,cantidad]=await get(models.Departamento.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      let [err2,tipo]=await get(models.Departamento.bulkCreate(departamentos,{hooks: false}))
      if(err2) console.log(`${err2}`)
      console.log('Departamentos creados')
      llenarProvincias();
  }else{
      console.log('Ya tiene departamentos.')
      llenarProvincias();
  }

}

async function llenarProvincias(){
  let [err,cantidad]=await get(models.Provincia.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      
      let [err2,tipo]=await get(models.Provincia.bulkCreate(provincias,{hooks: false}))
      if(err2) console.log(`${err2}`)
      console.log('Provincias creados')
      llenarDistritos();
  }else{
      console.log('Ya tiene Provincias.')
      llenarDistritos();
  }
}

async function llenarDistritos(){

  let [err,cantidad]=await get(models.Distrito.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      
      let [err2,d]=await get(models.Distrito.bulkCreate(distritos,{hooks: false}))
      if(err2){
        console.log(`${err2}`)
      }else{
        console.log('Distritos creados')
      }
  }else{
      console.log('Ya tiene distritos.')
  }
}


function updateOrCreate(valuesCreate, valuesUpdate, condition) {
  return models.Obligado
      .findOne({ where: condition })
      .then(function(obj) {
          if(obj){
            return obj.update(valuesUpdate,{
              hooks: false 
            });
          }
          return models.Obligado.create(valuesCreate,{
            hooks: false 
          });
      })
}



function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
  }

  const departamentos=[
    {nombre: 'Amazonas'},{nombre: 'Áncash'},{nombre: 'Apurímac'},{nombre: 'Arequipa'},
    {nombre: 'Ayacucho'},{nombre: 'Cajamarca'},{nombre: 'Cusco'},{nombre: 'Huancavelica'},
    {nombre: 'Huánuco'},{nombre: 'Ica'},{nombre: 'Junín'},{nombre: 'La Libertad'},
    {nombre: 'Lambayeque'},{nombre: 'Lima'},{nombre: 'Loreto'},{nombre: 'Madre de Dios'},
    {nombre: 'Moquegua'},{nombre: 'Pasco'},{nombre: 'Piura'},{nombre: 'Puno'},
    {nombre: 'San Martín'},{nombre: 'Tacna'},{nombre: 'Tumbes'},{nombre: 'Ucayali'}
  ]

  const provincias=[
    //provincias de piura
    {nombre: 'Ayabaca', id_departamento: 19},
    {nombre: 'Huancabamba', id_departamento: 19},
    {nombre: 'Morropon', id_departamento: 19},
    {nombre: 'Paita', id_departamento: 19},
    {nombre: 'Piura', id_departamento: 19},
    {nombre: 'Sechura', id_departamento: 19},
    {nombre: 'Sullana', id_departamento: 19},
    {nombre: 'Talara', id_departamento: 19}
  ]

  const distritos=[
    //ayabaca
    
      {nombre: 'Ayabaca', id_provincia: 1},
      {nombre: 'Frias', id_provincia: 1},
      {nombre: 'Jilili', id_provincia: 1},
      {nombre: 'Lagunas', id_provincia: 1},
      {nombre: 'Montero', id_provincia: 1},
      {nombre: 'Pacaipampa', id_provincia: 1},
      {nombre: 'Paimas', id_provincia: 1},
      {nombre: 'Sapillica', id_provincia: 1},
      {nombre: 'Sicchez', id_provincia: 1},
      {nombre: 'Suyo', id_provincia: 1}
    ,
    //huancacamba
    
      {nombre: 'Canchaque', id_provincia: 2},
      {nombre: 'El carmen de la frontera' , id_provincia: 2},
      {nombre: 'Huancabamba', id_provincia: 2},
      {nombre: 'Huarmaca', id_provincia: 2},
      {nombre: 'Lalaquiz', id_provincia: 2},
      {nombre: 'San Miguel de El Faique', id_provincia: 2},
      {nombre: 'Sóndor', id_provincia: 2},
      {nombre: 'Sondorillo', id_provincia: 2}
    ,
    //morropon
    
      {nombre: 'Buenos Aires', id_provincia: 3},
      {nombre: 'Chalaco', id_provincia: 3},
      {nombre: 'Chulucanas', id_provincia: 3},
      {nombre: 'La Matanza', id_provincia: 3},
      {nombre: 'Morropon', id_provincia: 3},
      {nombre: 'Salitral', id_provincia: 3},
      {nombre: 'San Juan de Bigote', id_provincia: 3},
      {nombre: 'Santa Catalina de Mossa', id_provincia: 3},
      {nombre: 'Santo Domingo', id_provincia: 3},
      {nombre: 'Yamango', id_provincia: 3}
    ,
    //paita
    
      {nombre: 'Amotape', id_provincia: 4},
      {nombre: 'Arenal', id_provincia: 4},
      {nombre: 'Colán', id_provincia: 4},
      {nombre: 'La Huaca', id_provincia: 4},
      {nombre: 'Paita', id_provincia: 4},
      {nombre: 'Tamarindo', id_provincia: 4},
      {nombre: 'Vichayal', id_provincia: 4}
    ,
    //piura
    
      {nombre: 'Castilla', id_provincia: 5},
      {nombre: 'Catacaos', id_provincia: 5},
      {nombre: 'Cura Mori', id_provincia: 5},
      {nombre: 'El Tallán', id_provincia: 5},
      {nombre: 'La arena', id_provincia: 5},
      {nombre: 'La unión', id_provincia: 5},
      {nombre: 'Las lomas', id_provincia: 5},
      {nombre: 'Piura', id_provincia: 5},
      {nombre: 'Tambogrande', id_provincia: 5},
      {nombre: 'Veintiseis de Octubre', id_provincia: 5}
    ,
    //sechura
    
      {nombre: 'Bellavista de la unión', id_provincia: 6},
      {nombre: 'Bernal', id_provincia: 6},
      {nombre: 'Cristo nos valga', id_provincia: 6},
      {nombre: 'Rinconada LLicuar', id_provincia: 6},
      {nombre: 'Sechura', id_provincia: 6},
      {nombre: 'Vice', id_provincia: 6}
    ,
    //sullana
    
      {nombre: 'Bellavista', id_provincia: 7},
      {nombre: 'Ignacio Escudero', id_provincia: 7},
      {nombre: 'Lancones', id_provincia: 7},
      {nombre: 'Marcavelica', id_provincia: 7},
      {nombre: 'Miguel Checa', id_provincia: 7},
      {nombre: 'Querecotillo', id_provincia: 7},
      {nombre: 'Salitral', id_provincia: 7},
      {nombre: 'Sullana', id_provincia: 7}
    ,
    //talara
    
      {nombre: 'El alto', id_provincia: 8},
      {nombre: 'La brea', id_provincia: 8},
      {nombre: 'Lobitos', id_provincia: 8},
      {nombre: 'Los Órganos', id_provincia: 8},
      {nombre: 'Máncora', id_provincia: 8},
      {nombre: 'Pariñas', id_provincia: 8}
  ]