'use strict'
const express=require('express')
const router=express.Router()
const estado_pedido=require('../controllers/estado_pedido')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/estados-pedido/',
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
 * /Estado_Pedido/:
 *  get:
 *    tags: [Estado_Pedido]
 *    description: Obtiene todos los Estado_Pedidos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',estado_pedido.getEstado_Pedidos)
router.get('/id/:id',estado_pedido.getEstado_Pedido)
router.post('/create', multer({storage: storage}).array('files',3),estado_pedido.createEstado_Pedido)
router.post('/createAllEstado_Pedido',estado_pedido.createAllEstado_Pedido)
router.put('/update', multer({storage: storage}).array('files',3),estado_pedido.updateEstado_Pedido)
router.delete('/delete/:id', estado_pedido.deleteEstado_Pedido)

module.exports=router
/** 
* @swagger
*definitions:
*  Estado_Pedido:           
*    type: object
*    required:
*      - cod_Estado_Pedido
*    properties:
*      cod_Estado_Pedido:
*        type: integer
*      nombre_Estado_Pedido:
*        type: string
*      clave_Estado_Pedido:
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