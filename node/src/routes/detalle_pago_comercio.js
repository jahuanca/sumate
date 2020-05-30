'use strict'
const express=require('express')
const router=express.Router()
const detalle_pago_comercio=require('../controllers/detalle_pago_comercio')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Detalle_Pago_Comercio/:
 *  get:
 *    tags: [Detalle_Pago_Comercio]
 *    description: Obtiene todos los Detalle_Pago_Comercios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',detalle_pago_comercio.getDetalle_Pago_Comercios)
router.get('/id/:id',detalle_pago_comercio.getDetalle_Pago_Comercio)
router.post('/create',detalle_pago_comercio.createDetalle_Pago_Comercio)
router.post('/createAllDetalle_Pago_Comercio',detalle_pago_comercio.createAllDetalle_Pago_Comercio)
router.put('/update', detalle_pago_comercio.updateDetalle_Pago_Comercio)
router.delete('/delete/:id', detalle_pago_comercio.deleteDetalle_Pago_Comercio)

module.exports=router
/** 
* @swagger
*definitions:
*  Detalle_Pago_Comercio:           
*    type: object
*    required:
*      - cod_Detalle_Pago_Comercio
*    properties:
*      cod_Detalle_Pago_Comercio:
*        type: integer
*      nombre_Detalle_Pago_Comercio:
*        type: string
*      clave_Detalle_Pago_Comercio:
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