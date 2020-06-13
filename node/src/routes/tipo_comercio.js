'use strict'
const express=require('express')
const router=express.Router()
const tipo_comercio=require('../controllers/tipo_comercio')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/tipos-comercio/',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "sum2020_" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
});
/**
 * @swagger
 * /Tipo_Comercio/:
 *  get:
 *    tags: [Tipo_Comercio]
 *    description: Obtiene todos los Tipo_Comercios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipo_comercio.getTipo_Comercios)
router.get('/id/:id',tipo_comercio.getTipo_Comercio)
router.post('/create',multer({storage: storage}).array('files',5), tipo_comercio.createTipo_Comercio)
router.put('/update',multer({storage: storage}).array('files',5),  tipo_comercio.updateTipo_Comercio)
router.delete('/delete/:id', tipo_comercio.deleteTipo_Comercio)

module.exports=router
/** 
* @swagger
*definitions:
*  Tipo_Comercio:           
*    type: object
*    required:
*      - cod_Tipo_Comercio
*    properties:
*      cod_Tipo_Comercio:
*        type: integer
*      nombre_Tipo_Comercio:
*        type: string
*      clave_Tipo_Comercio:
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