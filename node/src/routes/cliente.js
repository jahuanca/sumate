'use strict'
const express=require('express')
const router=express.Router()
const cliente=require('../controllers/cliente')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/clientes/',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "sum2020_" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
});
/**
 * @swagger
 * /Cliente/:
 *  get:
 *    tags: [Cliente]
 *    description: Obtiene todos los Clientes.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',cliente.getClientes)
router.get('/id/:id',cliente.getCliente)
router.get('/id_usuario/:id',cliente.getClienteUsuario)
router.post('/validate',auth.isAuthCliente,cliente.validateCelular)
router.post('/create',cliente.createCliente)
router.post('/createAllCliente',cliente.createAllCliente)
router.put('/update', cliente.updateCliente)
router.put('/updateMiCuenta', auth.isAuthCliente, multer({storage: storage}).single('files'),cliente.updateMiCuenta)
router.delete('/delete/:id', cliente.deleteCliente)

module.exports=router
/** 
* @swagger
*definitions:
*  Cliente:           
*    type: object
*    required:
*      - cod_Cliente
*    properties:
*      cod_Cliente:
*        type: integer
*      nombre_Cliente:
*        type: string
*      clave_Cliente:
*        type: string
*      esta_logueado:
*        type: boolean
*      fecha_registro:
*        type: date
*      responsable:
*        type: string
*      observaciones:
*        type: string
*      estado:
*        type: string
*      cambio_clave:
*        type: integer
*/