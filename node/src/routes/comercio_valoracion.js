'use strict'
const express=require('express')
const router=express.Router()
const comercio_valoracion=require('../controllers/comercio_valoracion')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/comercio_valoracions/',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "sum2020_" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
});*/

/**
 * @swagger
 * /Comercio_Valoracion/:
 *  get:
 *    tags: [Comercio_Valoracion]
 *    description: Obtiene todos los Comercio_Valoracions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',comercio_valoracion.getComercio_Valoracions)
router.get('/id/:id',comercio_valoracion.getComercio_Valoracion)
router.get('/id_comercio/:id', auth.isAuthCliente,comercio_valoracion.getComercio_ValoracionComercio)
router.post('/create', auth.isAuthCliente,comercio_valoracion.createComercio_Valoracion)
router.put('/update', auth.isAuthCliente,comercio_valoracion.updateComercio_Valoracion)
router.delete('/delete/:id', auth.isAuthCliente , comercio_valoracion.deleteComercio_Valoracion)

module.exports=router
/** 
* @swagger
*definitions:
*  Comercio_Valoracion:           
*    type: object
*    required:
*      - cod_Comercio_Valoracion
*    properties:
*      cod_Comercio_Valoracion:
*        type: integer
*/