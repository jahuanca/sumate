'use strict'
const express=require('express')
const router=express.Router()
const trabajador=require('../controllers/trabajador')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Trabajador/:
 *  get:
 *    tags: [Trabajador]
 *    description: Obtiene todos los Trabajadors.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',trabajador.getTrabajadors)
router.get('/id/:id',trabajador.getTrabajador)
router.post('/create',trabajador.createTrabajador)
router.post('/createAllTrabajador',trabajador.createAllTrabajador)
router.put('/update', trabajador.updateTrabajador)
router.delete('/delete/:id', trabajador.deleteTrabajador)

module.exports=router
/** 
* @swagger
*definitions:
*  Trabajador:           
*    type: object
*    required:
*      - cod_Trabajador
*    properties:
*      cod_Trabajador:
*        type: integer
*      nombre_Trabajador:
*        type: string
*      clave_Trabajador:
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