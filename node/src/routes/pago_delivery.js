'use strict'
const express=require('express')
const router=express.Router()
const pago_delivery=require('../controllers/pago_delivery')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Pago_Delivery/:
 *  get:
 *    tags: [Pago_Delivery]
 *    description: Obtiene todos los Pago_Deliverys.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pago_delivery.getPago_Deliverys)
router.get('/id/:id',pago_delivery.getPago_Delivery)
router.post('/create',pago_delivery.createPago_Delivery)
router.post('/createAllPago_Delivery',pago_delivery.createAllPago_Delivery)
router.put('/update', pago_delivery.updatePago_Delivery)
router.delete('/delete/:id', pago_delivery.deletePago_Delivery)

module.exports=router
/** 
* @swagger
*definitions:
*  Pago_Delivery:           
*    type: object
*    required:
*      - cod_Pago_Delivery
*    properties:
*      cod_Pago_Delivery:
*        type: integer
*      nombre_Pago_Delivery:
*        type: string
*      clave_Pago_Delivery:
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