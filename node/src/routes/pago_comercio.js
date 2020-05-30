'use strict'
const express=require('express')
const router=express.Router()
const pago_comercio=require('../controllers/pago_comercio')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Pago_Comercio/:
 *  get:
 *    tags: [Pago_Comercio]
 *    description: Obtiene todos los Pago_Comercios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pago_comercio.getPago_Comercios)
router.get('/id/:id',pago_comercio.getPago_Comercio)
router.post('/create',pago_comercio.createPago_Comercio)
router.post('/createAllPago_Comercio',pago_comercio.createAllPago_Comercio)
router.put('/update', pago_comercio.updatePago_Comercio)
router.delete('/delete/:id', pago_comercio.deletePago_Comercio)

module.exports=router
/** 
* @swagger
*definitions:
*  Pago_Comercio:           
*    type: object
*    required:
*      - cod_Pago_Comercio
*    properties:
*      cod_Pago_Comercio:
*        type: integer
*      nombre_Pago_Comercio:
*        type: string
*      clave_Pago_Comercio:
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