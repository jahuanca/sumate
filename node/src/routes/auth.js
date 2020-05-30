'use strict'
const express=require('express')
const router=express.Router()
const auth=require('../controllers/auth')

/**
* @swagger
*  /auth/signInUser:
*    post:
*      summary: Logearse movil.
*      description: Autenficador de usuario de la aplicacion movil
*      consumes:
*        - application/json
*      tags:
*        - Auth
*      parameters:
*        - in: body
*          name: usuario
*          description: Datos de acceso.
*          schema:
*            $ref: '#/definitions/Auth'
*      responses:
*        200:
*          description: Logeado con exito!
*definitions:
*  Auth:           
*    type: object
*    required:
*      - username
*      - password
*    properties:
*      username:
*        type: string
*      password:
*        type: string
*/
router.post('/signInUser',auth.signInUser)
/**
* @swagger
*  /auth/signInAdmin:
*    post:
*      summary: Logearse web.
*      description: Autenficador de usuario de la aplicacion web
*      consumes:
*        - application/json
*      tags:
*        - Auth
*      parameters:
*        - in: body
*          name: usuario
*          description: Datos de acceso.
*          schema:
*            $ref: '#/definitions/Auth'
*      responses:
*        200:
*          description: Logeado con exito!
*/
router.post('/signInAdmin',auth.signInAdmin)


module.exports=router