'use strict'
const express=require('express')
const router=express.Router()
const tipo_comercio=require('../controllers/tipo_comercio')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Tipo_Comercio/:
 *  get:
 *    tags: [Tipo_Comercio]
 *    description: Obtiene todos los Tipo_Comercios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipo_comercio.getTipo_Comercios)
router.get('/id/:id',tipo_comercio.getTipo_Comercio)
router.post('/create',tipo_comercio.createTipo_Comercio)
router.post('/createAllTipo_Comercio',tipo_comercio.createAllTipo_Comercio)
router.put('/update', tipo_comercio.updateTipo_Comercio)
router.delete('/delete/:id', tipo_comercio.deleteTipo_Comercio)

module.exports=router
/** 
* @swagger
*definitions:
*  Tipo_Comercio:           
*    type: object
*    required:
*      - cod_Tipo_Comercio
*    properties:
*      cod_Tipo_Comercio:
*        type: integer
*      nombre_Tipo_Comercio:
*        type: string
*      clave_Tipo_Comercio:
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