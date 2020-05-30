'use strict'
const express=require('express')
const router=express.Router()
const producto=require('../controllers/producto')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Producto/:
 *  get:
 *    tags: [Producto]
 *    description: Obtiene todos los Productos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',producto.getProductos)
router.get('/id/:id',producto.getProducto)
router.post('/create',producto.createProducto)
router.post('/createAllProducto',producto.createAllProducto)
router.put('/update', producto.updateProducto)
router.delete('/delete/:id', producto.deleteProducto)

module.exports=router
/** 
* @swagger
*definitions:
*  Producto:           
*    type: object
*    required:
*      - cod_Producto
*    properties:
*      cod_Producto:
*        type: integer
*      nombre_Producto:
*        type: string
*      clave_Producto:
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