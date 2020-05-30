'use strict'
const express=require('express')
const router=express.Router()
const detalle_pago_delivery=require('../controllers/detalle_pago_delivery')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Detalle_Pago_Delivery/:
 *  get:
 *    tags: [Detalle_Pago_Delivery]
 *    description: Obtiene todos los Detalle_Pago_Deliverys.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',detalle_pago_delivery.getDetalle_Pago_Deliverys)
router.get('/id/:id',detalle_pago_delivery.getDetalle_Pago_Delivery)
router.post('/create',detalle_pago_delivery.createDetalle_Pago_Delivery)
router.post('/createAllDetalle_Pago_Delivery',detalle_pago_delivery.createAllDetalle_Pago_Delivery)
router.put('/update', detalle_pago_delivery.updateDetalle_Pago_Delivery)
router.delete('/delete/:id', detalle_pago_delivery.deleteDetalle_Pago_Delivery)

module.exports=router
/** 
* @swagger
*definitions:
*  Detalle_Pago_Delivery:           
*    type: object
*    required:
*      - cod_Detalle_Pago_Delivery
*    properties:
*      cod_Detalle_Pago_Delivery:
*        type: integer
*      nombre_Detalle_Pago_Delivery:
*        type: string
*      clave_Detalle_Pago_Delivery:
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