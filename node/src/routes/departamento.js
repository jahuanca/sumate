'use strict'
const express=require('express')
const router=express.Router()
const departamento=require('../controllers/departamento')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Departamento/:
 *  get:
 *    tags: [Departamento]
 *    description: Obtiene todos los Departamentos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',departamento.getDepartamentos)
router.get('/id/:id',departamento.getDepartamento)
router.post('/create',departamento.createDepartamento)
router.post('/createAllDepartamento',departamento.createAllDepartamento)
router.put('/update', departamento.updateDepartamento)
router.delete('/delete/:id', departamento.deleteDepartamento)

module.exports=router
/** 
* @swagger
*definitions:
*  Departamento:           
*    type: object
*    required:
*      - cod_Departamento
*    properties:
*      cod_Departamento:
*        type: integer
*      nombre_Departamento:
*        type: string
*      clave_Departamento:
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