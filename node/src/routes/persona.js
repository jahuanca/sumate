'use strict'
const express=require('express')
const router=express.Router()
const persona=require('../controllers/persona')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Persona/:
 *  get:
 *    tags: [Persona]
 *    description: Obtiene todos los Personas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',persona.getPersonas)
router.get('/id/:id',persona.getPersona)
router.post('/create',persona.createPersona)
router.post('/createAllPersona',persona.createAllPersona)
router.put('/update', persona.updatePersona)
router.delete('/delete/:id', persona.deletePersona)

module.exports=router
/** 
* @swagger
*definitions:
*  Persona:           
*    type: object
*    required:
*      - cod_Persona
*    properties:
*      cod_Persona:
*        type: integer
*      nombre_Persona:
*        type: string
*      clave_Persona:
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