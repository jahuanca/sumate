'use strict'
const express=require('express')
const router=express.Router()
const forma_pago=require('../controllers/forma_pago')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Forma_Pago/:
 *  get:
 *    tags: [Forma_Pago]
 *    description: Obtiene todos los Forma_Pagos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',forma_pago.getForma_Pagos)
router.get('/id/:id',forma_pago.getForma_Pago)
router.post('/create',forma_pago.createForma_Pago)
router.post('/createAllForma_Pago',forma_pago.createAllForma_Pago)
router.put('/update', forma_pago.updateForma_Pago)
router.delete('/delete/:id', forma_pago.deleteForma_Pago)

module.exports=router
/** 
* @swagger
*definitions:
*  Forma_Pago:           
*    type: object
*    required:
*      - cod_Forma_Pago
*    properties:
*      cod_Forma_Pago:
*        type: integer
*      nombre_Forma_Pago:
*        type: string
*      clave_Forma_Pago:
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