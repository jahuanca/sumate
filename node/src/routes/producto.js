'use strict'
const express=require('express')
const router=express.Router()
const producto=require('../controllers/producto')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/productos/',
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
 * /Producto/:
 *  get:
 *    tags: [Producto]
 *    description: Obtiene todos los Productos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',producto.getProductos)
router.get('/random/:cantidad',producto.getProductosRandom)
router.get('/misProductos', auth.isAuthOnlyComercio,producto.getMisProductos)
router.get('/id/:id',producto.getProducto)
router.get('/id_categoria/:id',producto.getProductosCategoria)
router.get('/id_comercio/:id',producto.getProductosComercio)
router.get('/busqueda/:texto',producto.getProductosBuscados)
router.post('/some',producto.obtenerProductosSome)
router.post('/create', auth.isAuthOnlyComercio,multer({storage: storage}).array('files',5) ,producto.createProducto)
router.post('/createAllProducto',producto.createAllProducto)
router.put('/update', auth.isAuthOnlyComercio, multer({storage: storage}).array('files',5) ,producto.updateProducto)
router.delete('/delete/:id', producto.deleteProducto)

module.exports=router
/** 
* @swagger
*definitions:
*  Producto:           
*    type: object
*    required:
*      - cod_Producto
*    properties:
*      cod_Producto:
*        type: integer
*      nombre_Producto:
*        type: string
*      clave_Producto:
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