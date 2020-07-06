'use strict'
const express=require('express')
const router=express.Router()
const tarifario=require('../controllers/tarifario')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Tarifario/:
 *  get:
 *    tags: [Tarifario]
 *    description: Obtiene todos los Tarifarios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tarifario.getTarifarios)
router.get('/id/:id',tarifario.getTarifario)
router.get('/id_delivery/:id',tarifario.getTarifariosDelivery)
router.post('/create',tarifario.createTarifario)
router.post('/createAllTarifario',tarifario.createAllTarifario)
router.post('/tarifariosZona',tarifario.getTarifariosComercios)
router.put('/update', tarifario.updateTarifario)
router.delete('/delete/:id', tarifario.deleteTarifario)

module.exports=router
/** 
* @swagger
*definitions:
*  Tarifario:           
*    type: object
*    required:
*      - cod_Tarifario
*    properties:
*      cod_Tarifario:
*        type: integer
*      nombre_Tarifario:
*        type: string
*      clave_Tarifario:
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