'use strict'
const express=require('express')
const router=express.Router()
const asociacion=require('../controllers/asociacion')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Asociacion/:
 *  get:
 *    tags: [Asociacion]
 *    description: Obtiene todos los Asociacions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',asociacion.getAsociacions)
router.get('/id/:id',asociacion.getAsociacion)
router.post('/create',asociacion.createAsociacion)
router.put('/update', asociacion.updateAsociacion)
router.delete('/delete/:id', asociacion.deleteAsociacion)

module.exports=router
/** 
* @swagger
*definitions:
*  Asociacion:           
*    type: object
*    required:
*      - cod_Asociacion
*    properties:
*      cod_Asociacion:
*        type: integer
*      nombre_Asociacion:
*        type: string
*      clave_Asociacion:
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