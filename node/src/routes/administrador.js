'use strict'
const express=require('express')
const router=express.Router()
const administrador=require('../controllers/administrador')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Administrador/:
 *  get:
 *    tags: [Administrador]
 *    description: Obtiene todos los Administradors.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',administrador.getAdministradors)
router.get('/id/:id',administrador.getAdministrador)
router.get('/id_usuario/:id',administrador.getAdministradorUsuario)
router.post('/validate',auth.isAuthCliente,administrador.validateCelular)
router.post('/create',administrador.createAdministrador)
router.post('/createAllAdministrador',administrador.createAllAdministrador)
router.put('/update', administrador.updateAdministrador)
router.put('/updateMiCuenta', auth.isAuthCliente, administrador.updateMiCuenta)
router.delete('/delete/:id', administrador.deleteAdministrador)

module.exports=router
/** 
* @swagger
*definitions:
*  Administrador:           
*    type: object
*    required:
*      - cod_Administrador
*    properties:
*      cod_Administrador:
*        type: integer
*      nombre_Administrador:
*        type: string
*      clave_Administrador:
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