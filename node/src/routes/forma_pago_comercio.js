'use strict'
const express=require('express')
const router=express.Router()
const forma_pago_comercio=require('../controllers/forma_pago_comercio')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/formaspagocomercio/',
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
 * /Forma_Pago_Comercio/:
 *  get:
 *    tags: [Forma_Pago_Comercio]
 *    description: Obtiene todos los Forma_Pago_Comercios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',forma_pago_comercio.getForma_Pago_Comercios)
router.get('/misFormas', auth.isAuthOnlyComercio,forma_pago_comercio.getMisFormasPagoComercio)
router.get('/id/:id',forma_pago_comercio.getForma_Pago_Comercio)
router.post('/some',forma_pago_comercio.postForma_Pago_ComerciosSome)
router.post('/create',forma_pago_comercio.createForma_Pago_Comercio)
router.post('/createAllForma_Pago_Comercio',forma_pago_comercio.createAllForma_Pago_Comercio)
router.put('/update', auth.isAuthOnlyComercio, multer({storage: storage}).array('files',5),forma_pago_comercio.updateForma_Pago_Comercio)
router.delete('/delete/:id', forma_pago_comercio.deleteForma_Pago_Comercio)

module.exports=router
/** 
* @swagger
*definitions:
*  Forma_Pago_Comercio:           
*    type: object
*    required:
*      - cod_Forma_Pago_Comercio
*    properties:
*      cod_Forma_Pago_Comercio:
*        type: integer
*      nombre_Forma_Pago_Comercio:
*        type: string
*      clave_Forma_Pago_Comercio:
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