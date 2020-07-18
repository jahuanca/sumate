'use strict'
const express=require('express')
const router=express.Router()
const detalle_combo=require('../controllers/detalle_combo')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Detalle_Combo/:
 *  get:
 *    tags: [Detalle_Combo]
 *    description: Obtiene todos los Detalle_Combos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',detalle_combo.getDetalle_Combos)
router.get('/id/:id',detalle_combo.getDetalle_Combo)
router.get('/id_pedido/:id',detalle_combo.getDetalle_ComboPedido)
router.post('/create',detalle_combo.createDetalle_Combo)
router.post('/createAllDetalle_Combo',detalle_combo.createAllDetalle_Combo)
router.put('/update', detalle_combo.updateDetalle_Combo)
router.delete('/delete/:id', detalle_combo.deleteDetalle_Combo)

module.exports=router
/** 
* @swagger
*definitions:
*  Detalle_Combo:           
*    type: object
*    required:
*      - cod_Detalle_Combo
*    properties:
*      cod_Detalle_Combo:
*        type: integer
*      nombre_Detalle_Combo:
*        type: string
*      clave_Detalle_Combo:
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