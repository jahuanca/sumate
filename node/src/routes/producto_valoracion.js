'use strict'
const express=require('express')
const router=express.Router()
const producto_valoracion=require('../controllers/producto_valoracion')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/producto_valoracions/',
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
 * /Producto_Valoracion/:
 *  get:
 *    tags: [Producto_Valoracion]
 *    description: Obtiene todos los Producto_Valoracions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',producto_valoracion.getProducto_Valoracions)
router.get('/id/:id',producto_valoracion.getProducto_Valoracion)
router.post('/create',producto_valoracion.createProducto_Valoracion)
router.put('/update',producto_valoracion.updateProducto_Valoracion)
router.delete('/delete/:id', producto_valoracion.deleteProducto_Valoracion)

module.exports=router
/** 
* @swagger
*definitions:
*  Producto_Valoracion:           
*    type: object
*    required:
*      - cod_Producto_Valoracion
*    properties:
*      cod_Producto_Valoracion:
*        type: integer
*/