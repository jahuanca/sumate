'use strict'
const express=require('express')
const router=express.Router()
const provincia=require('../controllers/provincia')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Provincia/:
 *  get:
 *    tags: [Provincia]
 *    description: Obtiene todos los Provincias.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',provincia.getProvincias)
router.get('/id/:id',provincia.getProvincia)
router.post('/create',provincia.createProvincia)
router.post('/createAllProvincia',provincia.createAllProvincia)
router.put('/update', provincia.updateProvincia)
router.delete('/delete/:id', provincia.deleteProvincia)

module.exports=router
/** 
* @swagger
*definitions:
*  Provincia:           
*    type: object
*    required:
*      - cod_Provincia
*    properties:
*      cod_Provincia:
*        type: integer
*      nombre_Provincia:
*        type: string
*      clave_Provincia:
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