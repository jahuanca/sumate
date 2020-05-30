'use strict'
const express=require('express')
const router=express.Router()
const categoria=require('../controllers/categoria')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Categoria/:
 *  get:
 *    tags: [Categoria]
 *    description: Obtiene todos los Categorias.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',categoria.getCategorias)
router.get('/id/:id',categoria.getCategoria)
router.post('/create',categoria.createCategoria)
router.post('/createAllCategoria',categoria.createAllCategoria)
router.put('/update', categoria.updateCategoria)
router.delete('/delete/:id', categoria.deleteCategoria)

module.exports=router
/** 
* @swagger
*definitions:
*  Categoria:           
*    type: object
*    required:
*      - cod_Categoria
*    properties:
*      cod_Categoria:
*        type: integer
*      nombre_Categoria:
*        type: string
*      clave_Categoria:
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