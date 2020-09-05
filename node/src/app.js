'use strict'
const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const fileSystem=require('file-system')
const app=express()
const config=require('./config')
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const http = require('http').createServer(app);
const cron = require('node-cron');
const fakeDatabase = [];
const webpush=require('web-push')
const io = require('socket.io')(http);
app.set('socketio', io);
app.set('socketio', io);
webpush.setVapidDetails('mailto:you@domain.com', config.publicKey, config.privateKey);

app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const whitelist = ['http://localhost:4200', 'http://localhost','http://jhuanca.com','http://sumatepiura.com','http://159.65.102.23']
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      }else{
        callback(new Error('Not allowed by CORS'))
      }
    }
}
//configuracion lectura models
const models = path.join(__dirname, './models');
fileSystem.readdirSync(models)
.filter(file => ~file.search(/^[^.].*\.js$/))
.forEach(file => require(path.join(models, file)));

//midlewares
app.use(cors({corsOptions}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

//valores por defecto

const swaggerOptions = {
swaggerDefinition: {
    info: {
    title: "Cliente API",
    description: "API Informacion",
    contact: {
        name: "Jhuanca"
    },
    servers: ["http://localhost:3000"]
    }
},
apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const actualizarDatos = require('./controllers/actualizacion_datos');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



//lee todos los archivos de routes y los ingresa
const fs = require('fs');
const basename = path.basename(__filename);

fs
  .readdirSync(path.join(__dirname,'routes'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let f=file.replace('.js','');
    app.use(`/${f}`, require(`./routes/${f}`)); 
  });



/** code io**/
const documents = {};
//

const email=require('./services/nodemailer')


io.on("connection", socket => {    
    socket.on('registrarse', (idUser)=>{
        socket.join(idUser);
        console.log('se registro el usuario '+idUser)
    })

    socket.on('enviar',(data)=>{
        console.log('se enviara un mensaje al usuario '+data.destino);
        socket.broadcast.to(data.destino).emit('nuevoPedido', data.origen);
    })

    socket.on('enviarDelivery',(data)=>{
      console.log('se enviara un mensaje al usuario '+data.destino);
      socket.broadcast.to(data.destino).emit('nuevoPedidoDelivery', data.origen);
    })

});


app.use(express.static('./public'));

http.listen(config.port,()=>{
    actualizarDatos.llenarTipoUsuarios();
    actualizarDatos.llenarDepartamentos();
    actualizarDatos.llenarTipoEnvio();
    actualizarDatos.llenarFormaPago();
    actualizarDatos.llenarEstadoPedido();
    actualizarDatos.llenarTipoComercio();
    actualizarDatos.llenarCategorias().then( ()=> actualizarDatos.llenarUsuarios());

    
    console.log(`API REST: corriendo en el puerto: ${config.port}`)
})

app.post('/subscription', (req, res) => {
    const subscription = req.body;
    console.log(req.body);
    fakeDatabase.push(subscription);
    return res.status(200).json(subscription)
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification:
       { 
        'body':"EL cliente tal tal hizo un pedido.",
        'title':"Pedido Ingresado",
        'vibrate':[300,100,400,100,400,100,400],
        'icon':"ICON_URL",
        'tag':"push demo",
        'requireInteraction':true,
        'renotify':true,
        'data':
          { url:"https://google.com"}
       }
    };

  const promises = [];
  
  fakeDatabase.forEach(subscription => { 
    promises.push(webpush.sendNotification(subscription, 
    JSON.stringify(notificationPayload)));
  });
  Promise.all(promises).then(() => res.sendStatus(200));
});

cron.schedule('59 23 * * *', () => {
    console.log('Tarea programada')
});