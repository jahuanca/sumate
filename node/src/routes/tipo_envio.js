'use strict'
const express=require('express')
const router=express.Router()
const tipo_envio=require('../controllers/tipo_envio')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Tipo_Envio/:
 *  get:
 *    tags: [Tipo_Envio]
 *    description: Obtiene todos los Tipo_Envios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipo_envio.getTipo_Envios)
router.get('/id/:id',tipo_envio.getTipo_Envio)
router.post('/create',tipo_envio.createTipo_Envio)
router.post('/createAllTipo_Envio',tipo_envio.createAllTipo_Envio)
router.put('/update', tipo_envio.updateTipo_Envio)
router.delete('/delete/:id', tipo_envio.deleteTipo_Envio)

module.exports=router
/** 
* @swagger
*definitions:
*  Tipo_Envio:           
*    type: object
*    required:
*      - cod_Tipo_Envio
*    properties:
*      cod_Tipo_Envio:
*        type: integer
*      nombre_Tipo_Envio:
*        type: string
*      clave_Tipo_Envio:
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