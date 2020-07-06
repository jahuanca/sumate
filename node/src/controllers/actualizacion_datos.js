const request=require('request')
const r=require('../services/request')
const Promise=require('bluebird')
const models=require('../models')
const fs=require('mz/fs')
const moment=require('moment')
const _=require('lodash')

module.exports={
  scriptDireccion,
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
        {nombre: 'Realizado', descripcion: 'El pedido ha sido realizado.',
         observacion: 'Ingresado por defecto.', imagenes: 'sum2020_f3cc047ac34d29f1f242d34255d29f7b.png'},
        {nombre: 'Pagado', descripcion: 'Ya se ha pagado el pedido.', 
        observacion: 'Ingresado por defecto.', imagenes: 'sum2020_90c44f87769eb93590ed2a093758938a.png'},
        {nombre: 'Despachado', descripcion: 'Su orden ya se encuentra por recoger.', 
        observacion: 'Ingresado por defecto.', imagenes: 'sum2020_6e0f0e617a5aa3f72f2e6a661f7bace1.png'},
        {nombre: 'Recogido', descripcion: 'El pedido ha sido recogido por su delivery.', 
        observacion: 'Ingresado por defecto.', imagenes: 'sum2020_6dbe98407faf1726e1a4367d735889dc.png'},
        {nombre: 'Entregado', descripcion: 'El pedido ha sido entregado al cliente.', 
        observacion: 'Ingresado por defecto.', imagenes: 'sum2020_f1a6256cea8525759308d1666c07ef5d.png'},
        {nombre: 'Entregado en buen estado', descripcion: 'El pedido ha sido entregado en buen estado.', 
        observacion: 'Ingresado por defecto.', imagenes: 'sum2020_0736639e341215cf6067c391ac9b7cb1.png'},
        {nombre: 'Entregado en mal estado', descripcion: 'El pedido ha sido entregado en mal estado.', 
        observacion: 'Ingresado por defecto.', imagenes: 'sum2020_284e270f36c9732e491cb8792012e536.png'}
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
        {nombre: 'Pago en tienda', descripcion: 'El pedido sera pagado al recogerlo el cliente.', observacion: 'Ingresado por defecto.', estado: 'I'},
        {nombre: 'Pago por plataforma', descripcion: 'Hara uso de mercado pago asignandole un 4%', observacion: 'Ingresado por defecto.'},
        {nombre: 'Deposito a cuenta', descripcion: 'Deposita a este numero de cuenta ...', observacion: 'Ingresado por defecto.'},
        {nombre: 'Pago por yape', descripcion: 'Yapee a este numero ...', observacion: 'Ingresado por defecto.'}
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
  let [err,cantidad]=await get(models.Tipo_Envio.count({where: {estado: 'A'}}))
  if(err) console.log(`${err}`)
  if(cantidad==0){
      let formas=[
        {nombre: 'Recojo en tienda', descripcion: 'El cliente recogera el pedido.', observacion: 'Ingresado por defecto.'},
        {nombre: 'Delivery', descripcion: 'El pedido sera enviado por delivery.', observacion: 'Ingresado por defecto.'}
      ]
      let [err2,tipo]=await get(models.Tipo_Envio.bulkCreate(formas,{hooks: false}))
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
    {nombre: 'Amazonas', latitud: -3.7500000, longitud: -64.5000000},
    {nombre: 'Áncash', latitud: 	-9.5277901, longitud: -77.5277786},
    {nombre: 'Apurímac', latitud: -14.0000000,longitud: -73.0000000},
    {nombre: 'Arequipa', latitud: -16.3988895, longitud: -71.5350037},
    {nombre: 'Ayacucho', latitud: -13.1587801, longitud: -74.2232132},
    {nombre: 'Cajamarca', latitud: -7.1637802, longitud: 	-78.500267},
    {nombre: 'Cusco', latitud: -13.5226402, longitud: -71.9673386},
    {nombre: 'Huancavelica', latitud: -12.7826099, longitud: -74.9726562},
    {nombre: 'Huánuco', latitud: -9.929444, longitud: -76.239722},
    {nombre: 'Ica', latitud: -14.06777,longitud: -75.7286072},
    {nombre: 'Junín', latitud: -11.1888100, longitud: -76.0119200},
    {nombre: 'La Libertad', latitud: -11.9433200,longitud: -77.0374900},
    {nombre: 'Lambayeque', latitud: -6.7011099,longitud: -79.9061127},
    {nombre: 'Lima', latitud: -12.0431805, longitud: -77.0282364},
    {nombre: 'Loreto', latitud: -3.74912,longitud: -73.25383},
    {nombre: 'Madre de Dios', latitud: -12.5933104,longitud: -69.1891327},
    {nombre: 'Moquegua', latitud: -17.1983204,longitud: -70.9356689},
    {nombre: 'Pasco', latitud: -10.6674805 ,longitud: -76.2566833},
    {nombre: 'Piura', latitud: -5.19449, longitud: -80.6328201},
    {nombre: 'Puno', latitud: -15.07,longitud: -70.12},
    {nombre: 'San Martín', latitud: -12.0218900,longitud: -76.6855300},
    {nombre: 'Tacna', latitud: -18.0146503,longitud: -70.2536163},
    {nombre: 'Tumbes', latitud: -3.5536600,longitud: -80.4161700},
    {nombre: 'Ucayali', latitud: -8.3791504,longitud: -74.5538712}
  ]

  const provincias=[
    //provincias de piura
    {nombre: 'Ayabaca', id_departamento: 19, latitud: -4.637, longitud: -79.724},
    {nombre: 'Huancabamba', id_departamento: 19, latitud: -5.239572, longitud:-79.449642},
    {nombre: 'Morropon', id_departamento: 19, latitud: -5.097522, longitud: -80.162103},
    {nombre: 'Paita', id_departamento: 19, latitud: -5.092778, longitud: -81.101944},
    {nombre: 'Piura', id_departamento: 19, latitud: -5.193333, longitud: -80.633056},
    {nombre: 'Sechura', id_departamento: 19, latitud: -5.56, longitud: -80.82},
    {nombre: 'Sullana', id_departamento: 19, latitud: -4.89, longitud: -80.68},
    {nombre: 'Talara', id_departamento: 19, latitud: -4.579722, longitud: -81.271944}
  ]

  const distritos=[
    //ayabaca
    /*
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
    ,*/
    //piura
    
      {nombre: 'Castilla', id_provincia: 5, latitud: -5.12963,longitud: -80.51445},
      {nombre: 'Catacaos', id_provincia: 5, latitud: -5.49037,longitud: -80.33467},
      {nombre: 'Cura Mori', id_provincia: 5, latitud: -5.35618,longitud: -80.5926},
      {nombre: 'El Tallán', id_provincia: 5, latitud: -5.43897,longitud: -80.61364},
      {nombre: 'La arena', id_provincia: 5, latitud: -5.31095,longitud: -80.76308},
      {nombre: 'La unión', id_provincia: 5, latitud: -5.32219,longitud: -80.8637},
      {nombre: 'Las lomas', id_provincia: 5, latitud: -4.68906,longitud: -80.21446},
      {nombre: 'Piura', id_provincia: 5, latitud: -5.195833,longitud: -80.633333},
      {nombre: 'Tambogrande', id_provincia: 5, latitud: -4.91806,longitud: -80.33307},
      {nombre: 'Veintiseis de Octubre', id_provincia: 5, latitud: -5.1769,longitud: -80.68095}
    ,
    //sechura
    /*
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
      */
  ]