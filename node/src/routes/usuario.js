'use strict'
const express=require('express')
const router=express.Router()
const usuario=require('../controllers/usuario')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Usuario/:
 *  get:
 *    tags: [Usuario]
 *    description: Obtiene todos los Usuarios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',usuario.getUsuarios)
router.get('/id/:id',usuario.getUsuario)
router.post('/create',usuario.createUsuario)
router.post('/createAllUsuario',usuario.createAllUsuario)
router.post('/validate',auth.isAuthCliente,usuario.validateCorreo)
router.put('/update', usuario.updateUsuario)
router.put('/updatePassword', auth.isAuthUser,usuario.updatePassword)
router.put('/updateCorreo', auth.isAuthUser ,usuario.updateCorreo)
router.delete('/delete/:id', usuario.deleteUsuario)

module.exports=router
/** 
* @swagger
*definitions:
*  Usuario:           
*    type: object
*    required:
*      - cod_Usuario
*    properties:
*      cod_Usuario:
*        type: integer
*      nombre_Usuario:
*        type: string
*      clave_Usuario:
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