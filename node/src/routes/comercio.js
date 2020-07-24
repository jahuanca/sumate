'use strict'
const express=require('express')
const router=express.Router()
const comercio=require('../controllers/comercio')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/comercios/',
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
router.post('/createAllComercio', auth.isAuthAdmin ,multer({storage: storage}).array('files',5),comercio.createAllComercio)
router.put('/update', comercio.updateComercio)
router.put('/updateAllComercio', multer({storage: storage}).array('files',5), comercio.updateAllComercio)
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