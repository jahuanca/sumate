'use strict'
const express=require('express')
const router=express.Router()
const comercio=require('../controllers/comercio')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Comercio/:
 *  get:
 *    tags: [Comercio]
 *    description: Obtiene todos los Comercios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',comercio.getComercios)
router.get('/id/:id',comercio.getComercio)
router.get('/id_usuario/:id',comercio.getComercioUsuario)
router.post('/create',comercio.createComercio)
router.post('/createAllComercio',comercio.createAllComercio)
router.put('/update', comercio.updateComercio)
router.delete('/delete/:id', comercio.deleteComercio)

module.exports=router
/** 
* @swagger
*definitions:
*  Comercio:           
*    type: object
*    required:
*      - cod_Comercio
*    properties:
*      cod_Comercio:
*        type: integer
*      nombre_Comercio:
*        type: string
*      clave_Comercio:
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