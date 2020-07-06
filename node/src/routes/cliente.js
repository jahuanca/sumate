'use strict'
const express=require('express')
const router=express.Router()
const cliente=require('../controllers/cliente')
const auth=require('../middlewares/auth')

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
router.put('/updateMiCuenta', auth.isAuthCliente, cliente.updateMiCuenta)
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