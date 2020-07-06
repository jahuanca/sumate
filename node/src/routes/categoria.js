'use strict'
const express=require('express')
const router=express.Router()
const categoria=require('../controllers/categoria')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/categorias/',
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
 * /Categoria/:
 *  get:
 *    tags: [Categoria]
 *    description: Obtiene todos los Categorias.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',categoria.getCategorias)
router.get('/only',categoria.getCategoriasOnly)
router.get('/id/:id',categoria.getCategoria)
router.post('/create', multer({storage: storage}).array('files',1),categoria.createCategoria)
router.put('/update', multer({storage: storage}).array('files',1), categoria.updateCategoria)
router.delete('/delete/:id', categoria.deleteCategoria)

module.exports=router
/** 
* @swagger
*definitions:
*  Categoria:           
*    type: object
*    required:
*      - cod_Categoria
*    properties:
*      cod_Categoria:
*        type: integer
*      nombre_Categoria:
*        type: string
*      clave_Categoria:
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