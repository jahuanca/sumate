'use strict'
const express=require('express')
const router=express.Router()
const tipo_usuario=require('../controllers/tipo_usuario')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Tipo_Usuario/:
 *  get:
 *    tags: [Tipo_Usuario]
 *    description: Obtiene todos los Tipo_Usuarios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipo_usuario.getTipo_Usuarios)
router.get('/id/:id',tipo_usuario.getTipo_Usuario)
router.post('/create',tipo_usuario.createTipo_Usuario)
router.post('/createAllTipo_Usuario',tipo_usuario.createAllTipo_Usuario)
router.put('/update', tipo_usuario.updateTipo_Usuario)
router.delete('/delete/:id', tipo_usuario.deleteTipo_Usuario)

module.exports=router
/** 
* @swagger
*definitions:
*  Tipo_Usuario:           
*    type: object
*    required:
*      - cod_Tipo_Usuario
*    properties:
*      cod_Tipo_Usuario:
*        type: integer
*      nombre_Tipo_Usuario:
*        type: string
*      clave_Tipo_Usuario:
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