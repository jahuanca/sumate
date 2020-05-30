'use strict'
const express=require('express')
const router=express.Router()
const distrito=require('../controllers/distrito')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Distrito/:
 *  get:
 *    tags: [Distrito]
 *    description: Obtiene todos los Distritos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',distrito.getDistritos)
router.get('/id/:id',distrito.getDistrito)
router.post('/create',distrito.createDistrito)
router.post('/createAllDistrito',distrito.createAllDistrito)
router.put('/update', distrito.updateDistrito)
router.delete('/delete/:id', distrito.deleteDistrito)

module.exports=router
/** 
* @swagger
*definitions:
*  Distrito:           
*    type: object
*    required:
*      - cod_Distrito
*    properties:
*      cod_Distrito:
*        type: integer
*      nombre_Distrito:
*        type: string
*      clave_Distrito:
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