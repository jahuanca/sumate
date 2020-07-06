'use strict'
const express=require('express')
const router=express.Router()
const zona=require('../controllers/zona')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Zona/:
 *  get:
 *    tags: [Zona]
 *    description: Obtiene todos los Zonas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',zona.getZonas)
router.get('/inTarifario',zona.getZonasConTarifario)
router.get('/id/:id',zona.getZona)
router.post('/create',zona.createZona)
router.post('/createAllZona',zona.createAllZona)
router.put('/update', zona.updateZona)
router.delete('/delete/:id', zona.deleteZona)

module.exports=router
/** 
* @swagger
*definitions:
*  Zona:           
*    type: object
*    required:
*      - cod_Zona
*    properties:
*      cod_Zona:
*        type: integer
*      nombre_Zona:
*        type: string
*      clave_Zona:
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