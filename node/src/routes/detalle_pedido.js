'use strict'
const express=require('express')
const router=express.Router()
const detalle_pedido=require('../controllers/detalle_pedido')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Detalle_Pedido/:
 *  get:
 *    tags: [Detalle_Pedido]
 *    description: Obtiene todos los Detalle_Pedidos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',detalle_pedido.getDetalle_Pedidos)
router.get('/id/:id',detalle_pedido.getDetalle_Pedido)
router.get('/id_pedido/:id',detalle_pedido.getDetalle_PedidoPedido)
router.post('/create',detalle_pedido.createDetalle_Pedido)
router.post('/createAllDetalle_Pedido',detalle_pedido.createAllDetalle_Pedido)
router.put('/update', detalle_pedido.updateDetalle_Pedido)
router.delete('/delete/:id', detalle_pedido.deleteDetalle_Pedido)

module.exports=router
/** 
* @swagger
*definitions:
*  Detalle_Pedido:           
*    type: object
*    required:
*      - cod_Detalle_Pedido
*    properties:
*      cod_Detalle_Pedido:
*        type: integer
*      nombre_Detalle_Pedido:
*        type: string
*      clave_Detalle_Pedido:
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