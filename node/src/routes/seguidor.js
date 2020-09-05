'use strict'
const express=require('express')
const router=express.Router()
const seguidor=require('../controllers/seguidor')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/seguidors/',
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
 * /Seguidor/:
 *  get:
 *    tags: [Seguidor]
 *    description: Obtiene todos los Seguidors.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',seguidor.getSeguidors)
router.get('/id_comercio/:id', auth.isAuthCliente,seguidor.getSeguidorComercio)
router.get('/id/:id',seguidor.getSeguidor)
router.post('/create', auth.isAuthCliente,seguidor.createSeguidor)
router.put('/update',seguidor.updateSeguidor)
router.delete('/delete/:id', auth.isAuthCliente, seguidor.deleteSeguidor)

module.exports=router
/** 
* @swagger
*definitions:
*  Seguidor:           
*    type: object
*    required:
*      - cod_Seguidor
*    properties:
*      cod_Seguidor:
*        type: integer
*/