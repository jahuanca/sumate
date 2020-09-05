'use strict'
const express=require('express')
const router=express.Router()
const favorito=require('../controllers/favorito')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/favoritos/',
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
 * /Favorito/:
 *  get:
 *    tags: [Favorito]
 *    description: Obtiene todos los Favoritos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',favorito.getFavoritos)
router.get('/id_producto/:id', auth.isAuthCliente ,favorito.getFavoritoProducto)
router.get('/id/:id',favorito.getFavorito)
router.post('/create', auth.isAuthCliente ,favorito.createFavorito)
router.put('/update', auth.isAuthCliente ,favorito.updateFavorito)
router.delete('/delete/:id', auth.isAuthCliente, favorito.deleteFavorito)

module.exports=router
/** 
* @swagger
*definitions:
*  Favorito:           
*    type: object
*    required:
*      - cod_Favorito
*    properties:
*      cod_Favorito:
*        type: integer
*/