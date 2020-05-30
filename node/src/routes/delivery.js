'use strict'
const express=require('express')
const router=express.Router()
const delivery=require('../controllers/delivery')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Delivery/:
 *  get:
 *    tags: [Delivery]
 *    description: Obtiene todos los Deliverys.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',delivery.getDeliverys)
router.get('/id/:id',delivery.getDelivery)
router.post('/create',delivery.createDelivery)
router.post('/createAllDelivery',delivery.createAllDelivery)
router.put('/update', delivery.updateDelivery)
router.delete('/delete/:id', delivery.deleteDelivery)

module.exports=router
/** 
* @swagger
*definitions:
*  Delivery:           
*    type: object
*    required:
*      - cod_Delivery
*    properties:
*      cod_Delivery:
*        type: integer
*      nombre_Delivery:
*        type: string
*      clave_Delivery:
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