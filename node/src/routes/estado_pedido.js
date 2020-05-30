'use strict'
const express=require('express')
const router=express.Router()
const estado_pedido=require('../controllers/estado_pedido')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Estado_Pedido/:
 *  get:
 *    tags: [Estado_Pedido]
 *    description: Obtiene todos los Estado_Pedidos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',estado_pedido.getEstado_Pedidos)
router.get('/id/:id',estado_pedido.getEstado_Pedido)
router.post('/create',estado_pedido.createEstado_Pedido)
router.post('/createAllEstado_Pedido',estado_pedido.createAllEstado_Pedido)
router.put('/update', estado_pedido.updateEstado_Pedido)
router.delete('/delete/:id', estado_pedido.deleteEstado_Pedido)

module.exports=router
/** 
* @swagger
*definitions:
*  Estado_Pedido:           
*    type: object
*    required:
*      - cod_Estado_Pedido
*    properties:
*      cod_Estado_Pedido:
*        type: integer
*      nombre_Estado_Pedido:
*        type: string
*      clave_Estado_Pedido:
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